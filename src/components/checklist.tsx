"use client";

import { triplitClient } from "@/lib/triplit";
import { cn } from "@/lib/utils";
import { useQuery } from "@triplit/react";
import { Check, Square } from "lucide-react";
import { AddTodoForm } from "./add-todo-form";
import { SortableItem, SortableList } from "./sortable-list";
import { Button } from "./ui/button";

export default function Checklist() {
  // const { results: todos } = useQuery(
  //   triplitClient,
  //   triplitClient.query("todos").Order("created_at", "ASC")
  // );

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
  return (
    <>
      <p>Next item order: {todos?.length}</p>
      <SortableList items={todos ?? []} onOrderChange={updateOrder}>
        {(todos) => (
          <div className="flex flex-col gap-2 mx-auto px-4 py-12 max-w-xl">
            {todos.map((todo) => (
              <SortableItem key={todo.id} id={todo.id}>
                <div className="flex items-center gap-2">
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
                  <span
                    className={cn(
                      todo.completed && "line-through text-muted-foreground/30"
                    )}>
                    {todo.text}
                  </span>
                </div>
              </SortableItem>
            ))}
            <AddTodoForm nextItemIndex={todos?.length} />
          </div>
        )}
      </SortableList>

      {/* <div className="flex flex-col gap-2 mx-auto px-4 py-12 max-w-xl">
        {todos?.map((todo) => (
          <Card key={todo.id} className="group py-2">
            <CardHeader className="flex justify-between items-center px-2">
              <div className="flex items-center gap-2">
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
                <span
                  className={cn(
                    todo.completed && "line-through text-muted-foreground/30"
                  )}>
                  {todo.text}
                </span>
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity">
                    <Trash2 />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80">
                  <div className="gap-4 grid">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">
                        Are you sure?
                      </h4>
                      <p className="text-muted-foreground text-sm">
                        This action cannot be undone.
                      </p>
                    </div>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        triplitClient.delete("todos", todo.id);
                      }}>
                      Delete
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </CardHeader>
          </Card>
        ))}
        <AddTodoForm />
      </div> */}
    </>
  );
}
