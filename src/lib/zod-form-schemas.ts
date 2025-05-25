import { useTranslations } from "next-intl";
import { z } from "zod";

export const useEditTodoFormSchema = () => {
  //https://github.com/gcascio/next-intl-zod/blob/main/messages/zod/en.json
  //https://github.com/aiji42/zod-i18n/blob/main/packages/core/locales/en/zod.json
  const t = useTranslations("zod");

  const editTodoFormSchema = z.object({
    editedTodoItem: z
      .string()
      .min(2, {
        message: t("errors.too_small.string.inclusive", { minimum: 2 }),
      })
      .max(50, {
        message: t("errors.too_big.string.inclusive", { maximum: 50 }),
      }),
    editedTodoItemId: z.string(),
  });

  return editTodoFormSchema;
};

export type TEditTodoFormSchema = z.infer<
  ReturnType<typeof useEditTodoFormSchema>
>;

export const useNewTodoFormSchema = () => {
  //https://github.com/gcascio/next-intl-zod/blob/main/messages/zod/en.json
  //https://github.com/aiji42/zod-i18n/blob/main/packages/core/locales/en/zod.json
  const t = useTranslations("zod");

  const newTodoFormSchema = z.object({
    newTodoItem: z
      .string()
      .min(2, {
        message: t("errors.too_small.string.inclusive", { minimum: 2 }),
      })
      .max(50, {
        message: t("errors.too_big.string.inclusive", { maximum: 50 }),
      }),
  });

  return newTodoFormSchema;
};

export type TNewTodoFormSchema = z.infer<
  ReturnType<typeof useNewTodoFormSchema>
>;
