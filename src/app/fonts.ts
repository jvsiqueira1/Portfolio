import { JetBrains_Mono, Roboto } from "next/font/google";

// Both families render above the fold (headline and body in Roboto; nav, HUD and boot log in
// JetBrains Mono), so both keep their preload.

// One variable family: body at normal width, display condensed through the wdth axis (75-100).
export const sans = Roboto({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: "variable",
  axes: ["wdth"],
  display: "swap",
});

// Google serves JetBrains Mono as one variable file. Asking for it as a weight range declares that
// file once per subset instead of repeating the same file under four static weights (400-800).
export const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: "variable",
  display: "swap",
});
