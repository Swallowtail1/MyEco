type CalculateNextStreakParams = {
  currentStreak: number;
  lastActivityDate: string | null;
};

function getTodayJakartaDate() {
  return new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Jakarta",
  });
}

function getYesterdayJakartaDate() {
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  return yesterday.toLocaleDateString("en-CA", {
    timeZone: "Asia/Jakarta",
  });
}

export function calculateNextStreak({
  currentStreak,
  lastActivityDate,
}: CalculateNextStreakParams) {
  const today = getTodayJakartaDate();
  const yesterday = getYesterdayJakartaDate();

  if (!lastActivityDate) {
    return {
      nextStreak: 1,
      today,
    };
  }

  if (lastActivityDate === today) {
    return {
      nextStreak: currentStreak,
      today,
    };
  }

  if (lastActivityDate === yesterday) {
    return {
      nextStreak: currentStreak + 1,
      today,
    };
  }

  return {
    nextStreak: 1,
    today,
  };
}