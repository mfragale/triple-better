import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals"),
  ...compat.extends("next/typescript"),
  ...compat.extends("prettier"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    files: ["**/*.{js,jsx,ts,tsx}"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
    plugins: {
      "check-file": (await import("eslint-plugin-check-file")).default,
      n: (await import("eslint-plugin-n")).default,
      "react-refresh": (await import("eslint-plugin-react-refresh")).default,
    },
    rules: {
      // Await your promises
      "@typescript-eslint/no-floating-promises": "error",

      quotes: [
        "error",
        "double",
        { avoidEscape: true, allowTemplateLiterals: false },
      ],

      // next-intl - Avoid hardcoded labels
      "react/jsx-no-literals": "error",

      // next-intl - Consistently import navigation APIs from `@/i18n/navigation`
      "no-restricted-imports": [
        "error",
        {
          name: "next/link",
          message: "Please import from `@/i18n/navigation` instead.",
        },
        {
          name: "next/navigation",
          importNames: [
            "redirect",
            "permanentRedirect",
            "useRouter",
            "usePathname",
          ],
          message: "Please import from `@/i18n/navigation` instead.",
        },
      ],

      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" },
      ],

      "n/no-process-env": ["error"],

      "prefer-arrow-callback": ["error"],

      "prefer-template": ["error"],

      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts,tsx}": "KEBAB_CASE",
        },
        {
          // ignore the middle extensions of the filename to support filename like bable.config.js or smoke.spec.ts
          ignoreMiddleExtensions: true,
        },
      ],

      "check-file/folder-naming-convention": [
        "error",
        {
          // all folders within src (except __tests__)should be named in kebab-case
          "src/**/!^[.*": "KEBAB_CASE",
        },
      ],

      "import/no-restricted-paths": [
        "error",
        {
          zones: [
            // enforce unidirectional codebase:
            // e.g. src/app can import from src/features but not the other way around
            // {
            //   target: "./src/features",
            //   from: "./src/app",
            // },

            // e.g src/features and src/app can import from these shared modules but not the other way around
            {
              target: [
                "./src/components",
                "./src/hooks",
                "./src/lib",
                "./src/types",
                "./src/utils",
              ],
              from: [
                // "./src/features",
                "./src/app",
              ],
            },
          ],
        },
      ],
    },
  },
];

export default eslintConfig;
