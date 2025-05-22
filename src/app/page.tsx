"use client";
import { useQuery } from "@triplit/react";

import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { triplitClient } from "@/lib/triplit";
import { SignedIn, SignedOut, UserButton } from "@daveyplate/better-auth-ui";
import Link from "next/link";

// Fetch data

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
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>
            {todo.text} {todo.completed ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
}
