"use client";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";

export type Result = {
  id: number;
  candidate: string;
  labels: [string, string, string];
};

export const columns: ColumnDef<Result>[] = [
  {
    accessorKey: "candidate",
    header: "Candidate",
  },
  {
    accessorKey: "labels",
    header: () => <div className="text-right">Labels</div>,
    cell: ({ row }) => {
      const labels = row.getValue("labels") as Result["labels"];

      return <ResultLabelsCell labels={labels} />;
    },
  },
];

function ResultLabelsCell({ labels }: { labels: [string, string, string] }) {
  const [selectedLabel, setSelectedLabel] = useState(labels[0]);

  return (
    <div className="flex justify-end ">
      <Select value={selectedLabel} onValueChange={setSelectedLabel}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Select a fruit" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Results</SelectLabel>
            {labels.map((label) => (
              <SelectItem value={label} key={label}>
                {label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
