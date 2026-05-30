"use client";

import { useEffect, useMemo, useState } from "react";
import { useFirebase } from "@/features/app/context/FirebaseProvider";
import {
  buildRankedList,
  computeMovers,
  getRankedNamesFromOverrides,
} from "@/features/rankings/lib/ranking";
import type {
  MoverStack,
  RankMovements,
  RankOverrides,
  RankVoteRound,
} from "@/features/shared/lib/types";

export function useRankingData() {
  const { fb, ready } = useFirebase();
  const [overrides, setOverrides] = useState<RankOverrides>({});
  /** Evita mostrar el orden fijo de RANKERS antes del primer snapshot de Firebase. */
  const [overridesReady, setOverridesReady] = useState(false);
  const [movements, setMovements] = useState<RankMovements>({});
  const [movementsUp, setMovementsUp] = useState<MoverStack>({});
  const [movementsDown, setMovementsDown] = useState<MoverStack>({});
  const [rankVoteEnd, setRankVoteEnd] = useState<number | null>(null);

  useEffect(() => {
    if (!fb) return;
    const { db, ref, onValue } = fb;

    const unsubO = onValue(ref(db, "rankOverrides"), (snap) => {
      setOverrides(snap.exists() ? (snap.val() as RankOverrides) : {});
      setOverridesReady(true);
    });
    const unsubM = onValue(ref(db, "rankMovements"), (snap) => {
      setMovements(snap.exists() ? (snap.val() as RankMovements) : {});
    });
    const unsubUp = onValue(ref(db, "rankMovementsUp"), (snap) => {
      setMovementsUp(snap.exists() ? (snap.val() as MoverStack) : {});
    });
    const unsubDown = onValue(ref(db, "rankMovementsDown"), (snap) => {
      setMovementsDown(snap.exists() ? (snap.val() as MoverStack) : {});
    });
    const unsubRv = onValue(ref(db, "rankvote/current"), async (snap) => {
      if (snap.exists()) {
        const rv = snap.val() as RankVoteRound;
        if (!rv.resolved && rv.endTime > Date.now()) {
          setRankVoteEnd(rv.endTime);
          return;
        }
      } else {
        await fb.ensureRVExists();
      }
      setRankVoteEnd(null);
    });

    return () => {
      unsubO();
      unsubM();
      unsubUp();
      unsubDown();
      unsubRv();
    };
  }, [fb]);

  const rankedNames = useMemo(
    () =>
      fb
        ? fb.getRankedNamesFromOverrides(overrides)
        : getRankedNamesFromOverrides(overrides),
    [fb, overrides],
  );

  const entries = useMemo(
    () => buildRankedList(overrides, movements),
    [overrides, movements],
  );

  const { upMovers, downMovers } = useMemo(
    () =>
      computeMovers(rankedNames, movements, {
        up: movementsUp,
        down: movementsDown,
      }),
    [rankedNames, movements, movementsUp, movementsDown],
  );

  const rankingReady = ready && (!fb || overridesReady);

  return {
    ready: rankingReady,
    entries: rankingReady ? entries : [],
    upMovers: rankingReady ? upMovers : [],
    downMovers: rankingReady ? downMovers : [],
    rankVoteEnd,
    overrides,
  };
}
