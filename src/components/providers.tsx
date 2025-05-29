"use client";

import { useTriplitHooks } from "@daveyplate/better-auth-ui/triplit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { triplit } from "../../triplit/client";

import { useSession } from "@/hooks/auth-hooks";
import { useTriplitAuth } from "@/hooks/use-triplit-auth";
import { authClient } from "@/lib/auth-client";
import { AuthUIProviderTanstack } from "@daveyplate/better-auth-ui/tanstack";
import { useTranslations } from "next-intl";
import { Toaster } from "sonner";
import { genUploader } from "uploadthing/client";
import type { OurFileRouter } from "../app/api/uploadthing/core";
import { PlanningCenterIcon } from "./icons/planning-center";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: sessionData, isPending } = useSession();

  useTriplitAuth();
  const { hooks } = useTriplitHooks({
    triplit: triplit,
    sessionData,
    isPending,
    usePlural: true,
  });

  const t = useTranslations("AuthUIProvider");

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange>
      <AuthUIProviderTanstack
        authClient={authClient}
        navigate={router.push}
        replace={router.replace}
        onSessionChange={() => {
          // Clear router cache (protected routes)
          router.refresh();
        }}
        otherProviders={[
          {
            provider: "planning-center",
            name: "Planning Center",
            icon: PlanningCenterIcon,
          },
        ]}
        Link={Link}
        hooks={hooks}
        settingsURL="/dashboard/settings"
        additionalFields={{
          company: {
            label: "Company",
            placeholder: "Your company name",
            description: "Enter your company name",
            required: true,
            type: "string",
          },
          age: {
            label: "Age",
            placeholder: "Your age",
            description: "Enter your age",
            instructions: "You must be 18 or older",
            required: true,
            type: "number",
          },
        }}
        settingsFields={["company", "age"]}
        signUpFields={["company", "age"]}
        localization={{
          missingCaptchaResponse: t("missingCaptchaResponse"),
          byContinuingYouAgree: t("byContinuingYouAgree"),
          protectedByRecaptcha: t("protectedByRecaptcha"),
          termsOfService: t("termsOfService"),
          privacyPolicy: t("privacyPolicy"),
          uploadAvatar: t("uploadAvatar"),
          passwordTooLong: t("passwordTooLong"),
          passwordTooShort: t("passwordTooShort"),
          sessionExpired: t("sessionExpired"),
          sessionNotFresh: t("sessionNotFresh"),
          passwordInvalid: t("passwordInvalid"),
          invalidEmailOrPassword: t("invalidEmailOrPassword"),
          goBack: t("goBack"),
          verifyYourEmailDescription: t("verifyYourEmailDescription"),
          verifyYourEmail: t("verifyYourEmail"),
          signInUsernamePlaceholder: t("signInUsernamePlaceholder"),
          usernamePlaceholder: t("usernamePlaceholder"),
          usernameInstructions: t("usernameInstructions"),
          usernameDescription: t("usernameDescription"),
          username: t("username"),
          updatedSuccessfully: t("updatedSuccessfully"),
          unlink: t("unlink"),
          sendVerificationCode: t("sendVerificationCode"),
          twoFactorTotpLabel: t("twoFactorTotpLabel"),
          twoFactorPrompt: t("twoFactorPrompt"),
          twoFactorDisabled: t("twoFactorDisabled"),
          twoFactorEnabled: t("twoFactorEnabled"),
          twoFactorEnableInstructions: t("twoFactorEnableInstructions"),
          twoFactorDisableInstructions: t("twoFactorDisableInstructions"),
          twoFactorCardDescription: t("twoFactorCardDescription"),
          twoFactorDescription: t("twoFactorDescription"),
          twoFactorAction: t("twoFactorAction"),
          twoFactor: t("twoFactor"),
          trustDevice: t("trustDevice"),
          switchAccount: t("switchAccount"),
          security: t("security"),
          save: t("save"),
          settings: t("settings"),
          setPasswordDescription: t("setPasswordDescription"),
          setPassword: t("setPassword"),
          sessionsDescription: t("sessionsDescription"),
          sessions: t("sessions"),
          signUpEmail: t("signUpEmail"),
          signUpDescription: t("signUpDescription"),
          signUpAction: t("signUpAction"),
          signUp: t("signUp"),
          signOut: t("signOut"),
          signInWith: t("signInWith"),
          signInUsernameDescription: t("signInUsernameDescription"),
          signInDescription: t("signInDescription"),
          signInAction: t("signInAction"),
          signIn: t("signIn"),
          apiKey: t("apiKey"),
          deleteApiKeyConfirmation: t("deleteApiKeyConfirmation"),
          deleteApiKey: t("deleteApiKey"),
          revoke: t("revoke"),
          requestFailed: t("requestFailed"),
          resetPasswordSuccess: t("resetPasswordSuccess"),
          resetPasswordInvalidToken: t("resetPasswordInvalidToken"),
          resetPasswordDescription: t("resetPasswordDescription"),
          resetPasswordAction: t("resetPasswordAction"),
          resetPassword: t("resetPassword"),
          resendVerificationEmail: t("resendVerificationEmail"),
          resendCode: t("resendCode"),
          rememberMe: t("rememberMe"),
          recoverAccountDescription: t("recoverAccountDescription"),
          recoverAccountAction: t("recoverAccountAction"),
          recoverAccount: t("recoverAccount"),
          providersDescription: t("providersDescription"),
          providers: t("providers"),
          passwordsDoNotMatch: t("passwordsDoNotMatch"),
          passwordRequired: t("passwordRequired"),
          passwordPlaceholder: t("passwordPlaceholder"),
          password: t("password"),
          create: t("create"),
          noExpiration: t("noExpiration"),
          expires: t("expires"),
          neverExpires: t("neverExpires"),
          apiKeyCreatedDescription: t("apiKeyCreatedDescription"),
          apiKeyCreated: t("apiKeyCreated"),
          apiKeyNamePlaceholder: t("apiKeyNamePlaceholder"),
          createApiKeyDescription: t("createApiKeyDescription"),
          createApiKey: t("createApiKey"),
          apiKeysInstructions: t("apiKeysInstructions"),
          apiKeysDescription: t("apiKeysDescription"),
          apiKeys: t("apiKeys"),
          passkeysInstructions: t("passkeysInstructions"),
          passkeysDescription: t("passkeysDescription"),
          passkeys: t("passkeys"),
          passkey: t("passkey"),
          orContinueWith: t("orContinueWith"),
          oneTimePassword: t("oneTimePassword"),
          newPasswordRequired: t("newPasswordRequired"),
          newPasswordPlaceholder: t("newPasswordPlaceholder"),
          newPassword: t("newPassword"),
          namePlaceholder: t("namePlaceholder"),
          nameInstructions: t("nameInstructions"),
          nameDescription: t("nameDescription"),
          name: t("name"),
          emailOTPVerificationSent: t("emailOTPVerificationSent"),
          emailOTPDescription: t("emailOTPDescription"),
          emailOTPVerifyAction: t("emailOTPVerifyAction"),
          emailOTPSendAction: t("emailOTPSendAction"),
          emailOTP: t("emailOTP"),
          magicLinkEmail: t("magicLinkEmail"),
          magicLinkDescription: t("magicLinkDescription"),
          magicLinkAction: t("magicLinkAction"),
          magicLink: t("magicLink"),
          link: t("link"),
          invalidTwoFactorCookie: t("invalidTwoFactorCookie"),
          forgotPasswordLink: t("forgotPasswordLink"),
          forgotPasswordEmail: t("forgotPasswordEmail"),
          forgotPasswordDescription: t("forgotPasswordDescription"),
          forgotPasswordAction: t("forgotPasswordAction"),
          forgotPassword: t("forgotPassword"),
          forgotAuthenticator: t("forgotAuthenticator"),
          isTheSame: t("isTheSame"),
          isRequired: t("isRequired"),
          isInvalid: t("isInvalid"),
          error: t("error"),
          enable: t("enable"),
          emailVerification: t("emailVerification"),
          emailVerifyChange: t("emailVerifyChange"),
          emailRequired: t("emailRequired"),
          emailPlaceholder: t("emailPlaceholder"),
          emailIsTheSame: t("emailIsTheSame"),
          emailInvalid: t("emailInvalid"),
          emailInstructions: t("emailInstructions"),
          emailDescription: t("emailDescription"),
          email: t("email"),
          done: t("done"),
          dontHaveAnAccount: t("dontHaveAnAccount"),
          disabledCredentialsDescription: t("disabledCredentialsDescription"),
          disable: t("disable"),
          deleteAccountNotFresh: t("deleteAccountNotFresh"),
          deleteAccountSuccess: t("deleteAccountSuccess"),
          deleteAccountVerify: t("deleteAccountVerify"),
          deleteAccountInstructions: t("deleteAccountInstructions"),
          deleteAccountDescription: t("deleteAccountDescription"),
          deleteAccount: t("deleteAccount"),
          deleteAvatar: t("deleteAvatar"),
          delete: t("delete"),
          currentSession: t("currentSession"),
          currentPasswordPlaceholder: t("currentPasswordPlaceholder"),
          currentPassword: t("currentPassword"),
          continue: t("continue"),
          copyAllCodes: t("copyAllCodes"),
          copyToClipboard: t("copyToClipboard"),
          copiedToClipboard: t("copiedToClipboard"),
          continueWithAuthenticator: t("continueWithAuthenticator"),
          confirmPasswordRequired: t("confirmPasswordRequired"),
          confirmPasswordPlaceholder: t("confirmPasswordPlaceholder"),
          confirmPassword: t("confirmPassword"),
          changePasswordSuccess: t("changePasswordSuccess"),
          changePasswordInstructions: t("changePasswordInstructions"),
          changePasswordDescription: t("changePasswordDescription"),
          changePassword: t("changePassword"),
          cancel: t("cancel"),
          backupCodeAction: t("backupCodeAction"),
          backupCode: t("backupCode"),
          backupCodePlaceholder: t("backupCodePlaceholder"),
          backupCodesDescription: t("backupCodesDescription"),
          backupCodes: t("backupCodes"),
          backupCodeRequired: t("backupCodeRequired"),
          avatarInstructions: t("avatarInstructions"),
          avatarDescription: t("avatarDescription"),
          avatar: t("avatar"),
          alreadyHaveAnAccount: t("alreadyHaveAnAccount"),
          addPasskey: t("addPasskey"),
          addAccount: t("addAccount"),
          accountsInstructions: t("accountsInstructions"),
          accountsDescription: t("accountsDescription"),
          accounts: t("accounts"),
          account: t("account"),
        }}
        uploadAvatar={async (file: File) => {
          const { uploadFiles } = genUploader<OurFileRouter>();

          const response = await uploadFiles("imageUploader", {
            files: [file],
          });
          return response[0].ufsUrl;
        }}>
        {children}
        <Toaster richColors />
      </AuthUIProviderTanstack>
    </ThemeProvider>
  );
}
