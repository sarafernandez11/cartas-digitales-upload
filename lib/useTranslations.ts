import { useMemo } from "react";
import es from "./translations/es.json";
import en from "./translations/en.json";
import ca from "./translations/ca.json";

type Language = "ES" | "EN" | "CA";

const translations: Record<Language, Record<string, string>> = {
    ES: es,
    EN: en,
    CA: ca,
};

export function useTranslations(language: Language) {
    return useMemo(() => {
        return {
            t: (
                key: string,
                replacements?: Record<string, string | number>,
            ) => {
                let text =
                    translations[language][key] ||
                    translations["ES"][key] ||
                    key;

                if (replacements) {
                    Object.entries(replacements).forEach(([key, value]) => {
                        text = text.replace(`{${key}}`, String(value));
                    });
                }

                return text;
            },
        };
    }, [language]);
}
