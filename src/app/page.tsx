"use client";
import { useQuery } from "@triplit/react";

import { AddTodoForm } from "@/components/add-todo-form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { triplitClient } from "@/lib/triplit";
import { Check, Trash2, X } from "lucide-react";
export default function Home() {
  const { results: todos } = useQuery(
    triplitClient,
    triplitClient.query("todos")
  );

  return (
    <div>
      <h1>Todos</h1>

      {todos?.map((todo) => (
        <Card key={todo.id} className="mb-2">
          <CardHeader className="flex justify-between">
            {todo.text} {todo.completed ? "✅" : "❌"}
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  triplitClient.update("todos", todo.id, {
                    completed: !todo.completed,
                  });
                }}>
                {todo.completed ? (
                  <X className="text-red-500" />
                ) : (
                  <Check className="text-green-500" />
                )}
              </Button>
              <Button
                variant="destructive"
                size="icon"
                onClick={() => {
                  triplitClient.delete("todos", todo.id);
                }}>
                <Trash2 />
              </Button>
            </div>
          </CardHeader>
        </Card>
      ))}
      <AddTodoForm />
    </div>
  );
}
