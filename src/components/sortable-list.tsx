"use client";

import { cn } from "@/lib/utils";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { GripVerticalIcon, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  ReactNode,
  useId,
  useOptimistic,
  useState,
  useTransition,
} from "react";
import { triplit } from "../../triplit/client";
import { Button } from "./ui/button";
import { Card, CardHeader } from "./ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

export function SortableList<T extends { id: string }>({
  items,
  onOrderChange,
  children,
}: {
  items: T[];
  onOrderChange: (
    newOrder: string[]
  ) => Promise<{ error: boolean; message: string }>;
  children: (items: T[]) => ReactNode;
}) {
  const dndContextId = useId();
  const [optimisticItems, setOptimisticItems] = useOptimistic(items);
  const [, startTransition] = useTransition();

  // Once the drag ends, we need to update the order of the sections
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    const activeId = active.id.toString();
    const overId = over?.id.toString();
    if (overId == null || activeId == null) return;

    function getNewArray(array: T[], activeId: string, overId: string) {
      const oldIndex = array.findIndex((section) => section.id === activeId);
      const newIndex = array.findIndex((section) => section.id === overId);
      return arrayMove(array, oldIndex, newIndex);
    }

    startTransition(async () => {
      setOptimisticItems((items) => getNewArray(items, activeId, overId));
      const actionData = await onOrderChange(
        getNewArray(optimisticItems, activeId, overId).map((s) => s.id)
      );

      // actionToast({ actionData });
      // toast.success(actionData.message);
    });
  }

  return (
    <DndContext id={dndContextId} onDragEnd={handleDragEnd}>
      <SortableContext
        items={optimisticItems}
        strategy={verticalListSortingStrategy}>
        <div>{children(optimisticItems)}</div>
      </SortableContext>
    </DndContext>
  );
}

export function SortableItem({
  id,
  children,
  className,
}: {
  id: string;
  children: ReactNode;
  className?: string;
}) {
  const {
    setNodeRef,
    transform,
    transition,
    activeIndex,
    index,
    attributes,
    listeners,
  } = useSortable({ id });
  const isActive = activeIndex === index;
  const t = useTranslations("ChecklistItem");
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Card
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
      className={cn(
        "group py-2",
        isActive && "z-10 border-t border-b bg-accent/90",
        isPopoverOpen && "border-red-500"
      )}>
      <CardHeader className="flex justify-between items-center px-2">
        {children}

        <div className="flex items-center gap-2">
          <Popover onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity",
                  isPopoverOpen && "opacity-100"
                )}>
                <Trash2 />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" side="bottom" align="end">
              <div className="gap-4 grid">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none">
                    {t("deletePopover.title")}
                  </h4>
                  <p className="text-muted-foreground text-sm">
                    {t("deletePopover.description")}
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => {
                    triplit.delete("todos", id);
                  }}>
                  {t("deletePopover.action")}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            {...attributes}
            {...listeners}
            variant="ghost"
            size="icon"
            className="opacity-0 group-hover:opacity-100 transition-opacity hover:cursor-grab">
            <GripVerticalIcon />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
}
