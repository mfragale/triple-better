import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

export default function TodoSkeleton() {
  return (
    <div className="flex items-center gap-2">
      <Skeleton className="rounded w-4 h-4" />
      <Skeleton className="w-32 h-4" />
      <Button size="icon" variant="link" disabled />
    </div>
  );
}
