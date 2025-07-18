import { Card, CardHeader } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import {
  TeditTodoFormSchema,
  useEditTodoFormSchema,
} from "@/lib/zod-form-schemas";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, GripVerticalIcon, Square, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { triplit } from "../../triplit/client";
import { Todo } from "../../triplit/schema";
import { Button } from "./ui/button";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const SortableItem = ({ todo }: { todo: Todo }) => {
  const t = useTranslations("ChecklistItem");

  const uniqueId = todo.id;
  const {
    setNodeRef,
    transform,
    transition,
    activeIndex,
    index,
    attributes,
    listeners,
  } = useSortable({ id: uniqueId });

  const isCursorGrabbing = attributes["aria-pressed"];

  const isActive = activeIndex === index;
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const isMobile = useIsMobile();
  const [isEditing, setIsEditing] = useState<string | null>(null);

  const editTodoFormSchema = useEditTodoFormSchema();

  const form = useForm<TeditTodoFormSchema>({
    // Client side validation
    resolver: zodResolver(editTodoFormSchema),
  });

  async function onSubmit(values: TeditTodoFormSchema) {
    try {
      const result = editTodoFormSchema.safeParse(values);

      // Server side validation
      if (!result.success) {
        const zodError = result.error;
        if (zodError && zodError.errors) {
          zodError.errors.forEach((err) => {
            const field = err.path.join(".");
            form.setError(field as keyof TeditTodoFormSchema, {
              message: err.message,
            });
          });
        }
        return;
      }

      // Do form action
      await triplit
        .update("todos", result.data.editedTodoItemId, async (entity) => {
          entity.text = result.data.editedTodoItem;
        })
        .then(async () => {
          await new Promise((resolve) => setTimeout(resolve, 200));
          setIsEditing(null);
        });
      form.reset();
      form.unregister("editedTodoItem");
      form.unregister("editedTodoItemId");
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Card
      ref={setNodeRef}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        touchAction: "none",
      }}
      key={uniqueId}
      className={cn(
        "group py-2",
        isActive && "z-10 border-t border-b bg-accent/80",
        isPopoverOpen && "border-red-500"
      )}
    >
      <CardHeader className="flex justify-between items-center px-2">
        <div className="flex items-center gap-2 min-w-0 grow-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              triplit.update("todos", todo.id, {
                completed: !todo.completed,
              });
            }}
          >
            {todo.completed ? <Check className="text-green-500" /> : <Square />}
          </Button>
          {isEditing === todo.id ? (
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center w-full"
              >
                <FormField
                  control={form.control}
                  name="editedTodoItemId"
                  defaultValue={todo.id}
                  render={({ field }) => <Input type="hidden" {...field} />}
                />
                <FormField
                  control={form.control}
                  name="editedTodoItem"
                  defaultValue={todo.text}
                  render={({ field }) => (
                    <FormItem className="w-full">
                      <FormControl>
                        <Input
                          autoFocus
                          className="dark:bg-transparent -my-2 pt-1 pl-3 border-0 focus-visible:ring-0 focus:ring-0 dark:focus:ring-0 w-full h-12 md:text-base"
                          {...field}
                          onBlur={form.handleSubmit(onSubmit)}
                        />
                      </FormControl>
                      <FormMessage className="pl-3" />
                    </FormItem>
                  )}
                />
              </form>
            </Form>
          ) : (
            <div
              onClick={() => {
                setIsEditing(todo.id);
              }}
              className={cn(
                "w-full cursor-text pl-3 line-clamp-3",
                todo.completed && "line-through text-muted-foreground/30"
              )}
            >
              {todo.text}
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Popover onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn(
                  "opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-opacity",
                  (isPopoverOpen || isMobile) && "opacity-100"
                )}
              >
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
                    triplit.delete("todos", uniqueId);
                  }}
                >
                  {t("deletePopover.action")}
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Button
            {...attributes}
            {...listeners}
            aria-describedby={`DndContext-${uniqueId}`}
            variant="ghost"
            size="icon"
            className={cn(
              "opacity-0 group-hover:opacity-100 transition-opacity",
              isMobile && "opacity-100",
              isCursorGrabbing ? "cursor-grabbing" : "cursor-grab"
            )}
          >
            <GripVerticalIcon />
          </Button>
        </div>
      </CardHeader>
    </Card>
  );
};

export default SortableItem;
