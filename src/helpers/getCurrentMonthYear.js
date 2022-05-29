export const getCurrentMonthYear = () => {
  const date = new Date();
  const month = date.getUTCMonth() + 1;
  const currentMonth = month.toString().padStart(2, "0");
  const currentYear = date.getUTCFullYear().toString();
  return { currentMonth, currentYear };
};
