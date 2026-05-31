import type { IconName } from "@/types/icons";

export type Ranker = {
  name: string;
  title: string;
  sub: string;
  score: number;
  top: string;
  tags: string[];
  tagNames: string[];
  bio: string;
  movement: string;
  movIcon: IconName;
  photoBg: string;
};
