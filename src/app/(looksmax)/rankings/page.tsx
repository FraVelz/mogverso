import { RankingsRoute } from "@/features/rankings/views/RankingsRoute";
import { RankingItemListJsonLd } from "@/lib/seo/json-ld";
import { rankingsMetadata } from "@/lib/seo/pages";

export const metadata = rankingsMetadata;

export default function RankingsPageRoute() {
  return (
    <>
      <RankingItemListJsonLd />
      <RankingsRoute />
    </>
  );
}
