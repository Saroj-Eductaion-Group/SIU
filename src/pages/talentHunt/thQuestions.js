// SIUAT Question Bank - Combined Entry Point
import { QB_PART1 } from './thQuestions_part1';
import { QB_PART2 } from './thQuestions_part2';

export const QB = {
  ...QB_PART1,
  ...QB_PART2,
  // Aliases so course name variants all match
  "MBA":        QB_PART1["BBA"],
  "BBA/MBA":    QB_PART1["BBA"],
  "BCA/MCA":    QB_PART1["BCA"],
  "MCA":        QB_PART1["BCA"],
  "M.Tech":     QB_PART2["B.Tech"],
  "B.Com/M.Com":QB_PART1["B.Com"],
  "M.Com":      QB_PART1["B.Com"],
  "B.Com":      QB_PART1["B.Com"],
  "M.Sc":       QB_PART2["B.Sc"],
  "D.Pharma":   QB_PART1["B.Pharma"],
  "M.Pharma":   QB_PART1["B.Pharma"],
  "B.Sc/MCS":   QB_PART2["B.Sc"],
  "MCS":        QB_PART2["B.Sc"],
  "BS/MS":      QB_PART2["B.Sc"],
  "LLM":        QB_PART2["LLB"],
  "LLB (Law)":  QB_PART2["LLB"],
  "Ph.D":       QB_PART2["Ph.D"],
  "Diploma":    QB_PART2["Diploma"],
  "B.Tech":     QB_PART2["B.Tech"],
  "BA/MA":      QB_PART1["BA"],
  "MA":         QB_PART1["BA"],
};

export function getQuestions(courses) {
  const keys = Object.keys(QB);
  // First pass: exact match
  for (let i = 0; i < courses.length; i++) {
    const c = courses[i].toLowerCase().replace(/[^a-z.]/g, '');
    for (let j = 0; j < keys.length; j++) {
      const k = keys[j].toLowerCase().replace(/[^a-z.]/g, '');
      if (c === k) return QB[keys[j]];
    }
  }
  // Second pass: starts-with match
  for (let i = 0; i < courses.length; i++) {
    const c = courses[i].toLowerCase().replace(/[^a-z.]/g, '');
    for (let j = 0; j < keys.length; j++) {
      const k = keys[j].toLowerCase().replace(/[^a-z.]/g, '');
      if (c.startsWith(k) || k.startsWith(c)) return QB[keys[j]];
    }
  }
  return QB["B.Tech"]; // fallback
}
