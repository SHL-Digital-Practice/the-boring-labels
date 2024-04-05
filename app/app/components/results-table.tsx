import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
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
  });
  return (
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
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
  );
}
