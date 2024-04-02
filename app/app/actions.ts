"use server";

import { programs } from "./lib/programs";
import { classifyOpenAI } from "./lib/openai/classify";

const programsNames = programs.map((program) => program.key);

export async function classify(classificationData: any[], formData: FormData) {
  const parameter = formData.get("parameter");
  const dictionary = formData.get("dictionary");
  const newParameter = formData.get("newParameter");

  if (!parameter || !dictionary) throw new Error("Missing fields.");
  const candidates = classificationData.map(
    (data) => data[parameter.toString()]
  );

  const lessCandidates = candidates.slice(0, 50); // Limit to 50 candidates

  const result = await classifyOpenAI(lessCandidates, programsNames);
}
