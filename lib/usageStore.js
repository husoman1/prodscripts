const DAILY_LIMIT = 3;

export const canUse = () => {
  const today = new Date().toISOString().slice(0, 10);
  const stored = localStorage.getItem("usage_date");
  const usage = parseInt(localStorage.getItem("usage_count") || "0", 10);

  if (stored !== today) {
    localStorage.setItem("usage_date", today);
    localStorage.setItem("usage_count", "0");
    return true;
  }

  return usage < DAILY_LIMIT;
};

export const increaseUsage = () => {
  const usage = parseInt(localStorage.getItem("usage_count") || "0", 10);
  localStorage.setItem("usage_count", (usage + 1).toString());
};

export const getRemainingUsage = () => {
  const today = new Date().toISOString().slice(0, 10);
  const stored = localStorage.getItem("usage_date");
  const usage = parseInt(localStorage.getItem("usage_count") || "0", 10);

  if (stored !== today) return DAILY_LIMIT;
  return Math.max(DAILY_LIMIT - usage, 0);
};
