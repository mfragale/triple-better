"use client";

import { useSession } from "@/lib/auth-client";
import { AuthUIProvider, ProviderIcon } from "@daveyplate/better-auth-ui";
import { useTriplitHooks } from "@daveyplate/better-auth-ui/triplit";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { triplitClient } from "../../triplit/client";

import { authClient } from "@/lib/auth-client";
import { useTranslations } from "next-intl";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: sessionData, isPending } = useSession();
  const { hooks } = useTriplitHooks({
    triplit: triplitClient,
    sessionData: sessionData ?? undefined,
    isPending,
    usePlural: true,
  });

  const t = useTranslations("AuthUIProvider");

  const PlanningCenterIcon: ProviderIcon = ({ className }) => (
    <svg className={className} viewBox="0 0 42 43">
      <path
        fill="currentColor"
        d="M27.7,17.29c.13-.04.26.06.26.19v6.33c0,.09-.06.17-.14.19l-6.54,1.93c-.19.05-.38.05-.57,0l-6.51-1.93c-.08-.03-.14-.1-.14-.19v-6.33c0-.13.13-.23.26-.19l5.49,1.63c.79.23,1.63.23,2.41,0l5.49-1.63Z"
      />
      <path
        fill="currentColor"
        d="M23.58,1.35c-1.69-.46-3.47-.46-5.17,0l-13.23,3.6c-3.06.83-5.19,3.65-5.19,6.88v20.36c0,3.22,2.13,6.04,5.19,6.88l13.23,3.6c1.69.46,3.47.46,5.17,0l13.23-3.6c3.06-.83,5.19-3.65,5.19-6.88V11.82c0-3.22-2.13-6.04-5.19-6.88l-13.23-3.6ZM14.3,28.12c-.13-.04-.26.06-.26.19v4.38c0,.43-.4.74-.82.63l-2.75-.73c-.28-.08-.48-.33-.48-.63V15.45c0-1.75,1.76-3,3.49-2.49l7.21,2.14c.19.06.38.06.57,0l7.24-2.14c1.73-.51,3.49.74,3.49,2.49v9.47c0,1.14-.77,2.15-1.9,2.49l-7.89,2.34c-.79.23-1.63.23-2.41,0l-5.49-1.63Z"
      />
    </svg>
  );

  return (
    <AuthUIProvider
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
      }}>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange>
        {children}
      </ThemeProvider>
    </AuthUIProvider>
  );
}
