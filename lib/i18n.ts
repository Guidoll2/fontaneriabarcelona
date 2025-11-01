import es from "../locales/es.json";
import en from "../locales/en.json";
import ca from "../locales/ca.json";

export type Dict = typeof es;

export function getDict(locale: string): Dict {
  if (locale === "en") return en as unknown as Dict;
  if (locale === "ca") return ca as unknown as Dict;
  return es as unknown as Dict;
}

export const SUPPORTED_LOCALES = ["es", "en", "ca"] as const;
