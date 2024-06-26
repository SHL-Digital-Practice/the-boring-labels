import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import DictionarySelect from "./dictionary-select";
import ParameterSelect from "./parameter-select";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AccordionContent } from "@radix-ui/react-accordion";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { fetchDictionaries } from "../lib/data";

function Loading() {
  return (
    <div className="flex">
      <Skeleton className="h-6 w-10/12" />
      <Skeleton className="ml-4 h-6 w-2/12" />
    </div>
  );
}

export default async function ClassifierSettingsCard({
  parameters,
}: {
  parameters: string[];
}) {
  const dictionaries = await fetchDictionaries();

  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="settings-card" className="border-none">
        <Card className="h-full ">
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
                <ParameterSelect parameters={parameters} />
                <Suspense fallback={<Loading />}>
                  <DictionarySelect dictionaries={dictionaries} />
                </Suspense>
              </div>
            </CardContent>
          </AccordionContent>
        </Card>
      </AccordionItem>
    </Accordion>
  );
}
