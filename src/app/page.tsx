import { redirect } from "next/navigation";
import { DEFAULT_LOOKSMAX_PATH } from "@/features/app/routes";
import { homeRedirectMetadata } from "@/lib/seo/pages";

export const metadata = homeRedirectMetadata;

export default function HomePage() {
  redirect(DEFAULT_LOOKSMAX_PATH);
}
