import { Button } from "@/components/ui/button";
import CategorySelect from "./components/category-select";
import DictionarySelect from "./components/dictionary-select";
import ParameterSelect from "./components/parameter-select";
import ElementsTable from "./components/elements-table";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    category?: string;
  };
}) {
  const category = searchParams?.category || "";

  return (
    <main className="flex-1 flex justify-center items-center p-8">
      <h1 className="font-bold text-3xl">Labelling is boring.</h1>
    </main>
  );
}
