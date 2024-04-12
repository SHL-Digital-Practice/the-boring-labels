"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ClassifyButton } from "./classify-button";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { ClassificationResult } from "../classifier/page";
import ResultsTable, { mockResults } from "./results-table";
import { Result, columns } from "../classifier/components/result-column";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { appContext, createBridge } from "../lib/bridge";

export interface ParameterUpdateInput {
  elementIds: string[];
  parameterKeys: string[];
  parameterValues: string[];
  categoryId: string;
}

export function ClassifyCard({
  classificationData,
  setClassificationResult,
  classificationResult,
}: {
  classificationData: any[];
  classificationResult: ClassificationResult;
  setClassificationResult: React.Dispatch<
    React.SetStateAction<ClassificationResult>
  >;
}) {
  const context = appContext();

  const searchParams = useSearchParams();
  const parameter = searchParams.get("parameter") || "";
  const dictionary = searchParams.get("dictionary") || -1;

  const [isClassifying, setIsClassifying] = useState(false);

  const handleClassify = async () => {
    setIsClassifying(true);
    const searchParams = new URLSearchParams();
    const candidates = classificationData.map(
      (data: any) => data[parameter.toString()]
    );
    searchParams.append("candidates", candidates.join(","));
    searchParams.append("parameter", parameter);
    searchParams.append("dictionary", dictionary.toString());

    const test = await fetch("/classifier/api/test");

    const response = await fetch("/classifier/api?" + searchParams.toString(), {
      cache: "default",
    });

    // const response = await fetch("/classifier/api", {
    //   body: JSON.stringify({
    //     classificationData,
    //     parameter,
    //     dictionary,
    //   }),
    //   method: "POST",
    // });

    const data = await response.json();

    if (data.error) {
      console.log("Failed to classify: ", data.error);
      setIsClassifying(false);
      return;
    }

    console.log("response", data);
    const classificationResult: ClassificationResult = {
      header: parameter,
      items: data.map((i: any) => ({
        candidate: i.candidate,
        labels: i.labels,
      })),
    };

    setClassificationResult(classificationResult);
    setIsClassifying(false);
  };

  const formattedResults: Result[] = classificationResult
    ? classificationResult.items.map((item, index) => ({
        id: index,
        candidate: item.candidate,
        labels: item.labels,
      }))
    : [];

  console.log("category", searchParams.get("category"));
  console.log("classificationData", classificationData);
  console.log("classificationResult", classificationResult);

  const mockData: ParameterUpdateInput = {
    categoryId: searchParams.get("category") || "-2000160",
    elementIds: [
      "857191",
      "857194",
      "857197",
      "857200",
      "857203",
      "857206",
      "857209",
      "857279",
      "857292",
      "857346",
    ],
    parameterKeys: [
      "Name",
      "Name",
      "Name",
      "Name",
      "Name",
      "Name",
      "Name",
      "Name",
      "Name",
      "Name",
    ],
    parameterValues: [
      "Ktichen",
      "Ktichen",
      "Ktichen",
      "Ktichen",
      "Ktichen",
      "Ktichen",
      "Ktichen",
      "Ktichen",
      "Ktichen",
      "Ktichen",
    ],
  };

  const handleSaveToRevit = () => {
    if (!classificationResult) {
      return;
    }

    const parameterValues = classificationData.map((d) => {
      const originalValue = d[parameter];
      const resultIndex = classificationResult.items.findIndex(
        (i) => i.candidate === originalValue
      );
      return classificationResult.items[resultIndex].labels[0];
    });

    if (classificationData.length !== parameterValues.length) {
      console.error("Data length does not match.");
      return;
    }

    const input: ParameterUpdateInput = {
      categoryId: searchParams.get("category") || "-2000160",
      elementIds: classificationData.map((data) => data["Id"]),
      parameterKeys: classificationData.map(() => parameter),
      parameterValues,
    };

    createBridge().UpdateParameters(JSON.stringify(input));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Classify</CardTitle>
        <CardDescription>
          Let us do the boring classification for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-6 ">
          <ClassifyButton
            onClick={handleClassify}
            disabled={classificationData.length === 0 || isClassifying}
            pending={isClassifying}
          />
          {formattedResults.length > 0 && (
            <ResultsTable data={formattedResults} columns={columns} />
          )}
        </div>
        {classificationResult && context === "revit" && (
          <Button className="mt-6" color="blue" onClick={handleSaveToRevit}>
            Save to Revit
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
