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
import { columns } from "../classifier/components/result-column";

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
    const classificationResult: ClassificationResult = {
      header: parameter,
      items: data.map((i: any) => ({
        candidate: i.candidate,
        labels: i.labels,
      })),
    };

    console.log("classification result", classificationResult);

    setClassificationResult(classificationResult);
    setIsClassifying(false);
  };

  return (
    <Card className="md:w-2/5">
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
          />
          {true && <ResultsTable data={mockResults} columns={columns} />}
        </div>
      </CardContent>
    </Card>
  );
}
