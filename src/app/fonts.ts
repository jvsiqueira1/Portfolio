import { JetBrains_Mono, Roboto } from "next/font/google";

// Both families render above the fold, but neither is preloaded: Safari flags a font preload as unused
// when the first paint does not need the file in time. display "swap" paints the fallback first, and
// the default adjustFontFallback sizes that fallback to the web font's metrics, so the swap moves no
// layout (CLS stays ~0).

// One variable family: body at normal width, display condensed through the wdth axis (75-100).
export const sans = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  display: "swap",
  preload: false,
});

// Google serves JetBrains Mono as one variable file. Asking for it as a weight range declares that
// file once per subset instead of repeating the same file under four static weights (400-800).
export const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
  preload: false,
});
