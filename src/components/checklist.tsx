"use client";

import {
  closestCenter,
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useSession } from "@/hooks/use-session";
import { useToken } from "@/hooks/use-token";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { useQuery } from "@triplit/react";
import { useEffect, useState } from "react";
import { triplit } from "~/triplit/client";
import { Todo } from "~/triplit/schema";
import { AddTodoForm } from "./add-todo-form";
import SortableItem from "./sortable-items";
import TodoSkeleton from "./todo-skeleton";

// function useTodos() {
//   const todosQuery = triplit.query("todos").Order("order", "ASC");
//   // .Where("userId", "=", userId);

//   const { results: todos, error, fetching } = useQuery(triplit, todosQuery);

//   return { todos, error, fetching };
// }

function useTodos() {
  // useAuthenticate is a wrapper for useSession that redirects to sign in
  const { data: sessionData, error: sessionError } = useSession();
  console.log("sessionData", sessionData);
  console.log("sessionError", sessionError);

  const { token } = useToken(triplit);
  const userId = sessionData?.user?.id;
  const todosQuery = triplit
    .query("todos")
    .Order("order", "ASC")
    .Where("userId", "=", userId);

  const {
    results: todos,
    error,
    fetching,
  } = useQuery(triplit, todosQuery, {
    enabled: !!token,
  });

  const isPending = !token || fetching;

  return { todos, error, isPending };
}

export default function Checklist() {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { todos, isPending } = useTodos();

  const [items, setItems] = useState<Todo[]>(todos ?? []);
  useEffect(() => {
    setItems(todos ?? []);
  }, [todos]);

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      function getNewArray(
        array: Todo[],
        activeId: string | number,
        overId: string | number
      ) {
        const oldIndex = array.findIndex((section) => section.id === activeId);
        const newIndex = array.findIndex((section) => section.id === overId);
        return arrayMove(array, oldIndex, newIndex);
      }

      setItems((prevItems) => getNewArray(prevItems, active.id, over?.id ?? 0));

      const newItems = getNewArray(items, active.id, over?.id ?? 0).map(
        (s) => s.id
      );

      newItems.map((id: string, index: number) => {
        triplit.update("todos", id, {
          order: index,
          updatedAt: new Date(),
        });
      });
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {isPending && (
        <>
          {[...Array(4)].map((_, index) => (
            <TodoSkeleton key={index} />
          ))}
        </>
      )}

      {/* {!fetching && todos?.length === 0 && <p>No todos</p>} */}

      {!isPending && (
        <>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
            modifiers={[restrictToVerticalAxis, restrictToParentElement]}
          >
            <SortableContext
              items={items}
              strategy={verticalListSortingStrategy}
            >
              {items.map((item) => (
                <SortableItem key={item.id} todo={item} />
              ))}
            </SortableContext>
          </DndContext>
          <AddTodoForm nextItemIndex={todos?.length ?? 0} />{" "}
        </>
      )}
    </div>
  );
}
