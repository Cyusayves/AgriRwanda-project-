import { createFileRoute } from "@tanstack/react-router";
import { Minus, TrendingDown, TrendingUp } from "lucide-react";

import { PageHero } from "@/components/page-hero";
import { useI18n } from "@/lib/i18n";
import { marketPrices } from "@/lib/agri-data";

export const Route = createFileRoute("/market-prices")({
  head: () => ({
    meta: [
      { title: "Market Prices in Rwanda — AgriRwanda" },
      {
        name: "description",
        content:
          "Daily wholesale and retail agricultural prices from markets across Rwanda, with clear rising and falling price indicators.",
      },
      { property: "og:title", content: "Market Prices in Rwanda — AgriRwanda" },
      {
        property: "og:description",
        content: "Compare wholesale and retail crop prices by market and district before you sell.",
      },
    ],
  }),
  component: MarketPrices,
});

function MarketPrices() {
  const { t } = useI18n();
  return (
    <div>
      <PageHero
        eyebrow={t("pr.eyebrow")}
        title={t("pr.title")}
        description={t("pr.desc")}
      />

      <div className="container-page py-10">
        <div className="surface-card overflow-x-auto">
          <table className="w-full min-w-[42rem] text-left text-sm">
            <caption className="sr-only">{t("pr.caption")}</caption>
            <thead className="bg-secondary text-xs uppercase tracking-wide text-secondary-foreground">
              <tr>
                <th scope="col" className="px-5 py-3 font-bold">{t("pr.product")}</th>
                <th scope="col" className="px-5 py-3 font-bold">{t("pr.market")}</th>
                <th scope="col" className="px-5 py-3 font-bold">{t("mk.district")}</th>
                <th scope="col" className="px-5 py-3 text-right font-bold">{t("pr.wholesale")}</th>
                <th scope="col" className="px-5 py-3 text-right font-bold">{t("pr.retail")}</th>
                <th scope="col" className="px-5 py-3 text-right font-bold">{t("pr.trend")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {marketPrices.map((r) => (
                <tr key={`${r.product}-${r.market}`}>
                  <td className="px-5 py-4 font-semibold">{r.product}</td>
                  <td className="px-5 py-4 text-muted-foreground">{r.market}</td>
                  <td className="px-5 py-4 text-muted-foreground">{r.district}</td>
                  <td className="px-5 py-4 text-right">RWF {r.wholesale.toLocaleString()}</td>
                  <td className="px-5 py-4 text-right">RWF {r.retail.toLocaleString()}</td>
                  <td className="px-5 py-4">
                    <span
                      className={`flex items-center justify-end gap-1 font-semibold ${
                        r.trend === "down"
                          ? "text-destructive"
                          : r.trend === "up"
                            ? "text-leaf"
                            : "text-muted-foreground"
                      }`}
                    >
                      {r.trend === "down" ? (
                        <TrendingDown className="size-4" aria-hidden="true" />
                      ) : r.trend === "up" ? (
                        <TrendingUp className="size-4" aria-hidden="true" />
                      ) : (
                        <Minus className="size-4" aria-hidden="true" />
                      )}
                      {r.change}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-4 text-xs text-muted-foreground">{t("pr.note")}</p>
      </div>
    </div>
  );
}
