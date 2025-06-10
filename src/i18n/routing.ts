import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["pt", "en"],
  defaultLocale: "en",
  localePrefix: "never",
  pathnames: {
    // AUTH
    "/email-verified": {
      pt: "/email-verificado",
    },
    "/forgot-password": {
      pt: "/esqueceu-senha",
    },
    "/reset-password": {
      pt: "/resetar-senha",
    },
    "/sign-in": {
      pt: "/entrar",
    },
    "/sign-out": {
      pt: "/sair",
    },
    "/sign-up": {
      pt: "/registrar",
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
    "/checkout": {
      pt: "/pagar",
    },
    "/pagarme": {
      pt: "/pagarme",
    },
  },
});
