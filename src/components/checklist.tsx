"use client";

import { triplitClient } from "@/lib/triplit";
import { cn } from "@/lib/utils";
import { useQuery } from "@triplit/react";
import { Check, CornerDownLeft, Square } from "lucide-react";
import { useState } from "react";
import { AddTodoForm } from "./add-todo-form";
import { SortableItem, SortableList } from "./sortable-list";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Checklist() {
  const { results: todos } = useQuery(
    triplitClient,
    triplitClient.query("todos").Order("order", "ASC")
  );

  const updateOrder = async (itemsIds: string[]) => {
    if (itemsIds.length === 0) return { error: true, message: "No items" };

    itemsIds.map((id, index) => {
      triplitClient.update("todos", id, {
        order: index,
      });
    });

    return { error: false, message: "Order updated" };
  };

  const [isEditing, setIsEditing] = useState<string | null>(null);

  const handleTodoUpdate = async (formData: FormData) => {
    console.log(formData);

    const text = formData.get("text");
    const id = formData.get("id");

    if (!text) return;

    triplitClient
      .update("todos", id as string, {
        text: text as string,
      })
      .then(async () => {
        setIsEditing(null);
      });
  };

  return (
    <SortableList items={todos ?? []} onOrderChange={updateOrder}>
      {(todos) => (
        <div className="flex flex-col gap-2 mx-auto px-4 py-12 max-w-xl">
          {todos.map((todo) => (
            <SortableItem key={todo.id} id={todo.id}>
              <div className="flex items-center gap-2 grow">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    triplitClient.update("todos", todo.id, {
                      completed: !todo.completed,
                    });
                  }}>
                  {todo.completed ? (
                    <Check className="text-green-500" />
                  ) : (
                    <Square />
                  )}
                </Button>
                {isEditing === todo.id ? (
                  <form
                    action={handleTodoUpdate}
                    className="flex items-center gap-2 w-full">
                    <input type="hidden" name="id" value={todo.id} />
                    <Input
                      autoFocus
                      type="text"
                      name="text"
                      onBlur={(e) => {
                        const form = e.target.form;
                        if (form) form.requestSubmit();
                      }}
                      defaultValue={todo.text}
                      className="border-none focus-visible:ring-0 w-full md:text-base"
                    />
                    <Button type="submit" size="icon">
                      <CornerDownLeft />
                    </Button>
                  </form>
                ) : (
                  <div
                    onClick={() => {
                      setIsEditing(todo.id);
                    }}
                    className={cn(
                      "w-full cursor-text pl-3",
                      todo.completed && "line-through text-muted-foreground/30"
                    )}>
                    {todo.text}
                  </div>
                )}
              </div>
            </SortableItem>
          ))}
          <AddTodoForm nextItemIndex={todos?.length} />
        </div>
      )}
    </SortableList>
  );
}
