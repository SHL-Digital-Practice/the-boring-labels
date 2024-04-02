"use client";

import DataCard from "../components/data-card";
import ClassifierCard from "../components/classifier-card";
import { useState } from "react";

export default function Home() {
  // define a state here to store the uploaded data
  const [classificationData, setClassificationData] = useState<Array<any>>([]);

  return (
    <main className="flex min-h-screen flex-col items-center py-8 px-3">
      <div className="flex flex-col sm:flex-row w-full gap-6">
        <DataCard
          setClassificationData={setClassificationData}
          classificationData={classificationData}
        />
        <ClassifierCard
          setClassificationData={setClassificationData}
          classificationData={classificationData}
        />
      </div>
    </main>
  );
}
