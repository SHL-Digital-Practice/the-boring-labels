import { Result } from "../classifier/components/result-column";
import { ClassificationResult } from "../classifier/page";

export const mockResults: Result[] = [
  {
    id: 1,
    candidate: "Apartment",
    labels: ["Apartment", "House", "Condo"],
  },
  {
    id: 2,
    candidate: "House",
    labels: ["House", "Condo", "Apartment"],
  },
  {
    id: 3,
    candidate: "Condo",
    labels: ["Condo", "Apartment", "House"],
  },
];

export default function ResultsTable({
  results,
}: {
  results: ClassificationResult;
}) {
  return <>Results table</>;
}
