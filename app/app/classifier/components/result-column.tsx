import { ColumnDef } from "@tanstack/react-table";

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
    header: "Labels",
  },
];
