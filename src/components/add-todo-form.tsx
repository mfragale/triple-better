"use client";

import { Button } from "@/components/ui/button";
import { triplitClient } from "@/lib/triplit";
import { ArrowRight, Plus } from "lucide-react";
import { Card, CardHeader } from "./ui/card";

export function AddTodoForm() {
  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title");
    if (!title) return;
    // console.log(title);
    try {
      const insertedTodo = await triplitClient.insert("todos", {
        text: title as string,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <form action={handleSubmit}>
      <Card className="bg-muted dark:bg-zinc-950 py-2 has-[input:focus]:ring has-[input:focus]:ring-indigo-500">
        <CardHeader className="flex justify-between items-center px-2">
          <div className="flex items-center gap-2 w-full">
            <Button variant="ghost" size="icon" type="button">
              <ArrowRight />
            </Button>
            <input
              placeholder="Add an item..."
              className="bg-transparent -my-2 focus:outline-none w-full h-12"
              type="text"
              name="title"
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
