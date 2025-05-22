"use client";

import { triplitClient } from "@/lib/triplit";
import { cn } from "@/lib/utils";
import { useQuery } from "@triplit/react";
import { Check, Square, Trash2 } from "lucide-react";
import { AddTodoForm } from "./add-todo-form";
import { Button } from "./ui/button";
import { Card, CardHeader } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export default function Checklist() {
  const { results: todos } = useQuery(
    triplitClient,
    triplitClient.query("todos").Order("created_at", "ASC")
  );
  return (
    <div className="flex flex-col gap-2 mx-auto px-4 py-12 max-w-xl">
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
                    <h4 className="font-medium leading-none">Are you sure?</h4>
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
    </div>
  );
}
