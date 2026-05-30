import { ConsejoPage } from "@/features/consejo/pages/ConsejoPage";
import { consejoMetadata } from "@/lib/seo/pages";

export const metadata = consejoMetadata;

export default function ConsejoPageRoute() {
  return <ConsejoPage />;
}
