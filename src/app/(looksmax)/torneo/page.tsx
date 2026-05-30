import { TorneoPage } from "@/features/torneo/pages/TorneoPage";
import { torneoMetadata } from "@/lib/seo/pages";

export const metadata = torneoMetadata;

export default function TorneoPageRoute() {
  return <TorneoPage />;
}
