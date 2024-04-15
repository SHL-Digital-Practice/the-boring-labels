const perkinsWillBenchMark = {
  id: "1",
  name: "Perkins&Will Benchmark",
  keys: [
    "Meeting Spaces",
    "Recreation Areas",
    "Toilet",
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
  ],
  metadata: {
    descriptions: [
      "Designated areas for formal or informal gatherings, conferences, and discussions.",
      "Spaces designed for leisure, relaxation, and enjoyment, often including games, seating, and entertainment facilities.",
      "A room or facility containing a toilet, sink, and other amenities for personal hygiene.",
      "Areas tailored for individual or collaborative work, often including desks, computers, and necessary technology.",
      "Rooms equipped for telecommunication, video conferencing, or other forms of digital communication.",
      "Spaces dedicated to the preparation and consumption of food and drinks, such as cafeterias, kitchens, and dining areas.",
      "Educational spaces designed for learning and studying, which can include libraries, classrooms, and workshops.",
      "Areas focused on health and well-being, including medical offices, therapy rooms, and relaxation spaces.",
      "Open spaces accessible to the general public, including lobbies, courtyards, and plazas.",
      "Ancillary spaces that support the main functions of a facility, such as janitorial closets, IT rooms, and maintenance workshops.",
      "Areas designated for storing supplies, equipment, and personal items, often including closets, lockers, and warehouses.",
      "Exterior spaces designed for various activities, including gardens, patios, and sports fields.",
      "Specialized areas for scientific research, experimentation, and innovation.",
      "Spaces dedicated to hygiene and personal grooming, such as restrooms, showers, and beauty salons.",
      "Areas designed for the care and supervision of children, including nurseries, playrooms, and kindergartens.",
      "Facilities equipped for physical activities and exercise, including gyms, yoga studios, and swimming pools.",
      "Operational spaces for behind-the-scenes functions, such as laundry, equipment maintenance, and waste disposal.",
      "Features designed to facilitate transportation, including parking lots, bike racks, and transit stops.",
      "Spaces designed for specific industries or activities, such as labs, studios, or manufacturing floors.",
      "A serene space intended for meditation, prayer, or spiritual reflection, accommodating various beliefs.",
      "Spaces that do not fit into the predefined categories, serving unique or multipurpose roles.",
    ],
  },
};

const dictionaries = [perkinsWillBenchMark];

export async function fetchDictionaries(): Promise<
  { name: string; id: string }[]
> {
  return dictionaries.map((d) => ({ name: d.name, id: d.id }));
}

export async function fetchDictionaryKeys(dictionaryId: string) {
  const dictionary = dictionaries.find((d) => d.id === dictionaryId);

  if (!dictionary) throw new Error("Dictionary not found.");

  return dictionary.keys;
}
