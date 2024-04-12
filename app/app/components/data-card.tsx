"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import Papa from "papaparse";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CategorySelect from "./category-select";
import { createBridge } from "../lib/bridge";

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
  const context = window.chrome.webview ? "revit" : "web";

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

  const handleCategoryChange = async (value: string) => {
    const bridge = createBridge();
    console.log(value);
    const data = await bridge.GetElementsByCategory(value, 1);
    const parsed = JSON.parse(data);
    if (parsed.length > 0) {
      const headers = Object.keys(parsed[0]);
      setClassificationData(parsed);
      setHeaders(headers);
    }
    console.log(parsed);
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
                {context === "web" ? (
                  <WebDataHeaderDescription />
                ) : (
                  <RevitDataHeaderDescription />
                )}
              </CardDescription>
            </CardHeader>

            <AccordionContent>
              <CardContent>
                <div className="grid w-full max-w-sm items-center gap-1.5">
                  {context === "web" ? (
                    <WebDataInput handleInputChange={handleFileChange} />
                  ) : (
                    <CategorySelect handleInputChange={handleCategoryChange} />
                  )}
                </div>
                {classificationData.length > 0 && (
                  <Card className="mt-6">
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

function WebDataHeaderDescription() {
  return (
    <span>
      Upload your data to be classified. For an example of a supported dataset,
      download the&nbsp;
      <a href="#" className="underline underline-offset-2">
        sample.csv
      </a>
    </span>
  );
}

function RevitDataHeaderDescription() {
  return <span>Choose a Revit element category to be classified.</span>;
}

function WebDataInput({
  handleInputChange,
}: {
  handleInputChange: (args: any) => void;
}) {
  return (
    <>
      <Label htmlFor="spreadsheet">Upload</Label>
      <Input id="spreadsheet" type="file" onChange={handleInputChange} />
    </>
  );
}
