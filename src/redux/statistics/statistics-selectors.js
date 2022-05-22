const statisticPlus = (state) => state.statistics.plus;
const statisticMinus = (state) => state.statistics.minus;
const statisticTotal = (state) => [
  state.statistics.totalPlus,
  state.statistics.totalMinus,
];
const firstTransactionYear = (state) => state.statistics.firstTransactionYear;

const statisticsSelectors = {
  statisticPlus,
  statisticMinus,
  statisticTotal,
  firstTransactionYear,
};
export default statisticsSelectors;
