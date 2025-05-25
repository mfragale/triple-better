"use client";

import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@triplit/react";
import { Check, CornerDownLeft, Square } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { triplitClient } from "../../triplit/client";
import { AddTodoForm } from "./add-todo-form";
import { SortableItem, SortableList } from "./sortable-list";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";

export default function Checklist() {
  const { results: todos } = useQuery(
    triplitClient,
    triplitClient.query("todos").Order("order", "ASC")
  );

  const t = useTranslations("Checklist");

  const updateOrder = async (itemsIds: string[]) => {
    if (itemsIds.length === 0) return { error: true, message: t("noItems") };

    itemsIds.map((id, index) => {
      triplitClient.update("todos", id, {
        order: index,
      });
    });

    return { error: false, message: t("orderUpdated") };
  };

  const [isEditing, setIsEditing] = useState<string | null>(null);

  const newTodoFormSchema = z.object({
    editedTodoItem: z.string().min(2).max(50),
    editedTodoItemId: z.string(),
  });

  const form = useForm<z.infer<typeof newTodoFormSchema>>({
    resolver: zodResolver(newTodoFormSchema),
    // defaultValues: {
    //   editedTodoItem: "",
    //   editedTodoItemId: "",
    // },
  });

  async function onSubmit(values: z.infer<typeof newTodoFormSchema>) {
    const editedTodoItem = values.editedTodoItem;
    const editedTodoItemId = values.editedTodoItemId;

    // if (!editedTodoItem) return;

    // console.log(editedTodoItem, editedTodoItemId);

    try {
      const updatedTodo = await triplitClient
        .update("todos", editedTodoItemId, async (entity) => {
          entity.text = editedTodoItem;
        })
        .then(async () => {
          await new Promise((resolve) => setTimeout(resolve, 200));
          setIsEditing(null);
        });
      form.reset();
      form.unregister("editedTodoItem");
      form.unregister("editedTodoItemId");
    } catch (error) {
      console.error(error);
    }
  }

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
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className="flex items-center w-full">
                      <FormField
                        control={form.control}
                        name="editedTodoItemId"
                        defaultValue={todo.id}
                        render={({ field }) => (
                          <Input type="hidden" {...field} />
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="editedTodoItem"
                        defaultValue={todo.text}
                        render={({ field }) => (
                          <FormItem className="w-full">
                            <FormControl>
                              <Input
                                autoFocus
                                className="dark:bg-transparent -my-2 pt-1 pl-3 border-0 focus-visible:ring-0 focus:ring-0 dark:focus:ring-0 w-full h-12 md:text-base"
                                {...field}
                                onBlur={form.handleSubmit(onSubmit)}
                              />
                            </FormControl>
                            <FormMessage className="pl-3" />
                          </FormItem>
                        )}
                      />
                      <Button type="submit" size="icon">
                        <CornerDownLeft />
                      </Button>
                    </form>
                  </Form>
                ) : (
                  <div
                    onClick={() => {
                      setIsEditing(todo.id);
                    }}
                    className={cn(
                      "w-full cursor-text pl-3 ",
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
