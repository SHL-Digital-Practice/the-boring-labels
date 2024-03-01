"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { useState } from "react";

export default function ParameterSelect() {
  const [parameterToggle, setParameterToggle] = useState<"existing" | "new">(
    "existing"
  );

  function handleChange(value: string) {
    setParameterToggle(value as "existing" | "new");
  }

  return (
    <div className="space-y-4">
      <Label>Parameter</Label>
      <RadioGroup
        onValueChange={handleChange}
        defaultValue="existing"
        className="flex"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="existing" id="existing" />
          <Label htmlFor="existing">Select existing</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="new" id="new" />
          <Label htmlFor="new">Create new</Label>
        </div>
      </RadioGroup>
      {parameterToggle === "existing" ? (
        <Select required>
          <SelectTrigger>
            <SelectValue placeholder="Select a parameter" />
          </SelectTrigger>
          <SelectContent></SelectContent>
        </Select>
      ) : (
        <Input placeholder="Name for the new parameter" required />
      )}
    </div>
  );
}
