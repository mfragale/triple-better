import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "en",
  localePrefix: "never",
  pathnames: {
    // AUTH
    "/auth/sign-in": {
      pt: "/auth/entrar",
    },
    "/auth/sign-out": {
      pt: "/auth/sair",
    },
    "/auth/sign-up": {
      pt: "/auth/registrar",
    },
    "/auth/forgot-password": {
      pt: "/auth/esqueceu-senha",
    },
    "/auth/reset-password": {
      pt: "/auth/resetar-senha",
    },
    "/auth/magic-link": {
      pt: "/auth/magic-link",
    },
    "/auth/settings": {
      pt: "/auth/configuracoes",
    },

    // MARKETING
    "/": "/",
    "/about": {
      pt: "/sobre",
    },

    // PROTECTED
    "/dashboard": {
      pt: "/painel",
    },
    "/dashboard/settings": {
      pt: "/painel/configuracoes",
    },
    "/protected": {
      pt: "/protegida",
    },
  },
});
