import { useTranslations } from "next-intl";
import { boolean, date, string, z } from "zod";

//https://github.com/gcascio/next-intl-zod/blob/main/messages/zod/en.json
//https://github.com/aiji42/zod-i18n/blob/main/packages/core/locales/en/zod.json

const usePasswordSchema = () => {
  const t = useTranslations("zod");

  return string({ required_error: t("errors.invalid_type_received_undefined") })
    .min(8, {
      message: t("errors.too_small.string.inclusive", { minimum: 8 }),
    })
    .max(32, {
      message: t("errors.too_big.string.inclusive", { maximum: 32 }),
    });
};

const useEmailSchema = () => {
  const t = useTranslations("zod");

  return string({ required_error: t("errors.invalid_type_received_undefined") })
    .min(1, {
      message: t("errors.too_small.string.inclusive", { minimum: 1 }),
    })
    .email({
      message: t("errors.invalid_string.email", { validation: "email" }),
    });
};

const useNameSchema = () => {
  const t = useTranslations("zod");

  return string({ required_error: t("errors.invalid_type_received_undefined") })
    .min(1, {
      message: t("errors.too_small.string.inclusive", { minimum: 1 }),
    })
    .max(50, {
      message: t("errors.too_big.string.inclusive", { maximum: 50 }),
    });
};

const useBooleanSchema = (initial: boolean) => boolean().default(initial);

export const useEditTodoFormSchema = () => {
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

export const useNewTodoFormSchema = () => {
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

export const useSignUpSchema = () => {
  const t = useTranslations("zod");

  const signUpSchema = z
    .object({
      name: useNameSchema(),
      email: useEmailSchema(),
      church: useNameSchema(),
      birthdate: date({
        required_error: t("errors.invalid_type_received_undefined"),
      }),
      password: usePasswordSchema(),
      confirmPassword: usePasswordSchema(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("errors.confirmPassword.match"),
      path: ["confirmPassword"],
    });
  return signUpSchema;
};

export const useSignInSchema = () => {
  const signInSchema = z.object({
    email: useEmailSchema(),
    password: usePasswordSchema(),
  });
  return signInSchema;
};

export const useForgotPasswordSchema = () => {
  const forgotPasswordSchema = z.object({
    email: useEmailSchema(),
  });
  return forgotPasswordSchema;
};

export const useResetPasswordSchema = () => {
  const t = useTranslations("zod");

  const resetPasswordSchema = z
    .object({
      password: usePasswordSchema(),
      confirmPassword: usePasswordSchema(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t("errors.confirmPassword.match"),
      path: ["confirmPassword"],
    });
  return resetPasswordSchema;
};

export const useChangePasswordSchema = () => {
  const t = useTranslations("zod");

  const changePasswordSchema = z
    .object({
      currentPassword: usePasswordSchema(),
      newPassword: usePasswordSchema(),
      confirmNewPassword: usePasswordSchema(),
      revokeOtherSessions: useBooleanSchema(true).optional(),
    })
    .refine((data) => data.newPassword === data.confirmNewPassword, {
      message: t("errors.confirmPassword.match"),
      path: ["confirmPassword"],
    });
  return changePasswordSchema;
};

export type TEditTodoFormSchema = z.infer<
  ReturnType<typeof useEditTodoFormSchema>
>;
export type TNewTodoFormSchema = z.infer<
  ReturnType<typeof useNewTodoFormSchema>
>;
export type TsignUpSchema = z.infer<ReturnType<typeof useSignUpSchema>>;
export type TsignInSchema = z.infer<ReturnType<typeof useSignInSchema>>;
export type TforgotPasswordSchema = z.infer<
  ReturnType<typeof useForgotPasswordSchema>
>;
export type TresetPasswordSchema = z.infer<
  ReturnType<typeof useResetPasswordSchema>
>;
export type TchangePasswordSchema = z.infer<
  ReturnType<typeof useChangePasswordSchema>
>;
