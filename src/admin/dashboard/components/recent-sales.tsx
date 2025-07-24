import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatPrice } from "@/lib/utils";

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4">
        <Avatar className="h-9 w-9">
          <AvatarImage src="/avatars/01.png" alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="flex flex-1 flex-wrap items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium leading-none">Richard Bathiebo</p>
            <p className="text-sm text-muted-foreground">
              richard.bathiebo.7@gmail.com
            </p>
          </div>
          <div className="font-medium">+{formatPrice(25000)}</div>
        </div>
      </div>
    </div>
  );
}
