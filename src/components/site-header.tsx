import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, Sprout } from "lucide-react";

import { LanguageSwitcher } from "@/components/language-switcher";
import { useAuth } from "@/lib/auth";
import { useI18n, type TKey } from "@/lib/i18n";

const links = [
  { to: "/", label: "nav.home" },
  { to: "/marketplace", label: "nav.marketplace" },
  { to: "/market-prices", label: "nav.prices" },
  { to: "/crops", label: "nav.crops" },
  { to: "/weather", label: "nav.weather" },
  { to: "/knowledge", label: "nav.knowledge" },
  { to: "/experts", label: "nav.experts" },
  { to: "/about", label: "nav.about" },
  { to: "/contact", label: "nav.contact" },
] as const satisfies readonly { to: string; label: TKey }[];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <Sprout className="size-5" aria-hidden="true" />
          </span>
          <span className="font-display text-lg font-bold tracking-tight">
            Agri<span className="text-primary">Rwanda</span>
          </span>
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-1 xl:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
              activeProps={{ className: "bg-secondary text-secondary-foreground" }}
              activeOptions={{ exact: l.to === "/" }}
            >
              {t(l.label)}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 xl:flex">
          <LanguageSwitcher />
          {user ? (
            <button
              type="button"
              onClick={logout}
              className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
            >
              {t("lg.logout")}
            </button>
          ) : (
            <Link
              to="/login"
              className="rounded-lg px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
            >
              {t("nav.login")}
            </Link>
          )}
          <Link
            to="/contact"
            className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            {t("nav.join")}
          </Link>
        </div>

        <div className="flex items-center gap-2 xl:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-lg border border-border"
            aria-label={open ? t("nav.closeMenu") : t("nav.openMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="border-t border-border bg-background xl:hidden">
          <nav aria-label="Mobile" className="container-page grid gap-1 py-3">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-secondary"
              >
                {t(l.label)}
              </Link>
            ))}
            {user ? (
              <button
                type="button"
                onClick={() => {
                  logout();
                  setOpen(false);
                }}
                className="rounded-md px-3 py-3 text-left text-base font-medium text-foreground hover:bg-secondary"
              >
                {t("lg.logout")}
              </button>
            ) : (
              <Link
                to="/login"
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground hover:bg-secondary"
              >
                {t("nav.login")}
              </Link>
            )}
            <Link
              to="/contact"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-lg bg-primary px-4 py-3 text-center text-base font-semibold text-primary-foreground"
            >
              {t("nav.join")}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
