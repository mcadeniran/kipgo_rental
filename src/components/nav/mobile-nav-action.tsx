import {cn} from "@/lib/utils";
import {Button} from "../ui/button";
import {useTranslations} from "next-intl";
import {ChevronRight} from "lucide-react";

interface MobileNavActionProps {
  icon: React.ElementType;
  label: string;
  variant?: "default" | "destructive";
  onClick: () => void;
}

export default function MobileNavAction({icon: Icon, label, variant, onClick}: MobileNavActionProps) {
  const c = useTranslations();
  return <Button
    variant="ghost"
    className={cn(
      "group flex w-full items-center justify-between rounded-xl px-4 py-6 transition-all duration-300",
      variant === "destructive" &&
      "text-destructive hover:text-destructive"
    )}
    onClick={onClick}
  >
    <div className="flex items-center gap-3">
      <Icon className="h-5 w-5" />
      <span className="font-medium">
        {c(label)}
      </span>
    </div>
    <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
  </Button>;
}