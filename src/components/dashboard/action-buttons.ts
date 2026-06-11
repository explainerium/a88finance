import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

/**
 * Shared shadcn-button class strings for table action columns, colored by the
 * kind of action. Used on <Link> (edit/view) and passed to <ActionButton>
 * (publish/delete) which applies the className to its inner <button>.
 */
export const actionBtn = {
  view: buttonVariants({ variant: "ghost", size: "sm" }),
  edit: buttonVariants({ variant: "outline", size: "sm" }),
  publish: cn(
    buttonVariants({ variant: "outline", size: "sm" }),
    "border-green-300 text-green-700 hover:bg-green-50 hover:text-green-800",
  ),
  unpublish: cn(
    buttonVariants({ variant: "outline", size: "sm" }),
    "border-amber-300 text-amber-700 hover:bg-amber-50 hover:text-amber-800",
  ),
  delete: cn(
    buttonVariants({ variant: "outline", size: "sm" }),
    "border-destructive/40 text-destructive hover:bg-destructive/10 hover:text-destructive",
  ),
};
