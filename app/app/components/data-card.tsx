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
import { ClassificationResult } from "../classifier/page";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function DataCard({
  setClassificationData,
  classificationData,
  setHeaders,
  headers,
}: {
  setClassificationData: React.Dispatch<React.SetStateAction<any[]>>;
  classificationData: any[];
  headers: string[];
  setHeaders: React.Dispatch<React.SetStateAction<string[]>>;
}) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      if (file.type !== "text/csv") return;

      Papa.parse(file, {
        header: true,
        complete: function (results) {
          console.log("Finished:", results.data);
          setClassificationData(results.data);
          setHeaders(results.meta.fields!);
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-start ">
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="data-card" className="border-none">
          <Card className="w-full">
            <CardHeader>
              <AccordionTrigger className="text-start">
                <CardTitle>Data</CardTitle>
              </AccordionTrigger>
              <CardDescription>
                <span>
                  Upload your data to be classified. For an example of a
                  supported dataset, download the&nbsp;
                  <a href="#" className="underline underline-offset-2">
                    sample.csv
                  </a>
                </span>
              </CardDescription>
            </CardHeader>

            <AccordionContent>
              <CardContent>
                <div className="grid w-full max-w-sm items-center gap-1.5 mb-6">
                  <Label htmlFor="spreadsheet">Upload</Label>
                  <Input
                    id="spreadsheet"
                    type="file"
                    onChange={handleFileChange}
                  />
                </div>
                {classificationData.length > 0 && (
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
                        {classificationData.map((row, index) => (
                          <TableRow key={index}>
                            {Object.values(row).map(
                              (val: unknown, cellIndex) => (
                                <TableCell
                                  key={cellIndex}
                                  className={cn([
                                    cellIndex === headers.length - 1
                                      ? "text-right"
                                      : "",
                                    "truncate",
                                    cellIndex === 0 ? "font-semibold" : "",
                                  ])}
                                >
                                  {val as string}
                                </TableCell>
                              )
                            )}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </Card>
                )}
              </CardContent>
            </AccordionContent>
          </Card>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

function TableCellWithResult({
  result,
  originalValue,
}: {
  result: NonNullable<ClassificationResult>;
  originalValue: string;
}) {
  const firstValueIndex = result.items.findIndex(
    (i) => i.candidate === originalValue
  );
  const { labels } = result.items[firstValueIndex];

  return (
    <Select defaultValue={labels[0]}>
      <SelectTrigger className="w-[180px]">
        <SelectValue>{labels[0]}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {labels.map((label, index) => (
          <SelectItem key={index} value={label}>
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
