const statisticPlus = state => state.statistics?.plus;
const statisticMinus = state => state.statistics.statistics?.minus;
const statisticTotal = state => [
  state.statistics?.totalPlus,
  state.statistics?.totalMinus,
];

const statisticsSelectors = {
  statisticPlus,
  statisticMinus,
  statisticTotal,
};
export default statisticsSelectors;
