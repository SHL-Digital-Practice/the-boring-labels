"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function ClassifyButton({
  disabled = false,
  onClick,
}: {
  disabled?: boolean;
  onClick?: () => void;
}) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={disabled || pending} onClick={onClick}>
      Classify
    </Button>
  );
}
