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
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";

export default function ClassifierSettingsCard({
  parameters,
}: {
  parameters: string[];
}) {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "";

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="settings-card">
        <Card className="md:w-2/5">
          <CardHeader>
            <AccordionTrigger className="text-start">
              <CardTitle>Settings</CardTitle>
            </AccordionTrigger>
            <CardDescription>
              Choose how you want to classify you data.
            </CardDescription>
          </CardHeader>
          <AccordionContent>
            <CardContent>
              <div className="flex flex-col gap-y-6 ">
                <ParameterSelect category={category} parameters={parameters} />
                <DictionarySelect />
              </div>
            </CardContent>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
}
