import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import DictionarySelect from "./dictionary-select";
import ParameterSelect from "./parameter-select";
import { useSearchParams } from "next/navigation";

export default function ClassifierSettingsCard({
  parameters,
}: {
  parameters: string[];
}) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";

  return (
    <Card className="md:w-2/5">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
        <CardDescription>
          Choose how you want to classify you data.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-y-6 ">
          <ParameterSelect category={category} parameters={parameters} />
          <DictionarySelect />
        </div>
      </CardContent>
    </Card>
  );
}
