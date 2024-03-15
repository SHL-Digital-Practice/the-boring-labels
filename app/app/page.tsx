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
    <main className="flex min-h-screen flex-col items-center p-8">
      <div className="max-w-5xl w-full items-center justify-center">
        <form
          action={async (formData: FormData) => {
            "use server";
            console.log("formData", formData);
          }}
          className="flex flex-col gap-y-6"
        >
          <CategorySelect />
          <ParameterSelect />
          <DictionarySelect />
          <ElementsTable category={category} />
          <Button type="submit">Classify</Button>
        </form>
      </div>
    </main>
  );
}
