const ROOT_ARCHETYPES: Record<number, string> = {
  1: "Initiation / Identity",
  2: "Duality / Reflection",
  3: "Expansion / Creation",
  4: "Structure / Foundation",
  5: "Change / Motion",
  6: "Harmony / Balance",
  7: "Mystery / Analysis",
  8: "Power / Materialization",
  9: "Completion / Cycle"
};

export function symbolicSummary(root: number) {
  return ROOT_ARCHETYPES[root] ?? "Neutral";
}
