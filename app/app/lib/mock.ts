interface Dictionary {
  id: string;
  name: string;
  keys: Set<string>;
  primaryCategory?: string;
}

interface Category {
  id: string;
  name: string;
  elements: any[];
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

export const rooms = [
  {
    id: 1,
    parameters: {
      Area: "1000",
      Name: "Meeting Room",
      Type: "Conference Room",
      Description: "A room for meetings",
      Department: "HR",
      Program: "Meeting",
      Function: "Meeting",
      Occupancy: "10",
      "Occupancy Type": "People",
      "Occupancy Group": "A",
    },
  },
  {
    id: 2,
    parameters: {
      Area: "2000",
      Name: "Lobby",
      Type: "Lobby",
      Description: "A room for waiting",
      Department: "Reception",
      Program: "Lobby",
      Function: "Waiting",
      Occupancy: "20",
      "Occupancy Type": "People",
      "Occupancy Group": "B",
    },
  },
  {
    id: 3,
    parameters: {
      Area: "3000",
      Name: "Office",
      Type: "Office",
      Description: "A room for working",
      Department: "IT",
      Program: "Office",
      Function: "Working",
      Occupancy: "30",
      "Occupancy Type": "People",
      "Occupancy Group": "C",
    },
  },
  {
    id: 4,
    parameters: {
      Area: "4000",
      Name: "Kitchen",
      Type: "Kitchen",
      Description: "A room for cooking",
      Department: "Cafeteria",
      Program: "Kitchen",
      Function: "Cooking",
      Occupancy: "40",
      "Occupancy Type": "People",
      "Occupancy Group": "D",
    },
  },
  {
    id: 5,
    parameters: {
      Area: "5000",
      Name: "Restroom",
      Type: "Restroom",
      Description: "A room for resting",
      Department: "Sanitation",
      Program: "Restroom",
      Function: "Resting",
      Occupancy: "50",
      "Occupancy Type": "People",
      "Occupancy Group": "E",
    },
  },
  {
    id: 6,
    parameters: {
      Area: "6000",
      Name: "Storage",
      Type: "Storage",
      Description: "A room for storing",
      Department: "Storage",
      Program: "Storage",
      Function: "Storing",
      Occupancy: "60",
      "Occupancy Type": "People",
      "Occupancy Group": "F",
    },
  },
  {
    id: 7,
    parameters: {
      Area: "7000",
      Name: "Gym",
      Type: "Gym",
      Description: "A room for exercising",
      Department: "Fitness",
      Program: "Gym",
      Function: "Exercising",
      Occupancy: "70",
      "Occupancy Type": "People",
      "Occupancy Group": "G",
    },
  },
  {
    id: 8,
    parameters: {
      Area: "8000",
      Name: "Auditorium",
      Type: "Auditorium",
      Description: "A room for presenting",
      Department: "Presentation",
      Program: "Auditorium",
      Function: "Presenting",
      Occupancy: "80",
      "Occupancy Type": "People",
      "Occupancy Group": "H",
    },
  },
  {
    id: 9,
    parameters: {
      Area: "9000",
      Name: "Classroom",
      Type: "Classroom",
      Description: "A room for teaching",
      Department: "Education",
      Program: "Classroom",
      Function: "Teaching",
      Occupancy: "90",
      "Occupancy Type": "People",
      "Occupancy Group": "I",
    },
  },
  {
    id: 10,
    parameters: {
      Area: "10000",
      Name: "Library",
      Type: "Library",
      Description: "A room for reading",
      Department: "Reading",
      Program: "Library",
      Function: "Reading",
      Occupancy: "100",
      "Occupancy Type": "People",
      "Occupancy Group": "J",
    },
  },
];

export const categories: Category[] = [
  {
    id: "1",
    name: "Rooms",
    elements: rooms,
  },
  {
    id: "2",
    name: "Furniture",
    elements: [],
  },
  {
    id: "3",
    name: "Equipment",
    elements: [],
  },
  {
    id: "4",
    name: "Fixtures",
    elements: [],
  },
  {
    id: "5",
    name: "Fittings",
    elements: [],
  },
  {
    id: "6",
    name: "Accessories",
    elements: [],
  },
  {
    id: "7",
    name: "Services",
    elements: [],
  },
  {
    id: "8",
    name: "Systems",
    elements: [],
  },
  {
    id: "9",
    name: "Finishes",
    elements: [],
  },
  {
    id: "10",
    name: "Materials",
    elements: [],
  },
  {
    id: "11",
    name: "Products",
    elements: [],
  },
  {
    id: "12",
    name: "Other",
    elements: [],
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
