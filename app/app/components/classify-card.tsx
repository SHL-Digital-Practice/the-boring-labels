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
      </CardContent>
    </Card>
  );
}
