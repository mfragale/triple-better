"use client";
import { Button } from "@/components/ui/button";
import { ArrowRight, Mail, SendHorizonal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <>
      <main>
        <section className="overflow-hidden">
          <div className="relative mx-auto px-6 py-28 lg:py-20 max-w-5xl">
            <div className="lg:flex lg:items-center lg:gap-12">
              <div className="z-10 relative mx-auto lg:ml-0 lg:w-1/2 max-w-xl lg:text-left text-center">
                <Link
                  href="/"
                  className="flex items-center gap-2 mx-auto lg:ml-0 p-1 pr-3 border rounded-(--radius) w-fit">
                  <span className="bg-muted px-2 py-1 rounded-[calc(var(--radius)-0.25rem)] text-xs">
                    New
                  </span>
                  <span className="text-sm">Introduction Tailark Html</span>
                  <span className="block bg-(--color-border) w-px h-4"></span>

                  <ArrowRight className="size-4" />
                </Link>

                <h1 className="mt-10 font-bold text-4xl md:text-5xl xl:text-5xl text-balance">
                  Production Ready Digital Marketing blocks
                </h1>
                <p className="mt-8">
                  Error totam sit illum. Voluptas doloribus asperiores quaerat
                  aperiam. Quidem harum omnis beatae ipsum soluta!
                </p>

                <div>
                  <form
                    action=""
                    className="mx-auto my-10 lg:my-12 lg:mr-auto lg:ml-0 max-w-sm">
                    <div className="relative items-center grid grid-cols-[1fr_auto] bg-background shadow shadow-zinc-950/5 pr-3 border rounded-[calc(var(--radius)+0.75rem)] has-[input:focus]:ring-2 has-[input:focus]:ring-muted">
                      <Mail className="left-5 absolute inset-y-0 my-auto size-5 text-caption pointer-events-none" />

                      <input
                        placeholder="Your mail address"
                        className="bg-transparent pl-12 focus:outline-none w-full h-14"
                        type="email"
                      />

                      <div className="md:pr-1.5 lg:pr-0">
                        <Button
                          aria-label="submit"
                          className="rounded-(--radius)">
                          <span className="hidden md:block">Get Started</span>
                          <SendHorizonal
                            className="md:hidden relative mx-auto size-5"
                            strokeWidth={2}
                          />
                        </Button>
                      </div>
                    </div>
                  </form>

                  <ul className="space-y-2 list-disc list-inside">
                    <li>Faster</li>
                    <li>Modern</li>
                    <li>100% Customizable</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="absolute inset-0 lg:col-span-3 -mx-4 p-3 rounded-3xl">
              <div className="relative">
                <div className="z-1 absolute -inset-17 bg-radial-[at_65%_25%] from-transparent to-40% to-background"></div>
                <Image
                  className="hidden dark:block"
                  src="/music.png"
                  alt="app illustration"
                  width={2796}
                  height={2008}
                />
                <Image
                  className="dark:hidden"
                  src="/music-light.png"
                  alt="app illustration"
                  width={2796}
                  height={2008}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
