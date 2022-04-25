const statisticPlus = state => state.statistics?.plus;
const statisticMinus = state => state.statistics.statistics?.minus;
const statisticTotal = state => [
  state.statistics?.statistics.totalPlus,
  state.statistics?.statistics.totalMinus,
];

const statisticsSelectors = {
  statisticPlus,
  statisticMinus,
  statisticTotal,
};
export default statisticsSelectors;
