"use client";

import { convexQuery } from "@convex-dev/react-query";
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
  restrictToParentElement,
  restrictToVerticalAxis,
} from "@dnd-kit/modifiers";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useQuery } from "@tanstack/react-query";
import { useMutation } from "convex/react";
import { useEffect, useState } from "react";
import { Doc, Id } from "~/convex/_generated/dataModel";
import { api } from "../../convex/_generated/api";
import { AddTodoForm } from "./add-todo-form";
import SortableItem from "./sortable-items";
import TodoSkeleton from "./todo-skeleton";

export default function Checklist() {
  // const tasks = useQuery(api.tasks.getOnlyCurrentUserTasks);

  const {
    data: tasks,
    isPending,
    error,
  } = useQuery(convexQuery(api.tasks.getOnlyCurrentUserTasks, {}));

  const updateTaskOrder = useMutation(
    api.tasks.updateTaskOrder
  ).withOptimisticUpdate((localStore, args) => {
    const { id, order } = args;
    const currentTasks = localStore.getQuery(
      api.tasks.getOnlyCurrentUserTasks,
      {}
    );
    if (currentTasks !== undefined) {
      // Create a new array with the updated task order
      const updatedTasks = currentTasks.map((task) =>
        task._id === id ? { ...task, order } : task
      );
      // Sort the tasks by the new order to maintain proper sequence
      const sortedTasks = updatedTasks.sort((a, b) => a.order - b.order);
      localStore.setQuery(api.tasks.getOnlyCurrentUserTasks, {}, sortedTasks);
    }
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const [items, setItems] = useState<Doc<"tasks">[]>(tasks ?? []);
  useEffect(() => {
    setItems(tasks ?? []);
  }, [tasks]);

  async function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (active.id !== over?.id) {
      function getNewArray(
        array: Doc<"tasks">[],
        activeId: string | number,
        overId: string | number
      ) {
        const oldIndex = array.findIndex((section) => section._id === activeId);
        const newIndex = array.findIndex((section) => section._id === overId);
        return arrayMove(array, oldIndex, newIndex);
      }

      setItems((prevItems) => getNewArray(prevItems, active.id, over?.id ?? 0));

      const newItems = getNewArray(items, active.id, over?.id ?? 0).map(
        (s) => s._id
      );

      await Promise.all(
        newItems.map(async (id: string, index: number) => {
          await updateTaskOrder({
            id: id as Id<"tasks">,
            order: index,
          });
        })
      );
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
      {error && <p>Error: {error.message}</p>}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis, restrictToParentElement]}
      >
        <SortableContext
          items={items.map((item) => item._id)}
          strategy={verticalListSortingStrategy}
        >
          {items.map((item) => (
            <SortableItem key={item._id} todo={item} />
          ))}
        </SortableContext>
      </DndContext>
      <AddTodoForm nextItemIndex={tasks?.length ?? 0} />{" "}
    </div>
  );
}
