import { NoticiasPage } from "@/features/noticias/pages/NoticiasPage";
import { noticiasMetadata } from "@/lib/seo/pages";

export const metadata = noticiasMetadata;

export default function NoticiasPageRoute() {
  return <NoticiasPage />;
}
