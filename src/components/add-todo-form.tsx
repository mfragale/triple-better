"use client";

import { Button } from "@/components/ui/button";
import {
  TNewTodoFormSchema,
  useNewTodoFormSchema,
} from "@/lib/zod-form-schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { triplitClient } from "../../triplit/client";
import { Card, CardHeader } from "./ui/card";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

export function AddTodoForm({ nextItemIndex }: { nextItemIndex: number }) {
  const newTodoFormSchema = useNewTodoFormSchema();

  const form = useForm<TNewTodoFormSchema>({
    resolver: zodResolver(newTodoFormSchema),
    defaultValues: {
      newTodoItem: "",
    },
  });

  async function onSubmit(values: TNewTodoFormSchema) {
    const newTodoItem = values.newTodoItem;

    if (!newTodoItem) return;

    try {
      const insertedTodo = await triplitClient.insert("todos", {
        text: newTodoItem,
        order: nextItemIndex,
      });
      await new Promise((resolve) => setTimeout(resolve, 200));
      form.reset();
    } catch (error) {
      console.error(error);
    }
  }

  const t = useTranslations("AddTodoForm");

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
