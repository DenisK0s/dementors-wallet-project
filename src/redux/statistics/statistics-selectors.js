const statisticPlus = (state) => state.statistics.statsData.plus;
const statisticMinus = (state) => state.statistics.statsData.minus;
const statisticTotal = (state) => [
  state.statistics.statsData.totalPlus,
  state.statistics.statsData.totalMinus,
];
const firstTransactionYear = (state) => state.statistics.statsData.firstTransactionYear;

const isNoData = ({ statistics }) =>
  statistics.statsData.minus.length === 0 && statistics.statsData.plus.length === 0;

const statisticsSelectors = {
  statisticPlus,
  statisticMinus,
  statisticTotal,
  firstTransactionYear,
  isNoData,
};
export default statisticsSelectors;
