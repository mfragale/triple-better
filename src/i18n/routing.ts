import { defineRouting } from "next-intl/routing";
import { defaultLocale, locales } from "./config";

export const routing = defineRouting({
  locales: locales,
  defaultLocale: defaultLocale,
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
    "/dashboard/todo/[id]": {
      pt: "/painel/tarefa/[id]",
    },
  },
});
