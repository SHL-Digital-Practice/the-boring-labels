"use server";

import { categories } from "./mock";

async function getElementsByCategory(category: string) {
  return categories.find((c) => c.id === category)?.elements;
}
