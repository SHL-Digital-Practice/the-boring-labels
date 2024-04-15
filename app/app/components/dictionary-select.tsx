"use client";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function DictionarySelect({
  dictionaries,
}: {
  dictionaries: { name: string; id: string }[];
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelect = (dictionary: string) => {
    const params = new URLSearchParams(searchParams);

    if (dictionary) {
      params.set("dictionary", dictionary);
    } else {
      params.delete("dictionary");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="dictionary">Dictionary</Label>
      <Select name="dictionary" onValueChange={handleSelect}>
        <SelectTrigger id="dictionary">
          <SelectValue placeholder="Select a dictionary" />
        </SelectTrigger>
        <SelectContent>
          {dictionaries.map(({ name, id }) => (
            <SelectItem value={id} key={id}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
