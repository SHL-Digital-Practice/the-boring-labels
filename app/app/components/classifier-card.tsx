import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import CategorySelect from "./category-select";
import DictionarySelect from "./dictionary-select";
import ParameterSelect from "./parameter-select";

export default function ClassifierCard({
  searchParams,
}: {
  searchParams?: {
    category?: string;
  };
}) {
  const category = searchParams?.category || "";

  return (
    <Card className="md:w-2/5">
      <CardHeader>
        <CardTitle>Classification settings</CardTitle>
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
  );
}
