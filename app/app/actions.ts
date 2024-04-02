"use server";

import { search } from "./lib/openai";

type ClassificationResult = Array<{
  key: string;
  confidence: number;
}>;

export async function classify(classificationData: any[], formData: FormData) {
  const parameter = formData.get("parameter");
  const dictionary = formData.get("dictionary");
  const newParameter = formData.get("newParameter");

  if (!parameter || !dictionary) throw new Error("Missing fields.");
  const candidates = classificationData.map(
    (data) => data[parameter.toString()]
  );
  console.log("candidates", candidates);

  const promises = candidates.map(async (candidate) => {
    const result = await search(candidate);
    const classificationResults: ClassificationResult = result.map((r) => ({
      key: r[0].metadata.source,
      confidence: r[1],
    }));

    console.log("classificationResults", classificationResults);
    return result;
  });

  const results = await Promise.all(promises);
}
