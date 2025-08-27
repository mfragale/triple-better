import { canClient } from "@/lib/has-permission-client";
import { TriplitError } from "@/types";
import { toast } from "sonner";
import { triplit } from "~/triplit/client";
import { Todo } from "~/triplit/schema";

const handleSyncWritesError = () => {
  triplit.onFailureToSyncWrites((e) => {
    toast.error("Failed to sync writes", {
      description: (e as TriplitError).message,
    });
    void triplit.clearPendingChangesAll();
  });
};

export async function createTodo(text: string, order: number, userId: string) {
  const todo = await triplit.insert("todos", {
    text,
    order,
    userId,
  });

  handleSyncWritesError();

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

  if (sessionData?.user?.role !== "admin") {
    const query = triplit
      .query("subscriptions")
      .Where("userId", "=", sessionData?.user?.id);
    const result = await triplit.fetchOne(query);

    if (result?.status !== "active") {
      throw new Error(
        "User does not have permission to delete todo, due to subscription status"
      );
    }
  }

  const todo = await triplit.delete("todos", id);

  handleSyncWritesError();

  return todo;
}

export async function updateTodo(
  id: string,
  data: Partial<Todo>
  // sessionData: {
  //   user: { id: string | undefined; role: string | undefined | null };
  // }
) {
  // const canUpdate = await canClient(
  //   {
  //     id: sessionData?.user?.id,
  //     role: sessionData?.user?.role,
  //   },
  //   "update",
  //   "todo"
  // );

  // if (!canUpdate) {
  //   throw new Error("User does not have permission to update todo");
  // }

  const todo = await triplit.update("todos", id, data);

  handleSyncWritesError();

  return todo;
}
