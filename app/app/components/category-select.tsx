"use client";

import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { appContext, createBridge } from "../lib/bridge";

export default function CategorySelect({
  handleInputChange,
}: {
  handleInputChange: (value: string) => void | Promise<void>;
}) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams);
    const categoryId = categories.find((c) => c.name === value)?.id;

    if (!categoryId) throw new Error("Category not found.");
    handleInputChange(categoryId);

    params.set("category", categoryId);

    replace(`${location.pathname}?${params.toString()}`);
  };

  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    const fetchData = async () => {
      const bridge = createBridge();
      const data = await bridge.GetCategories();
      const parsed = JSON.parse(data);
      const categories = Object.entries(parsed).map(([name, id]) => ({
        id: parseInt(String(id)).toString(),
        name: name as string,
      }));

      setCategories(categories);
    };

    fetchData();
  }, []);

  const context = appContext();

  return (
    context === "revit" && (
      <div className="space-y-2">
        <Label htmlFor="category">Category</Label>
        <Select onValueChange={(value) => handleSelect(value)} name="category">
          <SelectTrigger id="category">
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map(({ name, id }) => (
              <SelectItem value={name} key={id}>
                {name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    )
  );
}
