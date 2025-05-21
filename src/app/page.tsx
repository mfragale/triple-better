"use client";
import { useQuery } from "@triplit/react";

import { TriplitClient } from "@triplit/client";
import { schema } from "../../triplit/schema";

const client = new TriplitClient({
  schema,
  serverUrl: process.env.NEXT_PUBLIC_TRIPLIT_SERVER_URL,
  token: process.env.NEXT_PUBLIC_TRIPLIT_TOKEN,
});

// Fetch data

export default function Home() {
  const { results: todos } = useQuery(client, client.query("todos"));

  return (
    <div>
      <h1>Todos</h1>
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
