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
import { useEffect, useState } from "react";

export default function ParameterSelect({ category }: { category?: string }) {
  const [parameterToggle, setParameterToggle] = useState<"existing" | "new">(
    "existing"
  );

  const [parameters, setParameters] = useState<string[]>([]);
  const [parameter, setParameter] = useState<string>("");

  function handleChange(value: string) {
    setParameterToggle(value as "existing" | "new");
  }

  useEffect(() => {
    const fetchData = async () => {
      if (!category) return;
      const bridge = window.chrome.webview.hostObjects.appBridge;
      const data = await bridge.GetParameterKeysForCategory(category);
      const parsed = JSON.parse(data);
      setParameters(parsed.sort());
      setParameter("");
    };

    fetchData();
  }, [category]);

  return (
    <div className="space-y-4">
      <Label>Parameter</Label>
      <RadioGroup
        onValueChange={handleChange}
        defaultValue="existing"
        className="flex"
        disabled={!category}
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
        <Select
          required
          name="parameter"
          disabled={!category}
          value={parameter}
          onValueChange={setParameter}
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
      ) : (
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
