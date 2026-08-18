import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Star } from "lucide-react";
import { toast } from "sonner";

import { PageHero } from "@/components/page-hero";
import { useI18n } from "@/lib/i18n";
import { experts } from "@/lib/agri-data";

export const Route = createFileRoute("/experts")({
  head: () => ({
    meta: [
      { title: "Ask an Agricultural Expert — AgriRwanda" },
      {
        name: "description",
        content:
          "Send your farming question to agronomists, veterinary doctors, soil and irrigation specialists working across Rwanda and get practical advice.",
      },
      { property: "og:title", content: "Ask an Agricultural Expert — AgriRwanda" },
      {
        property: "og:description",
        content: "Agronomists, vets and irrigation specialists answering Rwandan farmers' questions.",
      },
    ],
  }),
  component: Experts,
});

function Experts() {
  const { t } = useI18n();
  const [question, setQuestion] = useState("");

  return (
    <div>
      <PageHero
        eyebrow={t("ex.eyebrow")}
        title={t("ex.title")}
        description={t("ex.desc")}
      />

      <div className="container-page grid gap-6 py-10 lg:grid-cols-[1.2fr_1fr]">
        <ul className="grid gap-4 sm:grid-cols-2">
          {experts.map((e) => (
            <li key={e.name} className="surface-card p-6">
              <div className="flex items-center gap-3">
                <span className="flex size-12 items-center justify-center rounded-full bg-secondary font-display text-lg font-bold text-secondary-foreground">
                  {e.name.split(" ")[1]?.[0] ?? e.name[0]}
                </span>
                <div>
                  <h2 className="text-base font-bold">{e.name}</h2>
                  <p className="text-xs text-muted-foreground">{e.district}</p>
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">{e.field}</p>
              <p className="mt-3 flex items-center gap-1.5 text-sm font-semibold">
                <Star className="size-4 fill-gold text-gold" aria-hidden="true" />
                {e.rating}
                <span className="font-normal text-muted-foreground">
                  · {e.answers} {t("ex.answers")}
                </span>
              </p>
            </li>
          ))}
        </ul>

        <form
          className="surface-card h-fit p-6"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success(t("ex.sent"));
            setQuestion("");
          }}
        >
          <h2 className="text-lg font-bold">{t("ex.formTitle")}</h2>
          <label className="mt-4 block text-sm font-semibold" htmlFor="question">
            {t("ex.formLabel")}
          </label>
          <textarea
            id="question"
            required
            rows={6}
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder={t("ex.placeholder")}
            className="mt-2 w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
          <label className="mt-4 block text-sm font-semibold" htmlFor="photo">
            {t("ex.photo")}
          </label>
          <input
            id="photo"
            type="file"
            accept="image/*"
            className="mt-2 w-full rounded-lg border border-input bg-background p-2.5 text-sm"
          />
          <button
            type="submit"
            className="mt-5 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
          >
            {t("ex.send")}
          </button>
        </form>
      </div>
    </div>
  );
}
