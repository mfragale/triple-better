"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight, Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { triplitClient } from "../../triplit/client";
import { Card, CardHeader } from "./ui/card";

export function AddTodoForm({ nextItemIndex }: { nextItemIndex: number }) {
  const handleSubmit = async (formData: FormData) => {
    const addItem = formData.get("addItem");
    if (!addItem) return;
    // console.log(addItem);
    try {
      const insertedTodo = await triplitClient.insert("todos", {
        text: addItem as string,
        order: nextItemIndex,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const t = useTranslations("AddTodoForm");

  return (
    <form action={handleSubmit}>
      <Card className="bg-muted dark:bg-zinc-950 py-2 has-[input:focus]:ring has-[input:focus]:ring-indigo-500">
        <CardHeader className="flex justify-between items-center px-2">
          <div className="flex items-center gap-2 w-full">
            <Button variant="ghost" size="icon" type="button">
              <ArrowRight />
            </Button>
            <input
              placeholder={t("addItemPlaceholder")}
              className="bg-transparent -my-2 pl-3 focus:outline-none w-full h-12"
              type="text"
              name="addItem"
            />
          </div>

          <Button size="icon" type="submit" variant="blue">
            <Plus />
          </Button>
        </CardHeader>
      </Card>
    </form>
  );
}
