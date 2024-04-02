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
import { classify } from "@/app/actions";
import { ClassifyButton } from "./classify-button";

export default function ClassifierCard({
  searchParams,
  classificationData,
  parameters,
}: {
  searchParams?: {
    category?: string;
  };
  setClassificationData: React.Dispatch<React.SetStateAction<any[]>>;
  classificationData: any[];
  parameters: string[];
}) {
  const category = searchParams?.category || "";
  const classifyWithData = classify.bind(null, classificationData);

  return (
    <Card className="md:w-2/5">
      <CardHeader>
        <CardTitle>Classification settings</CardTitle>
        <CardDescription>
          Choose how you want to classify you data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form action={classifyWithData} className="flex flex-col gap-y-6 ">
          {/* <CategorySelect /> */}
          <ParameterSelect category={category} parameters={parameters} />
          <DictionarySelect />
          {/* <ElementsTable category={category} /> */}
          <ClassifyButton
            onClick={classifyWithData}
            disabled={classificationData.length === 0}
          />
        </form>
      </CardContent>
    </Card>
  );
}
