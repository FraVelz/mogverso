import type { Metadata } from "next";
import { ProfileRoute } from "@/features/rankings/views/ProfileRoute";
import { RANKERS } from "@/features/rankings/data/rankers";
import { ProfilePersonJsonLd } from "@/lib/seo/json-ld";
import { buildProfileMetadata, profileNotFoundMetadata } from "@/lib/seo/pages";

type PageProps = {
  params: Promise<{ index: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { index } = await params;
  const i = Number(index);
  if (!Number.isInteger(i) || i < 0 || i >= RANKERS.length) {
    return profileNotFoundMetadata;
  }
  return buildProfileMetadata(RANKERS[i], i);
}

export default async function ProfilePageRoute({ params }: PageProps) {
  const { index } = await params;
  const i = Number(index);
  const ranker =
    Number.isInteger(i) && i >= 0 && i < RANKERS.length ? RANKERS[i] : null;

  return (
    <>
      {ranker && (
        <ProfilePersonJsonLd
          name={ranker.name}
          title={ranker.title}
          description={ranker.bio}
          rank={i + 1}
          profileIndex={i}
        />
      )}
      <ProfileRoute />
    </>
  );
}
