/** Nombre de ranker → archivo en `src/assets/creators/` (minúsculas, espacios → `-`). */
export function rankerPhotoFile(name: string): string {
  return `${name.trim().toLowerCase().replace(/\s+/g, "-")}.webp`;
}
