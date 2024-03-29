"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { createBridge } from "../lib/bridge";

export default function ParameterSelect({ category }: { category?: string }) {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const [parameterToggle, setParameterToggle] = useState<"existing" | "new">(
    "existing"
  );

  const [parameters, setParameters] = useState<string[]>([]);
  const [parameter, setParameter] = useState<string>("");

  function handleChange(value: string) {
    setParameterToggle(value as "existing" | "new");
  }

  function handleParameterChange(value: string) {
    setParameter(value);
    const urlParams = new URLSearchParams(searchParams);
    if (value) {
      urlParams.set("parameter", parameter);
    } else {
      urlParams.delete("parameter");
    }
    replace(`${location.pathname}?${urlParams.toString()}`);
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!category) return;
      const bridge = createBridge();
      const data = await bridge.GetParameterKeysForCategory(category);
      const parsed = JSON.parse(data);
      setParameters(parsed.sort());
      setParameter("");
    };

    fetchData();
  }, [category]);

  return (
    <div className="space-y-4">
      <Label htmlFor="parameter" className="flex flex-col space-y-1">
        <span>Parameter</span>
        <span className="font-normal leading-snug text-muted-foreground">
          Choose a parameter to classify against.
        </span>
      </Label>
      <Select
        required
        name="parameter"
        disabled={!category}
        value={parameter}
        onValueChange={handleParameterChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select a parameter">
            {parameter}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {parameters.map((p) => (
            <SelectItem value={p} key={p}>
              {p}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <RadioGroup
        onValueChange={handleChange}
        defaultValue="existing"
        className="flex"
        disabled={!category}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="existing" id="existing" />
          <Label htmlFor="existing">Replace existing</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="new" id="new" />
          <Label htmlFor="new">Create new</Label>
        </div>
      </RadioGroup>
      {parameterToggle === "new" && (
        <Input
          name="parameter"
          placeholder="Name for the new parameter"
          required
          disabled={!category}
        />
      )}
    </div>
  );
}
