export const canUse = () => {
    const today = new Date().toDateString();
    const usage = JSON.parse(localStorage.getItem("prodscript_usage") || "{}");
  
    if (usage.date !== today) {
      usage.date = today;
      usage.count = 0;
    }
  
    if (usage.count >= 3) {
      return false;
    }
  
    return true;
  };
  
  export const increaseUsage = () => {
    const today = new Date().toDateString();
    const usage = JSON.parse(localStorage.getItem("prodscript_usage") || "{}");
  
    if (usage.date !== today) {
      usage.date = today;
      usage.count = 1;
    } else {
      usage.count = (usage.count || 0) + 1;
    }
  
    localStorage.setItem("prodscript_usage", JSON.stringify(usage));
  };
  