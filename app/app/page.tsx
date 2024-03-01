import { Button } from "@/components/ui/button";
import CategorySelect from "./components/category-select";
import DictionarySelect from "./components/dictionary-select";
import ParameterSelect from "./components/parameter-select";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="max-w-5xl w-full items-center justify-center">
        <form
          action={async (formData: FormData) => {
            "use server";
            console.log("formData", formData);
          }}
          className="space-y-6"
        >
          <CategorySelect />
          <ParameterSelect />
          <DictionarySelect />
          <Button type="submit">Classify</Button>
        </form>
      </div>
    </main>
  );
}
