import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";

import { PageHero } from "@/components/page-hero";
import { generateCode, isValidEmail, useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Log in — AgriRwanda" },
      {
        name: "description",
        content:
          "Sign in to your AgriRwanda account with an email verification code to manage listings, orders and expert requests.",
      },
      { property: "og:title", content: "Log in — AgriRwanda" },
      {
        property: "og:description",
        content: "Secure email code sign-in for farmers, buyers and cooperatives.",
      },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const { t } = useI18n();
  const { user, login, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [sent, setSent] = useState<string | null>(null);

  if (user) {
    return (
      <div>
        <PageHero eyebrow={t("lg.eyebrow")} title={t("lg.welcome")} description={t("lg.loggedIn")} />
        <div className="container-page py-10">
          <div className="surface-card max-w-md p-6">
            <p className="text-sm text-muted-foreground">{user.email}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Link
                to="/marketplace"
                className="rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {t("ct.goMarketplace")}
              </Link>
              <button
                type="button"
                onClick={logout}
                className="rounded-lg border border-border px-4 py-2.5 text-sm font-semibold hover:bg-secondary"
              >
                {t("lg.logout")}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <PageHero eyebrow={t("lg.eyebrow")} title={t("lg.title")} description={t("lg.desc")} />

      <div className="container-page py-10">
        <div className="surface-card max-w-md p-6 md:p-8">
          {!sent ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (!isValidEmail(email)) {
                  toast.error(t("lg.emailInvalid"));
                  return;
                }
                const next = generateCode();
                setSent(next);
                toast.success(`${t("lg.codeSent")} ${email.trim()} — ${t("ct.demoCode")} ${next}`);
              }}
            >
              <label htmlFor="login-email" className="text-sm font-semibold">
                {t("lg.email")}
              </label>
              <input
                id="login-email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@gmail.com"
                required
                className="mt-2 w-full rounded-lg border border-input bg-background p-3 text-sm outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="mt-5 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {t("lg.sendCode")}
              </button>
            </form>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (code.trim() !== sent) {
                  toast.error(t("ct.codeWrong"));
                  return;
                }
                login({ name: email.split("@")[0] ?? "", email: email.trim() });
                setCode("");
                setSent(null);
                toast.success(t("ct.verified"));
              }}
            >
              <p className="text-sm text-muted-foreground">
                {t("lg.codeSent")} <span className="font-semibold text-foreground">{email}</span>
              </p>
              <p className="mt-2 rounded-lg bg-secondary p-3 text-xs text-muted-foreground">
                {t("ct.demoCode")} <span className="font-bold text-foreground">{sent}</span>
              </p>
              <label htmlFor="login-code" className="mt-5 block text-sm font-semibold">
                {t("ct.codeLabel")}
              </label>
              <input
                id="login-code"
                inputMode="numeric"
                maxLength={6}
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
                placeholder="123456"
                required
                className="mt-2 w-full rounded-lg border border-input bg-background p-3 text-center text-lg font-bold tracking-[0.4em] outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="mt-5 w-full rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
              >
                {t("lg.signIn")}
              </button>
              <div className="mt-3 flex justify-between text-xs font-semibold text-primary">
                <button
                  type="button"
                  onClick={() => {
                    const next = generateCode();
                    setSent(next);
                    toast.success(`${t("ct.codeResent")} ${next}`);
                  }}
                >
                  {t("ct.resend")}
                </button>
                <button type="button" onClick={() => setSent(null)}>
                  {t("ct.changeEmail")}
                </button>
              </div>
            </form>
          )}

          <p className="mt-6 text-sm text-muted-foreground">
            {t("lg.noAccount")}{" "}
            <Link to="/contact" className="font-semibold text-primary hover:underline">
              {t("lg.createOne")}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
