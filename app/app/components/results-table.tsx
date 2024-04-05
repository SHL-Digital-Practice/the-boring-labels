import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Result } from "../classifier/components/result-column";
import { ClassificationResult } from "../classifier/page";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export const mockResults: Result[] = [
  {
    id: 1,
    candidate: "Apartment",
    labels: ["Apartment", "House", "Condo"],
  },
  {
    id: 2,
    candidate: "House",
    labels: ["House", "Condo", "Apartment"],
  },
  {
    id: 3,
    candidate: "Condo",
    labels: ["Condo", "Apartment", "House"],
  },
  {
    id: 4,
    candidate: "House",
    labels: ["House", "Condo", "Apartment"],
  },
  {
    id: 5,
    candidate: "Apartment",
    labels: ["Apartment", "House", "Condo"],
  },
  {
    id: 6,
    candidate: "Condo",
    labels: ["Condo", "Apartment", "House"],
  },
  {
    id: 7,
    candidate: "House",
    labels: ["House", "Condo", "Apartment"],
  },
  {
    id: 8,
    candidate: "Apartment",
    labels: ["Apartment", "House", "Condo"],
  },
  {
    id: 9,
    candidate: "Condo",
    labels: ["Condo", "Apartment", "House"],
  },
  {
    id: 10,
    candidate: "House",
    labels: ["House", "Condo", "Apartment"],
  },
  {
    id: 11,
    candidate: "Apartment",
    labels: ["Apartment", "House", "Condo"],
  },
  {
    id: 12,
    candidate: "House",
    labels: ["House", "Condo", "Apartment"],
  },
  {
    id: 13,
    candidate: "Condo",
    labels: ["Condo", "Apartment", "House"],
  },
  {
    id: 14,
    candidate: "House",
    labels: ["House", "Condo", "Apartment"],
  },
  {
    id: 15,
    candidate: "Apartment",
    labels: ["Apartment", "House", "Condo"],
  },
  {
    id: 16,
    candidate: "Condo",
    labels: ["Condo", "Apartment", "House"],
  },
  {
    id: 17,
    candidate: "House",
    labels: ["House", "Condo", "Apartment"],
  },
  {
    id: 18,
    candidate: "Apartment",
    labels: ["Apartment", "House", "Condo"],
  },
  {
    id: 19,
    candidate: "Condo",
    labels: ["Condo", "Apartment", "House"],
  },
  {
    id: 20,
    candidate: "House",
    labels: ["House", "Condo", "Apartment"],
  },
];

interface ResultsTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function ResultsTable<TData, TValue>({
  columns,
  data,
}: ResultsTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  return (
    <div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
