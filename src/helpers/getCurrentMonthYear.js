export const getCurrentMonthYear = () => {
  const date = new Date();
  const currentMonth = date.getUTCMonth() + 1;
  const currentYear = date.getUTCFullYear();
  return { currentMonth, currentYear };
};
