import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function DataCard() {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Data</CardTitle>
        <CardDescription>Upload your data to be classified.</CardDescription>
      </CardHeader>
      <CardContent>Here the main data.</CardContent>
      <CardFooter>Here the footer</CardFooter>
    </Card>
  );
}
