"use client";

import { useEffect } from "react";

export default function ElementsTable({ category }: { category: string }) {
  useEffect(() => {
    async function fetchData() {
      console.log("ElementsTable Category", category);
    }
    fetchData();
  }, [category]);
  return <div>Elements Table</div>;
}
