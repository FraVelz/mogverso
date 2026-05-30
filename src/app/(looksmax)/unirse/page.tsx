import { DiscordJoinOverlay } from "@/features/app/components/DiscordJoinOverlay";
import { buildPageMetadata } from "@/lib/seo/metadata";

export const metadata = buildPageMetadata({
  title: "Únete a la comunidad",
  description:
    "Únete al Discord de LooksMax España. Propón creadores, vota en el ranking y accede a ventajas de miembro.",
  path: "/unirse",
});

/** Acceso directo a `/unirse` (enlace compartible o recarga). */
export default function UnirsePage() {
  return <DiscordJoinOverlay />;
}
