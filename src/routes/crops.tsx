import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/page-hero";
import { useI18n } from "@/lib/i18n";
import { crops } from "@/lib/agri-data";

export const Route = createFileRoute("/crops")({
  head: () => ({
    meta: [
      { title: "Crop Guides for Rwandan Farmers — AgriRwanda" },
      {
        name: "description",
        content:
          "Practical guides for maize, potatoes, beans, coffee, rice, cassava, tomatoes and tea: seasons, soils, suitable regions and expected yields.",
      },
      { property: "og:title", content: "Crop Guides for Rwandan Farmers — AgriRwanda" },
      {
        property: "og:description",
        content: "Seasons, soil requirements, suitable regions and yields for Rwanda's main crops.",
      },
    ],
  }),
  component: Crops,
});

function Crops() {
  const { t } = useI18n();
  return (
    <div>
      <PageHero
        eyebrow={t("cr.eyebrow")}
        title={t("cr.title")}
        description={t("cr.desc")}
      />

      <div className="container-page grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {crops.map((c) => (
          <article key={c.name} className="surface-card p-6">
            <span className="text-4xl" aria-hidden="true">{c.emoji}</span>
            <h2 className="mt-3 text-lg font-bold">{c.name}</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-primary">{t("cr.season")}</dt>
                <dd className="text-muted-foreground">{c.season}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-primary">{t("cr.regions")}</dt>
                <dd className="text-muted-foreground">{c.regions}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-primary">{t("cr.soil")}</dt>
                <dd className="text-muted-foreground">{c.soil}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-wide text-primary">{t("cr.yield")}</dt>
                <dd className="text-muted-foreground">{c.yield}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
    </div>
  );
}
