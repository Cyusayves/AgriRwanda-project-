import { Globe } from "lucide-react";

import { LANGUAGES, useI18n } from "@/lib/i18n";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { lang, setLang, t } = useI18n();

  return (
    <label className={`relative flex items-center gap-1.5 ${className}`}>
      <Globe className="pointer-events-none size-4 text-muted-foreground" aria-hidden="true" />
      <span className="sr-only">{t("nav.language")}</span>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as typeof lang)}
        className="rounded-lg border border-border bg-background py-2 pl-1 pr-2 text-sm font-semibold outline-none focus:ring-2 focus:ring-ring"
      >
        {LANGUAGES.map((l) => (
          <option key={l.code} value={l.code}>
            {l.label}
          </option>
        ))}
      </select>
    </label>
  );
}
