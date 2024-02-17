import { Skeleton } from "@/components/ui/skeleton";
export const LoadingSkeleton = () => {
  return (
    <div className="container mx-auto px-6">
      <Skeleton className="h-56 md:h-72 lg:h-96 w-full" />
      <div className="space-x-3 space-y-3 py-3">
        <Skeleton className="h-3 w-96" />
        <Skeleton className="h-3 w-60" />
        <Skeleton className="h-3 w-96" />
        <Skeleton className="h-3 w-60" />
        <Skeleton className="h-3 w-96" />
      </div>
    </div>
  );
};
