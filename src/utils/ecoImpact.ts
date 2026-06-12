export type EcoImpact = {
  motorcycleKm: number;
  plasticBottles: number;
  treesMonthly: number;
  phoneCharges: number;
};

export function calculateEcoImpact(carbonSaved: number): EcoImpact {
  if (carbonSaved <= 0) {
    return {
      motorcycleKm: 0,
      plasticBottles: 0,
      treesMonthly: 0,
      phoneCharges: 0,
    };
  }

  return {
    motorcycleKm: Math.round(carbonSaved / 0.1),
    plasticBottles: Math.round(carbonSaved / 0.08),
    treesMonthly: Math.round(carbonSaved / 1.8),
    phoneCharges: Math.round(carbonSaved / 0.005),
  };
}