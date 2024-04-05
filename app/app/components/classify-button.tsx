"use client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SparklesIcon } from "lucide-react";
import { useFormStatus } from "react-dom";

export function ClassifyButton({
  disabled = false,
  onClick,
  pending = false,
}: {
  disabled?: boolean;
  onClick?: () => void;
  pending: boolean;
}) {
  return (
    <Button
      type="submit"
      disabled={disabled || pending}
      onClick={onClick}
      className="text-white"
    >
      Classify{" "}
      <SparklesIcon
        className={cn(["ml-2 w-5 text-yellow-400", pending && "animate-pulse"])}
      />
    </Button>
  );
}
