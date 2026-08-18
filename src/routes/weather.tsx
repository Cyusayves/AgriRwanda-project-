import { createFileRoute } from "@tanstack/react-router";
import { AlertTriangle, Droplets, Thermometer, Wind } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { useI18n, type TKey } from "@/lib/i18n";
import { weatherDays } from "@/lib/agri-data";

export const Route = createFileRoute("/weather")({
  head: () => ({
    meta: [
      { title: "Weather & Farming Calendar — AgriRwanda" },
      {
        name: "description",
        content:
          "Seven-day forecasts, rainfall, humidity and agricultural weather alerts with planting, spraying and harvesting reminders for Rwandan farmers.",
      },
      { property: "og:title", content: "Weather & Farming Calendar — AgriRwanda" },
      {
        property: "og:description",
        content: "Forecasts and farming-calendar reminders tailored to Rwandan seasons.",
      },
    ],
  }),
  component: Weather,
});

const calendar = [1, 2, 3, 4].map((n) => ({
  period: `we.c${n}.period` as TKey,
  task: `we.c${n}.task` as TKey,
  detail: `we.c${n}.detail` as TKey,
}));

function Weather() {
  const { t } = useI18n();
  return (
    <div>
      <PageHero
        eyebrow={t("we.eyebrow")}
        title={t("we.title")}
        description={t("we.desc")}
      />

      <div className="container-page py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="surface-card p-6">
            <h2 className="text-lg font-bold">{t("we.district")}</h2>
            <p className="mt-3 font-display text-6xl font-bold">21°C</p>
            <p className="text-sm text-muted-foreground">{t("we.cond")}</p>
            <dl className="mt-6 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg bg-secondary p-3">
                <Droplets className="mx-auto size-5 text-primary" aria-hidden="true" />
                <dt className="mt-1 text-xs text-muted-foreground">{t("we.humidity")}</dt>
                <dd className="text-sm font-bold">78%</dd>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <Wind className="mx-auto size-5 text-primary" aria-hidden="true" />
                <dt className="mt-1 text-xs text-muted-foreground">{t("we.wind")}</dt>
                <dd className="text-sm font-bold">9 km/h</dd>
              </div>
              <div className="rounded-lg bg-secondary p-3">
                <Thermometer className="mx-auto size-5 text-primary" aria-hidden="true" />
                <dt className="mt-1 text-xs text-muted-foreground">{t("we.rainfall")}</dt>
                <dd className="text-sm font-bold">12 mm</dd>
              </div>
            </dl>
            <p className="mt-6 flex items-start gap-2 rounded-lg bg-gold/25 p-3 text-sm">
              <AlertTriangle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              <span>{t("we.alert")}</span>
            </p>
          </div>

          <div className="surface-card p-6">
            <h2 className="text-lg font-bold">{t("we.forecast")}</h2>
            <ul className="mt-4 divide-y divide-border">
              {weatherDays.map((d) => (
                <li key={d.day} className="flex items-center justify-between py-3">
                  <span className="w-16 text-sm font-semibold">{d.day}</span>
                  <span className="text-2xl" aria-hidden="true">{d.icon}</span>
                  <span className="text-sm text-muted-foreground">{t("we.rain")} {d.rain}</span>
                  <span className="text-sm font-semibold">
                    {d.high}° / {d.low}°
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-bold">{t("we.calendar")}</h2>
          <ul className="mt-5 grid gap-4 md:grid-cols-2">
            {calendar.map((c) => (
              <li key={c.period} className="surface-card p-5">
                <p className="text-xs font-bold uppercase tracking-wide text-primary">{t(c.period)}</p>
                <h3 className="mt-2 text-base font-bold">{t(c.task)}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{t(c.detail)}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
