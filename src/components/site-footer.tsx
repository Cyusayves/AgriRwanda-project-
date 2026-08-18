import { Link } from "@tanstack/react-router";
import { Sprout } from "lucide-react";

import { useI18n } from "@/lib/i18n";

export function SiteFooter() {
  const { t } = useI18n();

  return (
    <footer className="mt-20 border-t border-border bg-secondary/50">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sprout className="size-5" aria-hidden="true" />
            </span>
            <span className="font-display text-lg font-bold">AgriRwanda</span>
          </div>
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">{t("footer.tagline")}</p>
        </div>

        <nav aria-label="Platform" className="text-sm">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide">
            {t("footer.platform")}
          </h2>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li><Link to="/marketplace" className="hover:text-foreground">{t("footer.marketplace")}</Link></li>
            <li><Link to="/market-prices" className="hover:text-foreground">{t("footer.prices")}</Link></li>
            <li><Link to="/crops" className="hover:text-foreground">{t("footer.crops")}</Link></li>
            <li><Link to="/weather" className="hover:text-foreground">{t("footer.weather")}</Link></li>
          </ul>
        </nav>

        <nav aria-label="Support" className="text-sm">
          <h2 className="font-display text-sm font-bold uppercase tracking-wide">
            {t("footer.support")}
          </h2>
          <ul className="mt-3 space-y-2 text-muted-foreground">
            <li><Link to="/experts" className="hover:text-foreground">{t("footer.askExpert")}</Link></li>
            <li><Link to="/knowledge" className="hover:text-foreground">{t("footer.knowledge")}</Link></li>
            <li><Link to="/about" className="hover:text-foreground">{t("footer.about")}</Link></li>
            <li><Link to="/contact" className="hover:text-foreground">{t("footer.contact")}</Link></li>
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <p className="container-page py-5 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {t("footer.legal")}
        </p>
      </div>
    </footer>
  );
}
