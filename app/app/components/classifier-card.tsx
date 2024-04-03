"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import DictionarySelect from "./dictionary-select";
import ParameterSelect from "./parameter-select";
import { ClassifyButton } from "./classify-button";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { ClassificationResult } from "../classifier/page";

export default function ClassifierCard({
  classificationData,
  parameters,
  setClassificationResult,
}: {
  setClassificationData: React.Dispatch<React.SetStateAction<any[]>>;
  classificationData: any[];
  parameters: string[];
  classificationResult?: ClassificationResult;
  setClassificationResult?: React.Dispatch<
    React.SetStateAction<ClassificationResult>
  >;
}) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";
  const parameter = searchParams.get("parameter") || "";
  const dictionary = searchParams.get("dictionary") || -1;

  const [isClassifying, setIsClassifying] = useState(false);

  const handleClassify = async () => {
    setIsClassifying(true);
    const response = await fetch("/classifier/api", {
      body: JSON.stringify({
        classificationData,
        parameter,
        dictionary,
      }),
      method: "POST",
    });

    const data = await response.json();
    const classificationResult: ClassificationResult = {
      header: parameter,
      items: data.map((i: any) => ({
        candidate: i.candidate,
        labels: i.labels,
      })),
    };
    setIsClassifying(false);
    console.log("Data: ", classificationResult);
  };

  return (
    <Card className="md:w-2/5">
      <CardHeader>
        <CardTitle>Classification settings</CardTitle>
        <CardDescription>
          Choose how you want to classify you data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-6 ">
          {/* <CategorySelect /> */}
          <ParameterSelect category={category} parameters={parameters} />
          <DictionarySelect />
          {/* <ElementsTable category={category} /> */}
          <ClassifyButton
            onClick={handleClassify}
            disabled={classificationData.length === 0 || isClassifying}
          />
        </div>
      </CardContent>
    </Card>
  );
}
