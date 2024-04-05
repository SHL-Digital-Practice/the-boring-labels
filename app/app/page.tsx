import { Button } from "@/components/ui/button";
import TypeWriterHeader from "./components/typewriter-header";
import Link from "next/link";
import { SparklesIcon } from "lucide-react";

export default function Home({
  searchParams,
}: {
  searchParams?: {
    category?: string;
  };
}) {
  const category = searchParams?.category || "";

  return (
    <main className="flex-1 flex flex-col gap-4 justify-center items-center p-8">
      <TypeWriterHeader />
      <Link href="classifier">
        <Button>
          Try out the classifier <SparklesIcon className="ml-2 w-5" />
        </Button>
      </Link>
    </main>
  );
}
