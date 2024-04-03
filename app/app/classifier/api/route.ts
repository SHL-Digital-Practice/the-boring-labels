import { programs } from "@/app/lib/programs";
import { classifyOpenAI } from "@/app/lib/openai/classify";

const programsNames = programs.map((program) => program.key);

export async function classify(classificationData: any[], formData: FormData) {
  const parameter = formData.get("parameter");
  const dictionary = formData.get("dictionary");
  const newParameter = formData.get("newParameter");
}

export async function POST(request: Request) {
  console.time("classify");

  const body = await request.json();
  console.log("Body: ", body);
  const { classificationData, parameter, dictionary } = body;

  if (!parameter || !dictionary) throw new Error("Missing fields.");
  const candidates = classificationData.map(
    (data: any) => data[parameter.toString()]
  );

  const chunkSize = 20;
  const chunks = [];
  for (let i = 0; i < candidates.length; i += chunkSize) {
    const chunk = candidates.slice(i, i + chunkSize);
    chunks.push(chunk);
  }

  const results = await Promise.all(
    chunks.map((chunk) => classifyOpenAI(chunk, programsNames))
  );
  const result = results.flat();

  return Response.json(result);
}
