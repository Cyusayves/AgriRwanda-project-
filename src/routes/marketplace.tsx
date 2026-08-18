import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { BadgeCheck, Search, X } from "lucide-react";
import { toast } from "sonner";

import { PageHero } from "@/components/page-hero";
import { products, type Product } from "@/lib/agri-data";
import { useAuth } from "@/lib/auth";
import { translateCategory, useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/marketplace")({
  head: () => ({
    meta: [
      { title: "Agricultural Marketplace — AgriRwanda" },
      {
        name: "description",
        content:
          "Browse crops, livestock, milk, eggs, honey and processed products from verified Rwandan farmers and cooperatives.",
      },
      { property: "og:title", content: "Agricultural Marketplace — AgriRwanda" },
      {
        property: "og:description",
        content: "Buy directly from verified Rwandan farmers and cooperatives, district by district.",
      },
    ],
  }),
  component: Marketplace,
});

const categories = Array.from(new Set(products.map((p) => p.category)));

type DialogState = { product: Product; mode: "buy" | "quote" } | null;

function Marketplace() {
  const { t } = useI18n();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [dialog, setDialog] = useState<DialogState>(null);

  const filtered = useMemo(
    () =>
      products.filter(
        (p) =>
          (category === "All" || p.category === category) &&
          (p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.district.toLowerCase().includes(query.toLowerCase()) ||
            p.seller.toLowerCase().includes(query.toLowerCase())),
      ),
    [query, category],
  );

  return (
    <div>
      <PageHero eyebrow={t("mk.eyebrow")} title={t("mk.title")} description={t("mk.desc")} />

      <div className="container-page py-10">
        <div className="surface-card flex flex-col gap-4 p-5 md:flex-row md:items-center">
          <label className="relative flex-1">
            <span className="sr-only">{t("mk.searchLabel")}</span>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("mk.searchPlaceholder")}
              className="w-full rounded-lg border border-input bg-background py-3 pl-10 pr-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </label>
          <div className="flex flex-wrap gap-2">
            {["All", ...categories].map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(c)}
                aria-pressed={category === c}
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition-colors ${
                  category === c
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70"
                }`}
              >
                {c === "All" ? t("mk.all") : translateCategory(t, c)}
              </button>
            ))}
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground">
          {filtered.length} {t("mk.available")}
        </p>

        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <article key={p.id} className="surface-card overflow-hidden">
              <div className="flex items-center justify-between bg-secondary px-5 py-4">
                <span className="text-3xl" aria-hidden="true">{p.emoji}</span>
                <span className="rounded-full bg-background px-2.5 py-1 text-xs font-semibold text-muted-foreground">
                  {translateCategory(t, p.category)}
                </span>
              </div>
              <div className="p-5">
                <h2 className="text-base font-bold">{p.name}</h2>
                <dl className="mt-3 grid grid-cols-2 gap-y-2 text-xs text-muted-foreground">
                  <div><dt className="font-semibold text-foreground">{t("mk.quantity")}</dt><dd>{p.quantity}</dd></div>
                  <div><dt className="font-semibold text-foreground">{t("mk.grade")}</dt><dd>{p.grade}</dd></div>
                  <div><dt className="font-semibold text-foreground">{t("mk.district")}</dt><dd>{p.district}</dd></div>
                  <div><dt className="font-semibold text-foreground">{t("mk.delivery")}</dt><dd>{t("mk.deliveryValue")}</dd></div>
                </dl>
                <p className="mt-4 font-display text-lg font-bold text-primary">{p.price}</p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-muted-foreground">
                  {p.seller}
                  {p.verified && (
                    <BadgeCheck className="size-4 text-leaf" aria-label={t("mk.verified")} />
                  )}
                </p>
                <div className="mt-5 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setDialog({ product: p, mode: "buy" })}
                    className="flex-1 rounded-lg bg-primary px-3 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                  >
                    {t("mk.buy")}
                  </button>
                  <button
                    type="button"
                    onClick={() => setDialog({ product: p, mode: "quote" })}
                    className="rounded-lg border border-border px-3 py-2.5 text-sm font-semibold hover:bg-secondary"
                  >
                    {t("mk.quote")}
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {filtered.length === 0 && (
          <p className="mt-10 text-center text-muted-foreground">{t("mk.empty")}</p>
        )}
      </div>

      {dialog && <OrderDialog state={dialog} onClose={() => setDialog(null)} />}
    </div>
  );
}

function OrderDialog({ state, onClose }: { state: NonNullable<DialogState>; onClose: () => void }) {
  const { t } = useI18n();
  const { user } = useAuth();
  const isBuy = state.mode === "buy";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label={isBuy ? t("order.buyTitle") : t("order.quoteTitle")}
      onClick={onClose}
    >
      <div
        className="surface-card max-h-[90vh] w-full max-w-md overflow-y-auto p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold">{isBuy ? t("order.buyTitle") : t("order.quoteTitle")}</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {state.product.name} · {state.product.price} · {state.product.seller}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label={t("order.cancel")}
            className="rounded-lg border border-border p-1.5 hover:bg-secondary"
          >
            <X className="size-4" />
          </button>
        </div>

        <form
          className="mt-5 grid gap-4"
          onSubmit={(e) => {
            e.preventDefault();
            toast.success(isBuy ? t("order.successBuy") : t("order.successQuote"));
            onClose();
          }}
        >
          <DialogField id="o-qty" label={t("order.qty")} placeholder={t("order.qtyPlaceholder")} required />
          <DialogField id="o-name" label={t("order.name")} defaultValue={user?.name ?? ""} required />
          <DialogField
            id="o-email"
            label={t("order.email")}
            type="email"
            placeholder="you@gmail.com"
            defaultValue={user?.email ?? ""}
            required
          />
          <DialogField id="o-phone" label={t("order.phone")} type="tel" placeholder="+250 7.. ... ..." required />
          <div>
            <label htmlFor="o-note" className="text-sm font-semibold">{t("order.note")}</label>
            <textarea
              id="o-note"
              rows={3}
              className="mt-2 w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            />
          </div>
          <div className="flex gap-2">
            <button
              type="submit"
              className="flex-1 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
            >
              {isBuy ? t("order.submitBuy") : t("order.submitQuote")}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-border px-4 py-3 text-sm font-semibold hover:bg-secondary"
            >
              {t("order.cancel")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function DialogField({
  id,
  label,
  type = "text",
  placeholder,
  required,
  defaultValue,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  defaultValue?: string;
}) {
  return (
    <div>
      <label htmlFor={id} className="text-sm font-semibold">
        {label}
      </label>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
        className="mt-2 w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
