"use client";

import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
  // Inicializar com false (mobile-first) para evitar problemas de hidratação
  const [matches, setMatches] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    // Verificar se estamos no cliente (window existe)
    if (typeof window === "undefined") {
      return;
    }

    const media = window.matchMedia(query);

    // Definir valor inicial após montagem
    setMatches(media.matches);

    // Criar listener para mudanças
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Adicionar listener
    media.addEventListener("change", listener);

    // Cleanup
    return () => {
      media.removeEventListener("change", listener);
    };
  }, [query]);

  // Retornar false durante SSR e antes da montagem para evitar problemas de hidratação
  if (!mounted) {
    return false;
  }

  return matches;
}
