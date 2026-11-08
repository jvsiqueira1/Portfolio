import type { MetadataRoute } from "next";
import { LANGUAGE_PATH, SITE_URL } from "@/lib/site";

const absolute = (path: string) => new URL(path, SITE_URL).href;

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = {
    "pt-BR": absolute(LANGUAGE_PATH.pt),
    en: absolute(LANGUAGE_PATH.en),
    "x-default": absolute(LANGUAGE_PATH.pt),
  };

  return [
    { url: absolute(LANGUAGE_PATH.pt), changeFrequency: "monthly", priority: 1, alternates: { languages } },
    { url: absolute(LANGUAGE_PATH.en), changeFrequency: "monthly", priority: 0.9, alternates: { languages } },
  ];
}
