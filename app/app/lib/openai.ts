import OpenAI from "openai";
import { Document } from "langchain/document";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "@langchain/openai";
import { programs } from "./programs";

if (!process.env.OPENAI_API_KEY) throw new Error("Missing OPENAI_API_KEY.");

export const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const createStore = () => {
  return MemoryVectorStore.fromDocuments(
    programs.map(
      (program) =>
        new Document({
          pageContent: `Label: ${program.key}\nDescription: ${program.description}`,
          metadata: { source: program.key, label: program.key },
        })
    ),
    new OpenAIEmbeddings()
  );
};

export const search = async (query: string, count = 3) => {
  const store = await createStore();
  return store.similaritySearchWithScore(query, count);
};
