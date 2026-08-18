import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/page-hero";
import { useI18n, type TKey } from "@/lib/i18n";
import { stats } from "@/lib/agri-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About AgriRwanda — Digital Agriculture Ecosystem" },
      {
        name: "description",
        content:
          "AgriRwanda connects farmers, buyers, cooperatives, agro-dealers, transporters and experts into one trusted digital agricultural ecosystem.",
      },
      { property: "og:title", content: "About AgriRwanda" },
      {
        property: "og:description",
        content: "Our mission: empowering farmers, connecting markets and growing Rwanda.",
      },
    ],
  }),
  component: About,
});

const roleKeys = [1, 2, 3, 4, 5, 6].map((n) => ({
  role: `ab.r${n}` as TKey,
  detail: `ab.r${n}d` as TKey,
}));

const statKeys: TKey[] = ["stat.farmers", "stat.buyers", "stat.coops", "stat.districts"];

function About() {
  const { t } = useI18n();
  return (
    <div>
      <PageHero
        eyebrow={t("ab.eyebrow")}
        title={t("ab.title")}
        description={t("ab.desc")}
      />

      <div className="container-page py-10">
        <div className="grid gap-6 md:grid-cols-3">
          <article className="surface-card p-6">
            <h2 className="text-lg font-bold">{t("ab.mission")}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{t("ab.missionBody")}</p>
          </article>
          <article className="surface-card p-6">
            <h2 className="text-lg font-bold">{t("ab.how")}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{t("ab.howBody")}</p>
          </article>
          <article className="surface-card p-6">
            <h2 className="text-lg font-bold">{t("ab.low")}</h2>
            <p className="mt-3 text-sm text-muted-foreground">{t("ab.lowBody")}</p>
          </article>
        </div>

        <dl className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.label} className="surface-card p-6">
              <dt className="sr-only">{t(statKeys[i]!)}</dt>
              <dd className="font-display text-3xl font-bold text-primary">{s.value}</dd>
              <p className="mt-1 text-sm text-muted-foreground">{t(statKeys[i]!)}</p>
            </div>
          ))}
        </dl>

        <section className="mt-14">
          <h2 className="text-2xl font-bold">{t("ab.who")}</h2>
          <ul className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {roleKeys.map((r) => (
              <li key={r.role} className="surface-card p-5">
                <h3 className="text-base font-bold">{t(r.role)}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{t(r.detail)}</p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
