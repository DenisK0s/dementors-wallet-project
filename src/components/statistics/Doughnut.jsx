// import React, { useEffect, useState } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import s from "./statistics.module.css";
import { useSelector } from "react-redux";
import statisticsSelectors from "redux/statistics/statistics-selectors";
import { getBalance } from "redux/transactions/transaction-selectors";

ChartJS.register(ArcElement, Tooltip, Legend);

// export const startV = {
//   datasets: [
//     {
//       label: "# of Votes",
//       data: [],
//       backgroundColor: [],
//       borderWidth: 1,
//     },
//   ],
// };

const Charts = ({ data, balance }) => {
  console.log(data, "data");
  // const statsCosts = useSelector(statisticsSelectors.statisticMinus);
  // const statsIncomes = useSelector(statisticsSelectors.statisticPlus);
  // const balance = useSelector(getBalance);

  // const [data, setData] = useState(startV);

  // useEffect(() => {
  //   const newData = {
  //     datasets: [
  //       {
  //         label: [],
  //         data: [],
  //         backgroundColor: [],
  //         borderWidth: 0,
  //       },
  //       {},
  //     ],
  //   };
  //   if (statsCosts.length === 0) {
  //     statsIncomes.forEach(({ color, plus, category }) => {
  //       newData.datasets[0].backgroundColor.push(color);
  //       newData.datasets[0].data.push(plus);
  //       newData.datasets[0].label.push(category);
  //     });
  //   } else {
  //     statsCosts.forEach(({ color, minus, category }) => {
  //       newData.datasets[0].backgroundColor.push(color);
  //       newData.datasets[0].data.push(minus);
  //       newData.datasets[0].label.push(category);
  //     });
  //   }
  //   setData(newData);
  // }, [statsCosts, statsIncomes]);

  return (
    <div className={s.container}>
      <Doughnut data={data} className={s.doughnut} />
      <p className={s.text}> ₴ {balance}.00</p>
    </div>
  );
};

Charts.defaultProps = {
  data: {
    datasets: [
      {
        label: "# of Votes",
        data: [],
        backgroundColor: [],
        borderWidth: 1,
      },
    ],
  },
};

export default Charts;
