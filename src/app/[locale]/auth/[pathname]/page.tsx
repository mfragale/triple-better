// import { authViewPaths } from "@daveyplate/better-auth-ui/server";
// import { AuthView } from "./view";

// export function generateStaticParams() {
//   return Object.values(authViewPaths).map((pathname) => ({ pathname }));
// }

// export default async function AuthPage({
//   params,
// }: {
//   params: Promise<{ pathname: string }>;
// }) {
//   const { pathname } = await params;

//   return <AuthView pathname={pathname} />;
// }

import { AuthCard } from "@daveyplate/better-auth-ui";

export default async function AuthPage({
  params,
}: {
  params: Promise<{ pathname: string; locale: string }>;
}) {
  const { pathname } = await params;

  return (
    <div className="flex flex-col justify-center items-center gap-3 size-full grow">
      <AuthCard pathname={pathname} />
    </div>
  );
}
