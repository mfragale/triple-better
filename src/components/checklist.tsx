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

import { useConditionalQuery } from "@/hooks/use-conditional-query";
// import { authClient } from "@/lib/auth-client";
import {
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import { useEffect, useState } from "react";
import { triplit } from "../../triplit/client";
import { Todo } from "../../triplit/schema";
import { AddTodoForm } from "./add-todo-form";
import SortableItem from "./sortable-items";
import TodoSkeleton from "./todo-skeleton";

function useTodos() {
  // const { data: sessionData } = authClient.useSession();
  // const userId = sessionData?.user?.id;
  const todosQuery = triplit.query("todos").Order("order", "ASC");
  // .Where("userId", "=", userId);

  const {
    results: todos,
    error,
    fetching,
  } = useConditionalQuery(
    triplit,
    // sessionData?.session.token === triplit.token &&
    todosQuery
  );

  return { todos, error, fetching };
}

export default function Checklist() {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const { todos, fetching } = useTodos();

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
        });
      });
    }
  }

  return (
    <div className="flex flex-col gap-2">
      {fetching && (
        <>
          {[...Array(4)].map((_, index) => (
            <TodoSkeleton key={index} />
          ))}
        </>
      )}

      {/* {!fetching && todos?.length === 0 && <p>No todos</p>} */}

      {!fetching && (
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
