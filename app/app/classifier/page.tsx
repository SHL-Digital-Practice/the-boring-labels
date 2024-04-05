"use client";

import DataCard from "../components/data-card";
import ClassifierSettingsCard from "../components/classifier-settings-card";
import { useState } from "react";
import { ClassifyCard } from "../components/classify-card";

export type ClassificationResult = {
  header: string;
  items: Array<{
    candidate: string;
    labels: [string, string, string];
  }>;
} | null;

export default function Home() {
  // define a state here to store the uploaded data
  const [classificationData, setClassificationData] = useState<Array<any>>([]);
  const [classificationResult, setclassificationResult] =
    useState<ClassificationResult>(null);
  const [headers, setHeaders] = useState<Array<string>>([]);

  return (
    <div className="flex flex-col md:flex-row w-full gap-6">
      <DataCard
        setClassificationData={setClassificationData}
        classificationData={classificationData}
        headers={headers}
        setHeaders={setHeaders}
      />
      <ClassifierSettingsCard parameters={headers} />
      <ClassifyCard
        classificationResult={classificationResult}
        classificationData={classificationData}
        setClassificationResult={setclassificationResult}
      />
    </div>
  );
}
