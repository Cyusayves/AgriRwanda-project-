import { createFileRoute } from "@tanstack/react-router";

import { PageHero } from "@/components/page-hero";
import { useI18n } from "@/lib/i18n";
import { knowledge } from "@/lib/agri-data";

export const Route = createFileRoute("/knowledge")({
  head: () => ({
    meta: [
      { title: "Agricultural Knowledge Center — AgriRwanda" },
      {
        name: "description",
        content:
          "Guides, videos, PDFs and audio on climate-smart agriculture, irrigation, soil management, pest control, livestock and post-harvest handling.",
      },
      { property: "og:title", content: "Agricultural Knowledge Center — AgriRwanda" },
      {
        property: "og:description",
        content: "Practical learning materials for Rwandan farmers, in simple language.",
      },
    ],
  }),
  component: Knowledge,
});

function Knowledge() {
  const { t } = useI18n();
  return (
    <div>
      <PageHero
        eyebrow={t("kn.eyebrow")}
        title={t("kn.title")}
        description={t("kn.desc")}
      />

      <div className="container-page grid gap-4 py-10 sm:grid-cols-2 lg:grid-cols-3">
        {knowledge.map((k) => (
          <article key={k.title} className="surface-card flex flex-col p-6">
            <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-bold uppercase tracking-wide text-secondary-foreground">
              {k.type}
            </span>
            <h2 className="mt-4 text-base font-bold">{k.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{k.topic}</p>
            <p className="mt-auto pt-4 text-xs font-semibold text-primary">{k.minutes}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
