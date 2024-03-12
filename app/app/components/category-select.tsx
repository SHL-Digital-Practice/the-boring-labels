"use client";

import { Label } from "@/components/ui/label";
import { categories } from "../lib/mock";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";

export default function CategorySelect() {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", value);

    replace(`${location.pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="category">Category</Label>
      <Select onValueChange={(value) => handleSelect(value)} name="category">
        <SelectTrigger id="category">
          <SelectValue placeholder="Select a category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map(({ name, id }) => (
            <SelectItem value={id} key={id}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
