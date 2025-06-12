"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
  TnewTodoFormSchema,
  useNewTodoFormSchema,
} from "@/lib/zod-form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { triplit } from "../../triplit/client";
import { Card, CardHeader } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

export function AddTodoForm({ nextItemIndex }: { nextItemIndex: number }) {
  const t = useTranslations("AddTodoForm");

  const { data: sessionData } = authClient.useSession();

  const newTodoFormSchema = useNewTodoFormSchema();

  const form = useForm<TnewTodoFormSchema>({
    // Client side validation
    resolver: zodResolver(newTodoFormSchema),
    defaultValues: {
      newTodoItem: "",
    },
  });

  async function onSubmit(values: TnewTodoFormSchema) {
    if (!sessionData?.user?.id) {
      form.setError("newTodoItem", {
        message: t("form.errorMessage.notAuthenticated"),
      });
      return;
    }

    try {
      const result = newTodoFormSchema.safeParse(values);

      // Server side validation
      if (!result.success) {
        const zodError = result.error;
        if (zodError && zodError.errors) {
          zodError.errors.forEach((err) => {
            const field = err.path.join(".");
            form.setError(field as keyof TnewTodoFormSchema, {
              message: err.message,
            });
          });
        }
        return;
      }

      // Do form action
      await triplit
        .insert("todos", {
          text: result.data.newTodoItem,
          order: nextItemIndex,
          userId: sessionData.user.id,
        })
        .then(async () => {
          await new Promise((resolve) => setTimeout(resolve, 100));
          form.reset();
        });
    } catch (error: unknown) {
      form.setError("newTodoItem", {
        message: (error as Error).message,
      });
    }
  }

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="bg-muted dark:bg-zinc-950 py-2 has-[input:focus]:ring has-[input:focus]:ring-indigo-500">
            <CardHeader className="flex justify-between items-start px-2">
              <div className="flex items-start gap-2 w-full">
                <Button variant="ghost" size="icon" type="button">
                  <ArrowRight />
                </Button>
                <FormField
                  control={form.control}
                  name="newTodoItem"
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          placeholder={t("addItemPlaceholder")}
                          className="dark:bg-transparent -my-2 pt-2 pl-3 border-0 focus-visible:ring-0 focus:ring-0 dark:focus:ring-0 w-full h-12 md:text-base"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage className="pl-3" />
                    </FormItem>
                  )}
                />
              </div>

              <Button size="icon" type="submit" variant="blue">
                <Plus />
              </Button>
            </CardHeader>
          </Card>
        </form>
      </Form>
    </>
  );
}
