import { env } from "@/env/server";
import Image from "next/image";

export const Logo = () => (
  <Image src="/icon-circle.png" alt={env.APP_NAME} width={32} height={32} />
);
