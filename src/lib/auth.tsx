import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type AccountUser = { name: string; email: string; role?: string };

type AuthCtx = {
  user: AccountUser | null;
  login: (user: AccountUser) => void;
  logout: () => void;
};

const STORAGE_KEY = "agrirwanda.user";
const Ctx = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AccountUser | null>(null);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setUser(JSON.parse(raw) as AccountUser);
    } catch {
      /* ignore */
    }
  }, []);

  const login = useCallback((next: AccountUser) => {
    setUser(next);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    } catch {
      /* ignore */
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

/** Basic email check — accepts Gmail and any other valid address. */
export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(email.trim());
}

/** Generates a 6-digit verification code (demo: shown on screen instead of emailed). */
export function generateCode() {
  return String(Math.floor(100000 + Math.random() * 900000));
}
