interface Dictionary {
  id: string;
  name: string;
  keys: Set<string>;
  primaryCategory?: string;
}

interface Category {
  id: string;
  name: string;
}

export const dictionaries: Dictionary[] = [
  {
    id: "1",
    name: "Perkins&Will Benchmark",
    keys: new Set([
      "Meeting Spaces",
      "Recreation Areas",
      "Workspaces",
      "Communication Rooms",
      "Food and Beverage",
      "Learning Centers",
      "Wellness Facilities",
      "Public Areas",
      "Support Rooms",
      "Storage Spaces",
      "Outdoor Spaces",
      "Research and Development",
      "Personal Care",
      "Childcare Facilities",
      "Fitness and Exercise",
      "Service Areas",
      "Transport Amenities",
      "Specialized Work Areas",
      "Spiritual Room",
      "Other",
    ]),
    primaryCategory: "1",
  },
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Rooms",
  },
  {
    id: "2",
    name: "Furniture",
  },
  {
    id: "3",
    name: "Equipment",
  },
  {
    id: "4",
    name: "Fixtures",
  },
  {
    id: "5",
    name: "Fittings",
  },
  {
    id: "6",
    name: "Accessories",
  },
  {
    id: "7",
    name: "Services",
  },
  {
    id: "8",
    name: "Systems",
  },
  {
    id: "9",
    name: "Finishes",
  },
  {
    id: "10",
    name: "Materials",
  },
  {
    id: "11",
    name: "Products",
  },
  {
    id: "12",
    name: "Other",
  },
];

export const parameters: string[] = [
  "Area",
  "Name",
  "Type",
  "Description",
  "Department",
  "Program",
  "Function",
  "Occupancy",
  "Occupancy Type",
  "Occupancy Group",
];
