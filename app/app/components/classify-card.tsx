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

export function ClassifyCard({
  classificationData,
  setClassificationResult,
}: {
  classificationData: any[];
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

    console.log("Data: ", classificationResult);
    setClassificationResult(classificationResult);
    setIsClassifying(false);
    console.log("Data: ", classificationResult);
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
        </div>
      </CardContent>
    </Card>
  );
}
