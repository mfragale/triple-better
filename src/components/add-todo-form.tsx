"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { triplitClient } from "@/lib/triplit";

export function AddTodoForm() {
  const handleSubmit = async (formData: FormData) => {
    const title = formData.get("title");
    // console.log(title);
    const insertedTodo = await triplitClient.insert("todos", {
      text: title as string,
    });
  };

  return (
    <form action={handleSubmit}>
      <Input type="text" name="title" />
      <Button type="submit">Add</Button>
    </form>
  );
}
