import { Button } from "@/components/ui/button";
import CategorySelect from "@/app/components/category-select";
import DictionarySelect from "@/app/components/dictionary-select";
import ParameterSelect from "@/app/components/parameter-select";
import ElementsTable from "@/app/components/elements-table";
import DataCard from "../components/data-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    category?: string;
  };
}) {
  const category = searchParams?.category || "";

  return (
    <main className="flex min-h-screen flex-col items-center py-8 px-3">
      <div className="flex flex-col sm:flex-row w-full gap-6">
        <div className="md:w-3/5 flex flex-col items-start ">
          <DataCard />
        </div>
        <Card className="md:w-2/5">
          <CardHeader>
            <CardTitle>Label settings</CardTitle>
            <CardDescription>
              Choose how you want to label you data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form
              action={async (formData: FormData) => {
                "use server";
                console.log("formData", formData);
              }}
              className="flex flex-col gap-y-6 "
            >
              <CategorySelect />
              <ParameterSelect category={category} />
              <DictionarySelect />
              {/* <ElementsTable category={category} /> */}
              <Button type="submit">Classify</Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
