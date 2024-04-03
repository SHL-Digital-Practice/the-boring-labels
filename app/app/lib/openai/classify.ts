import { openai } from "./client";

const programs = [
  {
    id: 1,
    label: "Reception",
    description: `The reception area is the first thing people see when they enter a building. It is the place where visitors are greeted and can wait for their appointments. The reception area should be clean, organized, and welcoming. It should also be easy to find and access.`,
  },
  {
    id: 2,
    label: "Private Office",
    description: `A private office is a space where an individual can work without distractions. It is typically used by managers, executives, and other employees who need a quiet place to focus on their work. Private offices are usually equipped with a desk, chair, computer, and other essential office supplies.`,
  },
  {
    id: 3,
    label: "Conference Room",
    description: `A conference room is a space where people can meet to discuss business matters, hold meetings, and make presentations. Conference rooms are usually equipped with a large table, chairs, a whiteboard or projector, and other tools to facilitate communication and collaboration.`,
  },
  {
    id: 4,
    label: "Open Office",
    description: `An open office is a workspace that is shared by multiple employees. It is designed to promote collaboration, communication, and teamwork among coworkers. Open offices are usually arranged in an open layout with few or no partitions between workstations.`,
  },
  {
    id: 5,
    label: "Break Room",
    description: `A break room is a space where employees can take a break, eat lunch, and socialize with their coworkers. Break rooms are usually equipped with tables, chairs, a refrigerator, microwave, and other amenities to make employees feel comfortable and relaxed.`,
  },
  {
    id: 6,
    label: "Restroom",
    description: `A restroom is a facility that provides a place for people to use the toilet, wash their hands, and freshen up. Restrooms are essential in any building to ensure the health and well-being of its occupants. Restrooms should be clean, well-maintained, and easily accessible to all.`,
  },
  {
    id: 7,
    label: "Storage",
    description: `A storage room is a space where items are stored, organized, and kept out of the way. Storage rooms are used to store office supplies, equipment, files, and other items that are not needed on a daily basis. Storage rooms should be well-organized, secure, and easily accessible when needed.`,
  },
  {
    id: 8,
    label: "Elevator",
    description: `An elevator is a vertical transportation device that moves people and goods between floors in a building. Elevators are essential in multi-story buildings to provide access to upper floors for people with mobility issues or heavy items. Elevators should be safe, reliable, and well-maintained to ensure the safety of their passengers.`,
  },
  {
    id: 9,
    label: "Stairwell",
    description: `A stairwell is a space that provides access to different levels of a building via stairs. Stairwells are essential in case of emergencies such as fires or power outages when elevators are not available. Stairwells should be well-lit, clear of obstructions, and have handrails for safety.`,
  },
  {
    id: 10,
    label: "Hallway",
    description: `A hallway is a passageway that connects different rooms and spaces in a building. Hallways are used for circulation, wayfinding, and access to various areas of a building. Hallways should be well-lit, wide enough to accommodate traffic, and free of clutter to ensure safe passage for occupants.`,
  },
  {
    id: 11,
    label: "Lobby",
    description: `A lobby is the main entrance or reception area of a building. It is the first space that visitors see when they enter a building and sets the tone for the rest of the building. Lobbies are usually spacious, well-decorated, and provide seating for guests while they wait.`,
  },
  {
    id: 12,
    label: "Outdoor",
    description: `Outdoor spaces are areas outside of a building that are used for various purposes such as recreation, relaxation, and socializing. Outdoor spaces can include gardens, patios, courtyards, and other landscaped areas that enhance the aesthetic appeal and functionality of a building.`,
  },
  {
    id: 13,
    label: "Other",
    description: `Other spaces in a building that do not fit into the categories listed above. These spaces may include storage closets, mechanical rooms, maintenance areas, and other utility spaces that are essential for the operation of a building but are not used by occupants on a regular basis.`,
  },
];

const programsLabels = programs.map((p) => p.label);

export const classifyOpenAI = async (
  candidates: string[],
  labels: string[]
) => {
  if (candidates.length === 0 || candidates.length > 50) {
    throw new Error("Invalid number of candidates");
  }

  if (programsLabels.length === 0 || programsLabels.length > 50) {
    throw new Error("Invalid number of labels");
  }

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: `You will be presented with a list of names, your job is to classify each name against the labels provided below.
        Choose only from the list of labels provided.
        For each candidate, provide the TOP 3 labels that you think best describe the candidate.
        Write your output in json format with an array of objects, each object containing the candidate name and the top 3 labels.
        EXAMPLE: [{"candidate": "John", "labels": ["Label1", "Label2", "Label3"]}]
        Avoid markdown in your response. Give only the json string.
        Choose ONLY from the list of tags provided here:
        Labels: ${labels.map((r) => " - " + r).join("\n")}`,
      },
      {
        role: "user",
        content: `Classify the following text:\n
        Candidates: ${candidates.join("\n")}
        `,
      },
    ],
  });

  console.log("Answer: ", response.choices[0].message.content);

  if (!response.choices[0].message.content)
    throw new Error("Invalid response from OpenAI");

  const output = JSON.parse(response.choices[0].message.content);
  return output;
};
