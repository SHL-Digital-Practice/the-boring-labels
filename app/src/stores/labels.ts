import { ref, computed } from "vue";
import { defineStore } from "pinia";

export interface ResponseData {
  sequence: string;
  labels: string[];
  scores: number[];
}

export const useLabelsStore = defineStore("labels", () => {
  const labels = ref<ResponseData[]>([
    {
      sequence: "Midway",
      labels: [
        "Conference and Collaboration",
        "Game Room (Recreation Space, Designated)",
        "Phone Room / Focus Room",
        "Office",
        "Workstation",
        "Wellness / Mother's Room",
        "Library / Resource Center",
        "Pantry",
        "Project Room / War Room / Case Room",
        "Training Room",
      ],
      scores: [
        0.19674913585186005, 0.15928778052330017, 0.11508253216743469,
        0.11321374773979187, 0.09414688497781754, 0.0868559405207634,
        0.07034812122583389, 0.06962136179208755, 0.060718610882759094,
        0.03397585079073906,
      ],
    },
  ]);

  async function fetchLabels(data: {
    inputs: string;
    parameters: { candidate_labels: string[] };
  }) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
      {
        headers: { Authorization: `Bearer ${import.meta.env.VITE_HF_API_KEY}` },
        method: "POST",
        body: JSON.stringify(data),
      }
    );

    labels.value.push(await response.json());
  }

  return { labels, fetchLabels };
});
