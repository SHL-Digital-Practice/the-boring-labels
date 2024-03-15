"use client";

import { useEffect } from "react";

export default function ElementsTable({ category }: { category: string }) {
  useEffect(() => {
    async function fetchData() {
      console.log("ElementsTable Category", category);
      if (category) {
        const bridge = window.chrome.webview.hostObjects.appBridge;
        const data = await bridge.GetElementsByCategory(category, 1);
        console.log("ElementsTable Data", data);
      }
    }
    fetchData();
  }, [category]);
  return <div>Elements Table</div>;
}
