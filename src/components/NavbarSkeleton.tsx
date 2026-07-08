import {Skeleton} from "@/components/ui/skeleton";

export default function NavbarSkeleton() {

  return (

    <div className="flex items-center gap-4">

      <Skeleton className="h-9 w-20 rounded-md" />

      <Skeleton className="h-10 w-10 rounded-full" />

    </div>

  );

}