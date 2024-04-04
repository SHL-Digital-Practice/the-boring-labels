import { programs } from "@/app/lib/programs";
import { classifyOpenAI } from "@/app/lib/openai/classify";
import { NextRequest, NextResponse } from "next/server";

const programsNames = programs.map((program) => program.key);

// export async function POST(request: Request) {
//   console.time("classify");

//   const body = await request.json();
//   const { classificationData, parameter, dictionary } = body;

//   if (!parameter || !dictionary) throw new Error("Missing fields.");
//   const candidates = classificationData.map(
//     (data: any) => data[parameter.toString()]
//   );

//   const chunkSize = 10;
//   const chunks = [];
//   for (let i = 0; i < candidates.length; i += chunkSize) {
//     const chunk = candidates.slice(i, i + chunkSize);
//     chunks.push(chunk);
//   }

//   const results = await Promise.all(
//     chunks.map((chunk) => classifyOpenAI(chunk, programsNames))
//   );
//   const result = results.flat();

//   console.timeEnd("classify");
//   return Response.json(result);
// }

export async function GET(request: NextRequest) {
  console.time("classify");

  const searchParams = request.nextUrl.searchParams;
  const candidates = searchParams.get("candidates")?.split(",");
  const parameter = searchParams.get("parameter");
  const dictionary = searchParams.get("dictionary");

  if (!parameter || !dictionary || !candidates)
    throw new Error("Missing fields.");

  const chunkSize = 10;
  const chunks = [];
  for (let i = 0; i < candidates.length; i += chunkSize) {
    const chunk = candidates.slice(i, i + chunkSize);
    chunks.push(chunk);
  }

  const results = await Promise.all(
    chunks.map((chunk) => classifyOpenAI(chunk, programsNames))
  );

  console.timeEnd("classify");
  return Response.json(results);
}
