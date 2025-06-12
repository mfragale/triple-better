import { env } from "@/env/client";
import Image from "next/image";

export const Logo = () => (
  <Image
    src="/icon-circle.png"
    alt={env.NEXT_PUBLIC_APP_NAME}
    width={32}
    height={32}
  />
);
