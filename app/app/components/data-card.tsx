"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Papa from "papaparse";
import { useState } from "react";

export default function DataCard() {
  const [data, setData] = useState<Array<any>>([]);
  const [headers, setHeaders] = useState<Array<string>>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      console.log(file);

      if (file.type !== "text/csv") return;

      Papa.parse(file, {
        header: true,
        complete: function (results) {
          console.log("Finished:", results.data);
          setData(results.data);
          setHeaders(results.meta.fields!);
        },
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Data</CardTitle>
        <CardDescription>
          <span>
            Upload your data to be classified. For an example of a supported
            dataset, download the &nbsp;
            <a href="#" className="underline underline-offset-2">
              sample.csv
            </a>
          </span>
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid w-full max-w-sm items-center gap-1.5 mb-6">
          <Label htmlFor="spreadsheet">Upload</Label>
          <Input id="spreadsheet" type="file" onChange={handleFileChange} />
        </div>
        {data.length > 0 && (
          <Card>
            <Table>
              {/* <TableCaption>A list of your recent invoices.</TableCaption> */}
              <TableHeader>
                <TableRow>
                  {headers.map((header, index) => (
                    <TableHead
                      key={index}
                      className={
                        index === headers.length - 1 ? "text-right" : ""
                      }
                    >
                      {header}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {data.map((row, index) => (
                  <TableRow key={index}>
                    {Object.values(row).map((val: unknown, cellIndex) => (
                      <TableCell
                        key={cellIndex}
                        className={cn([
                          cellIndex === headers.length - 1 ? "text-right" : "",
                          "truncate",
                          cellIndex === 0 ? "font-semibold" : "",
                        ])}
                      >
                        {val as string}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
