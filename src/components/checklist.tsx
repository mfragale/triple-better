"use client";

import { triplitClient } from "@/lib/triplit";
import { cn } from "@/lib/utils";
import { useQuery } from "@triplit/react";
import { Check, Square, Trash2 } from "lucide-react";
import { AddTodoForm } from "./add-todo-form";
import { Button } from "./ui/button";
import { Card, CardHeader } from "./ui/card";

export default function Checklist() {
  const { results: todos } = useQuery(
    triplitClient,
    triplitClient.query("todos")
  );
  return (
    <div className="flex flex-col gap-2 mx-auto px-4 py-12 max-w-xl">
      {todos?.map((todo) => (
        <Card key={todo.id} className="py-2">
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

            <Button
              variant="ghost"
              size="icon"
              className="text-muted-foreground hover:text-destructive"
              onClick={() => {
                triplitClient.delete("todos", todo.id);
              }}>
              <Trash2 />
            </Button>
          </CardHeader>
        </Card>
      ))}
      <AddTodoForm />
    </div>
  );
}
