import { en } from "./en";
import { pt } from "./pt";
import type { Language, SiteContent } from "./types";

export const content: Record<Language, SiteContent> = { pt, en };
export type { Language, SiteContent } from "./types";
