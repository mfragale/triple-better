"use client";
import { useQuery } from "@triplit/react";

import { AddTodoForm } from "@/components/add-todo-form";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { triplitClient } from "@/lib/triplit";
import { SignedIn, SignedOut, UserButton } from "@daveyplate/better-auth-ui";
import { Check, Trash2, X } from "lucide-react";
import Link from "next/link";
export default function Home() {
  const { data: sessionData } = useSession();

  const { results: todos } = useQuery(
    triplitClient,
    triplitClient.query("todos")
  );

  return (
    <div>
      <h1>Todos</h1>
      <SignedIn>
        {/* <UserAvatar user={sessionData?.user} /> */}
        <UserButton />

        <p>Only signed-in users will see this! - {sessionData?.user?.name}</p>
        <Button asChild>
          <Link href="/auth/sign-out">Sign Out</Link>
        </Button>
      </SignedIn>
      <SignedOut>
        <div>You need to log in to access this feature.</div>
        <Button asChild>
          <Link href="/auth/sign-in">Sign in</Link>
        </Button>
      </SignedOut>
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
