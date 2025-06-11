import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import * as React from "react";
import { Icons } from "./icons/icons";
import { Badge } from "./ui/badge";

const techStack = [
  {
    name: "TypeScript",
    description: "TypeScript is JavaScript with syntax for types.",
    href: "https://www.typescriptlang.org/",
    icon: Icons.typescript,
    tags: ["Core Technologies"],
  },
  {
    name: "React",
    description: "The library for web and native user interfaces.",
    href: "https://react.dev/",
    icon: Icons.react,
    tags: ["Core Technologies"],
  },
  {
    name: "Next.js",
    description: "The React Framework for the Web.",
    href: "https://nextjs.org/",
    icon: Icons.nextjs,
    tags: ["Core Technologies"],
  },
  {
    name: "Triplit",
    description:
      "An open-source database that syncs data between server and browser in real-time.",
    href: "https://triplit.dev/",
    icon: Icons.triplit,
    tags: ["Database and ORM"],
  },
  {
    name: "Radix UI",
    description:
      "An open source component library optimized for fast development, easy maintenance, and accessibility.",
    href: "https://www.radix-ui.com/",
    icon: Icons.radix,
    tags: ["UI Components & Styling"],
  },
  {
    name: "Tailwind CSS",
    description:
      "A utility-first CSS framework that can be composed to build any design, directly in your markup.",
    href: "https://tailwindcss.com/",
    icon: Icons.tailwind,
    tags: ["UI Components & Styling"],
  },
  {
    name: "Shadcn UI",
    description:
      "A set of beautifully-designed, accessible components and a code distribution platform.",
    href: "https://ui.shadcn.com/",
    icon: Icons.shadcn,
    tags: ["UI Components & Styling"],
  },
  {
    name: "Lucide",
    description: "Beautiful & consistent icons. Made by the community.",
    href: "https://lucide.dev/",
    icon: Icons.lucide,
    tags: ["UI Components & Styling"],
  },
  {
    name: "Better Auth UI",
    description: "Beautiful shadcn/ui components built for better-auth.",
    href: "https://better-auth-ui.com/",
    icon: Icons.betterAuthUi,
    tags: ["UI Components & Styling"],
  },
  {
    name: "React Hook Form",
    description:
      "Performant, flexible and extensible forms with easy-to-use validation.",
    href: "https://react-hook-form.com/",
    icon: Icons.reactHookForm,
    tags: ["Form Handling & Validation"],
  },
  {
    name: "Zod",
    description:
      "TypeScript-first schema validation with static type inference.",
    href: "https://zod.dev/",
    icon: Icons.zod,
    tags: ["Form Handling & Validation"],
  },
];

export default function IntegrationsSection() {
  const t = useTranslations("AboutPage");
  return (
    <section>
      <div className="py-32">
        <div className="mx-auto px-6 max-w-5xl">
          <div className="mb-12 text-center">
            <h2 className="font-semibold text-3xl md:text-4xl text-balance">
              Integrate with your favorite tools
            </h2>
            <p className="mt-6 text-muted-foreground">
              Connect seamlessly with popular platforms and services to enhance
              your workflow.
            </p>
          </div>

          <div className="gap-3 grid sm:grid-cols-2 lg:grid-cols-3 my-4">
            {techStack.map((item) => (
              <IntegrationCard
                key={item.name}
                title={item.name}
                description={item.description}
                link={item.href}
                tags={item.tags}
                icon={<item.icon aria-hidden="true" className="size-6" />}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const IntegrationCard = ({
  title,
  description,
  link,
  icon,
  tags,
}: {
  title: string;
  description: string;
  link: string;
  icon: React.ReactNode;
  tags: string[];
}) => {
  return (
    <Card className="justify-between gap-2 p-6">
      <div className="flex justify-between items-start gap-2">
        <div className="*:size-10">{icon}</div>
        <div className="flex gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant="outline"
              //   className={cn(
              //     "text-[8px]",
              //     tag === "Core Technologies" &&
              //       "border-amber-500/50 text-amber-500/50",
              //     tag === "UI Components & Styling" &&
              //       "border-blue-500/50 text-blue-500/50",
              //     tag === "Form Handling & Validation" &&
              //       "border-green-500/50 text-green-500/50",
              //     tag === "Database and ORM" &&
              //       "border-red-500/50 text-red-500/50"
              //   )}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      <div className="space-y-2 py-6">
        <h3 className="font-medium text-base">{title}</h3>
        <p
          title={description}
          className="text-muted-foreground text-sm line-clamp-2"
        >
          {description}
        </p>
      </div>

      <div className="flex gap-3 pt-6 border-t border-dashed s">
        <Button
          asChild
          variant="secondary"
          size="sm"
          className="gap-1 shadow-none pr-2"
        >
          <Link href={link ?? ""} target="_blank">
            Learn More
            <ChevronRight className="opacity-50 ml-0 !size-3.5" />
          </Link>
        </Button>
      </div>
    </Card>
  );
};
