import { createFileRoute, Link, type LinkProps } from "@tanstack/react-router";
import {
  ArrowRight,
  BadgeCheck,
  CloudSun,
  LineChart,
  MessageSquareText,
  ShoppingBasket,
  Sprout,
  TrendingDown,
  TrendingUp,
} from "lucide-react";

import { useI18n, translateCategory, type TKey } from "@/lib/i18n";
import heroImage from "@/assets/hero-rwanda-farm.jpg";
import farmerImage from "@/assets/farmer-portrait.jpg";
import produceImage from "@/assets/produce.jpg";
import {
  crops,
  events,
  experts,
  knowledge,
  marketPrices,
  news,
  products,
  stats,
  weatherDays,
} from "@/lib/agri-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AgriRwanda — Rwanda's Digital Agriculture Platform" },
      {
        name: "description",
        content:
          "Sell produce, track market prices, check weather, learn modern farming and reach verified buyers across all 30 districts of Rwanda.",
      },
      { property: "og:title", content: "AgriRwanda — Rwanda's Digital Agriculture Platform" },
      {
        property: "og:description",
        content:
          "Connecting farmers, buyers, cooperatives, agro-dealers and agricultural experts across Rwanda.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  const { t } = useI18n();
  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Rwandan farmers cultivating maize on terraced hillsides at sunrise"
          width={1920}
          height={1088}
          className="absolute inset-0 size-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="container-page relative py-24 md:py-32">
          <p className="inline-flex items-center gap-2 rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-[0.16em] text-gold-foreground">
            <Sprout className="size-3.5" aria-hidden="true" /> {t("home.badge")}
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-bold text-primary-foreground md:text-6xl">
            {t("home.title")}
          </h1>
          <p className="mt-5 max-w-xl text-lg text-primary-foreground/85">
            {t("home.subtitle")}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 text-base font-semibold text-gold-foreground transition-transform hover:-translate-y-0.5"
            >
              {t("nav.join")} <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
            <Link
              to="/marketplace"
              className="inline-flex items-center gap-2 rounded-xl border border-primary-foreground/40 px-6 py-3 text-base font-semibold text-primary-foreground hover:bg-primary-foreground/10"
            >
              {t("home.exploreMarket")}
            </Link>
            <Link
              to="/experts"
              className="inline-flex items-center gap-2 rounded-xl px-6 py-3 text-base font-semibold text-primary-foreground/90 hover:text-primary-foreground"
            >
              {t("home.findServices")}
            </Link>
          </div>

          <dl className="mt-14 grid max-w-3xl grid-cols-2 gap-x-8 gap-y-6 md:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-3xl font-bold text-primary-foreground">
                  {s.value}
                </dd>
                <p className="text-sm text-primary-foreground/75">{s.label}</p>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Value props */}
      <section className="container-page -mt-10 relative grid gap-4 md:grid-cols-3">
        {[
          {
            icon: ShoppingBasket,
            title: "home.vp1.title" as TKey,
            body: "home.vp1.body" as TKey,
          },
          {
            icon: LineChart,
            title: "home.vp2.title" as TKey,
            body: "home.vp2.body" as TKey,
          },
          {
            icon: MessageSquareText,
            title: "home.vp3.title" as TKey,
            body: "home.vp3.body" as TKey,
          },
        ].map((c) => (
          <article key={c.title} className="surface-card p-6">
            <c.icon className="size-6 text-primary" aria-hidden="true" />
            <h2 className="mt-4 text-lg font-bold">{t(c.title)}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{t(c.body)}</p>
          </article>
        ))}
      </section>

      {/* Featured products */}
      <Section
        title={t("home.featured")}
        action={{ to: "/marketplace", label: t("home.viewAll") }}
      >
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.slice(0, 6).map((p) => (
            <article key={p.id} className="surface-card overflow-hidden">
              <div className="flex items-center justify-between bg-secondary px-5 py-4">
                <span className="text-3xl" aria-hidden="true">{p.emoji}</span>
                <span className="rounded-full bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                  {translateCategory(t, p.category)}
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-base font-bold">{p.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {p.quantity} · {p.grade} · {p.district}
                </p>
                <p className="mt-3 font-display text-lg font-bold text-primary">{p.price}</p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  {p.seller}
                  {p.verified && (
                    <BadgeCheck className="size-4 text-leaf" aria-label={t("mk.verified")} />
                  )}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      {/* Prices + weather */}
      <section className="container-page mt-20 grid gap-6 lg:grid-cols-[1.35fr_1fr]">
        <div className="surface-card p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold">{t("home.todayPrices")}</h2>
            <Link to="/market-prices" className="text-sm font-semibold text-primary hover:underline">
              {t("home.allMarkets")}
            </Link>
          </div>
          <ul className="mt-4 divide-y divide-border">
            {marketPrices.slice(0, 5).map((r) => (
              <li key={r.product} className="flex items-center justify-between gap-4 py-3">
                <div>
                  <p className="text-sm font-semibold">{r.product}</p>
                  <p className="text-xs text-muted-foreground">
                    {r.market} · {r.district}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold">RWF {r.retail.toLocaleString()}</p>
                  <p
                    className={`flex items-center justify-end gap-1 text-xs font-semibold ${
                      r.trend === "down" ? "text-destructive" : "text-leaf"
                    }`}
                  >
                    {r.trend === "down" ? (
                      <TrendingDown className="size-3.5" aria-hidden="true" />
                    ) : (
                      <TrendingUp className="size-3.5" aria-hidden="true" />
                    )}
                    {r.change}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="surface-card p-6">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-xl font-bold">{t("home.weatherMusanze")}</h2>
            <CloudSun className="size-6 text-primary" aria-hidden="true" />
          </div>
          <p className="mt-4 font-display text-5xl font-bold">21°C</p>
          <p className="text-sm text-muted-foreground">
            {t("home.weatherNow")}
          </p>
          <div className="mt-5 grid grid-cols-4 gap-2 text-center">
            {weatherDays.slice(0, 4).map((d) => (
              <div key={d.day} className="rounded-lg bg-secondary px-2 py-3">
                <p className="text-xs font-semibold">{d.day}</p>
                <p className="text-xl" aria-hidden="true">{d.icon}</p>
                <p className="text-xs text-muted-foreground">
                  {d.high}° / {d.low}°
                </p>
              </div>
            ))}
          </div>
          <p className="mt-4 rounded-lg bg-gold/25 px-3 py-2 text-xs font-medium text-foreground">
            {t("home.advisory")}
          </p>
          <Link to="/weather" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">
            {t("home.fullForecast")}
          </Link>
        </div>
      </section>

      {/* Crops */}
      <Section title={t("home.popularCrops")} action={{ to: "/crops", label: t("home.allCropGuides") }}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {crops.slice(0, 4).map((c) => (
            <article key={c.name} className="surface-card p-5">
              <span className="text-3xl" aria-hidden="true">{c.emoji}</span>
              <h3 className="mt-3 text-base font-bold">{c.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.regions}</p>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-primary">
                {c.season}
              </p>
            </article>
          ))}
        </div>
      </Section>

      {/* Farmer story */}
      <section className="container-page mt-20">
        <div className="surface-card grid overflow-hidden md:grid-cols-2">
          <img
            src={farmerImage}
            alt="Rwandan woman farmer holding a crate of fresh tomatoes at a market"
            width={1024}
            height={1024}
            loading="lazy"
            className="h-72 w-full object-cover md:h-full"
          />
          <div className="p-8 md:p-10">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-primary">
              {t("home.featuredFarmer")}
            </p>
            <h2 className="mt-3 text-2xl font-bold">
              {t("home.story.quote")}
            </h2>
            <p className="mt-4 text-muted-foreground">
              {t("home.story.body")}
            </p>
            <Link
              to="/marketplace"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {t("home.seeSelling")} <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* Knowledge + experts */}
      <Section title={t("home.learnSupport")} action={{ to: "/knowledge", label: t("home.knowledgeCenter") }}>
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          <ul className="grid gap-4 sm:grid-cols-2">
            {knowledge.slice(0, 4).map((k) => (
              <li key={k.title} className="surface-card p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">{k.type}</p>
                <h3 className="mt-2 text-base font-semibold">{k.title}</h3>
                <p className="mt-2 text-xs text-muted-foreground">
                  {k.topic} · {k.minutes}
                </p>
              </li>
            ))}
          </ul>
          <div className="surface-card p-6">
            <h3 className="text-lg font-bold">{t("home.talkExpert")}</h3>
            <ul className="mt-4 space-y-4">
              {experts.slice(0, 3).map((e) => (
                <li key={e.name} className="flex items-start gap-3">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary font-display font-bold text-secondary-foreground">
                    {e.name.split(" ")[1]?.[0] ?? e.name[0]}
                  </span>
                  <div>
                    <p className="text-sm font-semibold">{e.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {e.field} · {e.district}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              to="/experts"
              className="mt-5 inline-block rounded-xl border border-border px-4 py-2.5 text-sm font-semibold hover:bg-secondary"
            >
              {t("home.askQuestion")}
            </Link>
          </div>
        </div>
      </Section>

      {/* News & events */}
      <Section title={t("home.news")}>
        <div className="grid gap-6 md:grid-cols-2">
          <ul className="surface-card divide-y divide-border p-2">
            {news.map((n) => (
              <li key={n.title} className="px-4 py-4">
                <p className="text-sm font-semibold">{n.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {n.source} · {n.date}
                </p>
              </li>
            ))}
          </ul>
          <ul className="surface-card divide-y divide-border p-2">
            {events.map((e) => (
              <li key={e.title} className="px-4 py-4">
                <p className="text-sm font-semibold">{e.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {e.place} · {e.date}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* Final CTA */}
      <section className="container-page mt-20">
        <div className="relative isolate overflow-hidden rounded-3xl">
          <img
            src={produceImage}
            alt="Baskets of harvested potatoes, maize and beans on dark soil"
            width={1024}
            height={768}
            loading="lazy"
            className="absolute inset-0 size-full object-cover"
          />
          <div className="hero-overlay absolute inset-0" />
          <div className="relative px-8 py-16 text-center md:px-16">
            <h2 className="mx-auto max-w-2xl text-3xl font-bold text-primary-foreground md:text-4xl">
              {t("home.cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">
              {t("home.cta.body")}
            </p>
            <Link
              to="/contact"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-gold px-6 py-3 text-base font-semibold text-gold-foreground"
            >
              {t("home.cta.button")} <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

function Section({
  title,
  action,
  children,
}: {
  title: string;
  action?: { to: NonNullable<LinkProps["to"]>; label: string };
  children: React.ReactNode;
}) {
  return (
    <section className="container-page mt-20">
      <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
        <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
        {action && (
          <Link
            to={action.to}
            className="text-sm font-semibold text-primary hover:underline"
          >
            {action.label}
          </Link>
        )}
      </div>
      {children}
    </section>
  );
}
