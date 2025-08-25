import { canClient } from "@/lib/has-permission-client";
import { triplit } from "~/triplit/client";
import { Todo } from "~/triplit/schema";

export async function insertTodo(text: string, order: number, userId: string) {
  const todo = await triplit.insert("todos", {
    text,
    order,
    userId,
  });

  return todo;
}

export async function deleteTodo(
  id: string,
  sessionData: {
    user: { id: string | undefined; role: string | undefined | null };
  }
) {
  const canDelete = await canClient(
    {
      id: sessionData?.user?.id,
      role: sessionData?.user?.role,
    },
    "delete",
    "todo"
  );

  if (!canDelete) {
    throw new Error("User does not have permission to delete todo");
  }

  const todo = await triplit.delete("todos", id);

  return todo;
}

export async function updateTodo(
  id: string,
  data: Partial<Todo>,
  sessionData: {
    user: { id: string | undefined; role: string | undefined | null };
  }
) {
  const canUpdate = await canClient(
    {
      id: sessionData?.user?.id,
      role: sessionData?.user?.role,
    },
    "update",
    "todo"
  );

  if (!canUpdate) {
    throw new Error("User does not have permission to update todo");
  }
  const todo = await triplit.update("todos", id, data);

  return todo;
}
