"use client";

import DataCard from "../components/data-card";
import ClassifierCard from "../components/classifier-card";
import { useState } from "react";

export type ClassificationResult = {
  header: string;
  items: Array<{
    candidate: string;
    labels: Array<string>;
  }>;
} | null;

export default function Home() {
  // define a state here to store the uploaded data
  const [classificationData, setClassificationData] = useState<Array<any>>([]);
  const [classificationResult, setclassificationResult] =
    useState<ClassificationResult>(null);
  const [headers, setHeaders] = useState<Array<string>>([]);

  return (
    <div className="flex flex-col sm:flex-row w-full gap-6">
      <DataCard
        setClassificationData={setClassificationData}
        classificationData={classificationData}
        headers={headers}
        setHeaders={setHeaders}
      />
      <ClassifierCard
        setClassificationData={setClassificationData}
        classificationData={classificationData}
        parameters={headers}
      />
    </div>
  );
}
