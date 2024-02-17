import { Skeleton } from "@/components/ui/skeleton";

export const RoomSkeleton = () => {
  return (
    <div className="container mx-auto px-6 grid md:grid-cols-2 lg:grid-cols-3 gap-5">
      <div>
        <Skeleton className="h-56 w-full" />
        <div className="py-3 space-x-3 space-y-3">
          <Skeleton className="h-2 w-36" />
          <Skeleton className="h-2 w-44" />
          <Skeleton className="h-2 w-36" />
          <Skeleton className="h-2 w-44" />
        </div>
      </div>
      <div>
        <Skeleton className="h-56 w-full" />
        <div className="py-3 space-x-3 space-y-3">
          <Skeleton className="h-2 w-36" />
          <Skeleton className="h-2 w-44" />
          <Skeleton className="h-2 w-36" />
          <Skeleton className="h-2 w-44" />
        </div>
      </div>
      <div>
        <Skeleton className="h-56 w-full" />
        <div className="py-3 space-x-3 space-y-3">
          <Skeleton className="h-2 w-36" />
          <Skeleton className="h-2 w-44" />
          <Skeleton className="h-2 w-36" />
          <Skeleton className="h-2 w-44" />
        </div>
      </div>
    </div>
  );
};
