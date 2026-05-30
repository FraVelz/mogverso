"use client";

import { useRouter } from "next/navigation";
import { DiscordModal } from "@/features/app/components/DiscordModal";
import { DEFAULT_LOOKSMAX_PATH } from "@/features/app/routes";

/** Página o intercept `/unirse`: modal Discord siempre visible. */
export function DiscordJoinOverlay() {
  const router = useRouter();

  return (
    <DiscordModal
      open
      onClose={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.back();
        } else {
          router.push(DEFAULT_LOOKSMAX_PATH);
        }
      }}
    />
  );
}
