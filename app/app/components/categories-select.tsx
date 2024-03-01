import { Label } from "@/components/ui/label";
import { categories } from "../lib/mock";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CategoriesSelect() {
  return (
    <div className="space-y-2">
      <Label htmlFor="category">Category</Label>
      <Select>
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
