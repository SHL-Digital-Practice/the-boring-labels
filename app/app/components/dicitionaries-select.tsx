import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { dictionaries } from "../lib/mock";

export default function DictionariesSelect() {
  return (
    <div className="space-y-2">
      <Label htmlFor="dictionary">Dictionary</Label>
      <Select>
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
