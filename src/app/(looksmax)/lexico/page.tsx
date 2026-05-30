import { LexicoPage } from "@/features/lexico/pages/LexicoPage";
import { lexicoMetadata } from "@/lib/seo/pages";

export const metadata = lexicoMetadata;

export default function LexicoPageRoute() {
  return <LexicoPage />;
}
