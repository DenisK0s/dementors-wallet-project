export const prepareOptsForChart = (costs, incomes) => {
  const newOpts = {
    datasets: [
      {
        label: [],
        data: [],
        backgroundColor: [],
        borderWidth: 0,
      },
      {},
    ],
  };
  if (costs.length === 0) {
    incomes.forEach(({ color, plus, category }) => {
      newOpts.datasets[0].backgroundColor.push(color);
      newOpts.datasets[0].data.push(plus);
      newOpts.datasets[0].label.push(category);
    });
  } else {
    costs.forEach(({ color, minus, category }) => {
      newOpts.datasets[0].backgroundColor.push(color);
      newOpts.datasets[0].data.push(minus);
      newOpts.datasets[0].label.push(category);
    });
  }
  return newOpts;
};
