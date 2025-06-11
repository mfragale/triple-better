import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader } from "./ui/card";

export default function TodoSkeleton() {
  return (
    <Card className="py-2">
      <CardHeader className="flex justify-between items-center px-2">
        <div className="flex items-center gap-4 min-w-0 h-9 grow-1">
          <Skeleton className="mx-2 rounded w-4 h-4" />
          <Skeleton className="w-40 h-4" />
        </div>
      </CardHeader>
    </Card>
  );
}
