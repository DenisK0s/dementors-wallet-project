export const createStatsYearsList = ({ firstTransactionYear, currentYear }) => {
  const startYear = Number(firstTransactionYear);
  const endYear = Number(currentYear);
  const yearsQuantity = endYear - startYear;
  const result = [];

  if (startYear === endYear) {
    return [
      {
        label: endYear + "",
        value: endYear + "",
      },
    ];
  }

  for (let i = 0; i <= yearsQuantity; i++) {
    if (i === 0) {
      result.push({
        label: startYear + "",
        value: startYear + "",
      });
      continue;
    }

    result.push({
      label: startYear + i + "",
      value: startYear + i + "",
    });
  }
  return result;
};
