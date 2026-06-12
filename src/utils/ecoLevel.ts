export type EcoLevel = {
  name: string;
  minPoints: number;
  nextLevel: string | null;
  nextRequiredPoints: number | null;
  message: string;
};

const levels: EcoLevel[] = [
  {
    name: "Seedling",
    minPoints: 0,
    nextLevel: "Eco Starter",
    nextRequiredPoints: 100,
    message: "Every big impact starts with a small green step.",
  },
  {
    name: "Eco Starter",
    minPoints: 100,
    nextLevel: "Green Mover",
    nextRequiredPoints: 250,
    message: "You are building better eco habits. Keep going!",
  },
  {
    name: "Green Mover",
    minPoints: 250,
    nextLevel: "Eco Hero",
    nextRequiredPoints: 500,
    message: "Your actions are starting to create real impact.",
  },
  {
    name: "Eco Hero",
    minPoints: 500,
    nextLevel: "Earth Guardian",
    nextRequiredPoints: 1000,
    message: "Amazing progress. You are becoming an eco role model.",
  },
  {
    name: "Earth Guardian",
    minPoints: 1000,
    nextLevel: null,
    nextRequiredPoints: null,
    message: "You have reached the highest eco level. Legendary impact!",
  },
];

export function getEcoLevel(points: number) {
  const currentLevel =
    [...levels]
      .reverse()
      .find((level) => points >= level.minPoints) ?? levels[0];

  const currentIndex = levels.findIndex(
    (level) => level.name === currentLevel.name
  );

  const previousRequiredPoints = currentLevel.minPoints;
  const nextRequiredPoints = currentLevel.nextRequiredPoints;

  let progress = 100;
  let remainingPoints = 0;

  if (nextRequiredPoints !== null) {
    const levelRange = nextRequiredPoints - previousRequiredPoints;
    const userProgress = points - previousRequiredPoints;

    progress = Math.min(
      100,
      Math.max(0, Math.round((userProgress / levelRange) * 100))
    );

    remainingPoints = Math.max(0, nextRequiredPoints - points);
  }

  return {
    ...currentLevel,
    progress,
    remainingPoints,
    levelNumber: currentIndex + 1,
    totalLevels: levels.length,
  };
}