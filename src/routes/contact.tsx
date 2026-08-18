import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CheckCircle2, Mail, MapPin, Phone } from "lucide-react";
import { toast } from "sonner";

import { PageHero } from "@/components/page-hero";
import { generateCode, isValidEmail, useAuth } from "@/lib/auth";
import { useI18n, type TKey } from "@/lib/i18n";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Join AgriRwanda" },
      {
        name: "description",
        content:
          "Register as a farmer, buyer, cooperative or agro-dealer with email verification, or contact the AgriRwanda support team for help.",
      },
      { property: "og:title", content: "Contact & Join AgriRwanda" },
      {
        property: "og:description",
        content: "Join AgriRwanda or get support from our team in Kigali.",
      },
    ],
  }),
  component: Contact,
});

const provinceKeys: TKey[] = ["prov.kigali", "prov.north", "prov.south", "prov.east", "prov.west"];
const roleKeys: TKey[] = [
  "role.farmer",
  "role.buyer",
  "role.coop",
  "role.dealer",
  "role.expert",
  "role.transporter",
];

type Step = "form" | "verify" | "done";

function Contact() {
  const { t } = useI18n();
  const { login } = useAuth();
  const [step, setStep] = useState<Step>("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(t("role.farmer"));
  const [code, setCode] = useState("");
  const [expected, setExpected] = useState("");

  return (
    <div>
      <PageHero eyebrow={t("ct.eyebrow")} title={t("ct.title")} description={t("ct.desc")} />

      <div className="container-page grid gap-6 py-10 lg:grid-cols-[1.3fr_1fr]">
        <div className="surface-card p-6 md:p-8">
          {step === "form" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!isValidEmail(email)) {
                  toast.error(t("ct.emailInvalid"));
                  return;
                }
                const next = generateCode();
                setExpected(next);
                setStep("verify");
                toast.success(`${t("ct.verifySent")} ${email.trim()}`);
              }}
            >
              <h2 className="text-xl font-bold">{t("ct.registration")}</h2>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <Field
                  id="fullname"
                  label={t("ct.fullname")}
                  placeholder="Uwimana Claudine"
                  required
                  value={name}
                  onChange={setName}
                />
                <Field id="phone" label={t("ct.phone")} type="tel" placeholder="+250 7.. ... ..." required />
                <Field
                  id="email"
                  label={t("ct.email")}
                  type="email"
                  placeholder="you@gmail.com"
                  required
                  value={email}
                  onChange={setEmail}
                />
                <div>
                  <label htmlFor="role" className="text-sm font-semibold">{t("ct.iam")}</label>
                  <select
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="mt-2 w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  >
                    {roleKeys.map((r) => (
                      <option key={r}>{t(r)}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label htmlFor="province" className="text-sm font-semibold">{t("ct.province")}</label>
                  <select
                    id="province"
                    className="mt-2 w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  >
                    {provinceKeys.map((p) => (
                      <option key={p}>{t(p)}</option>
                    ))}
                  </select>
                </div>
                <Field id="district" label={t("ct.district")} placeholder="Musanze" required />
                <Field id="sector" label={t("ct.sector")} placeholder="Kinigi" />
                <Field id="farmsize" label={t("ct.farmsize")} placeholder="1.4" />
              </div>

              <div className="mt-4">
                <label htmlFor="crops" className="text-sm font-semibold">{t("ct.crops")}</label>
                <textarea
                  id="crops"
                  rows={3}
                  placeholder={t("ct.cropsPlaceholder")}
                  className="mt-2 w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <button
                type="submit"
                className="mt-6 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 sm:w-auto sm:px-8"
              >
                {t("ct.register")}
              </button>
            </form>
          )}

          {step === "verify" && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (code.trim() !== expected) {
                  toast.error(t("ct.codeWrong"));
                  return;
                }
                login({ name: name || (email.split("@")[0] ?? ""), email: email.trim(), role });
                setStep("done");
                toast.success(t("ct.verified"));
              }}
            >
              <h2 className="text-xl font-bold">{t("ct.verifyTitle")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                {t("ct.verifySent")} <span className="font-semibold text-foreground">{email}</span>
              </p>
              <p className="mt-3 rounded-lg bg-secondary p-3 text-xs text-muted-foreground">
                {t("ct.demoCode")} <span className="font-bold text-foreground">{expected}</span>
              </p>

              <label htmlFor="code" className="mt-5 block text-sm font-semibold">
                {t("ct.codeLabel")}
              </label>
              <input
                id="code"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                required
                className="mt-2 w-full max-w-xs rounded-lg border border-input bg-background p-3 text-center text-lg font-bold tracking-[0.4em] outline-none focus:ring-2 focus:ring-ring"
              />

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  {t("ct.verify")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const next = generateCode();
                    setExpected(next);
                    setCode("");
                    toast.success(`${t("ct.codeResent")} ${next}`);
                  }}
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  {t("ct.resend")}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setStep("form");
                    setCode("");
                  }}
                  className="text-sm font-semibold text-muted-foreground hover:underline"
                >
                  {t("ct.changeEmail")}
                </button>
              </div>
            </form>
          )}

          {step === "done" && (
            <div>
              <CheckCircle2 className="size-10 text-leaf" aria-hidden="true" />
              <h2 className="mt-4 text-xl font-bold">{t("ct.doneTitle")}</h2>
              <p className="mt-2 text-sm text-muted-foreground">{t("ct.doneBody")}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/marketplace"
                  className="rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  {t("ct.goMarketplace")}
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setStep("form");
                    setName("");
                    setEmail("");
                    setCode("");
                  }}
                  className="rounded-lg border border-border px-5 py-3 text-sm font-semibold hover:bg-secondary"
                >
                  {t("ct.registerAnother")}
                </button>
              </div>
            </div>
          )}
        </div>

        <aside className="surface-card h-fit p-6">
          <h2 className="text-lg font-bold">{t("ct.support")}</h2>
          <ul className="mt-4 space-y-4 text-sm">
            <li className="flex items-start gap-3">
              <Phone className="mt-0.5 size-4 text-primary" aria-hidden="true" />
              <a href="tel:+250785802539" className="hover:underline">
                +250 785 802 539 {t("ct.hours")}
              </a>
            </li>
            <li className="flex items-start gap-3">
              <Mail className="mt-0.5 size-4 text-primary" aria-hidden="true" />
              <a href="mailto:support@agrirwanda.rw" className="hover:underline">
                support@agrirwanda.rw
              </a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 text-primary" aria-hidden="true" />
              <span>KG 7 Avenue, Kigali, Rwanda</span>
            </li>
          </ul>
          <p className="mt-6 rounded-lg bg-secondary p-4 text-xs text-muted-foreground">
            {t("ct.supportNote")}
          </p>
        </aside>
      </div>
    </div>
  );
}

function Field({
  id,
  label,
  type = "text",
  placeholder,
  required,
  value,
  onChange,
}: {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  value?: string;
  onChange?: (v: string) => void;
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
        {...(onChange ? { value: value ?? "", onChange: (e) => onChange(e.target.value) } : {})}
        className="mt-2 w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
      />
    </div>
  );
}
