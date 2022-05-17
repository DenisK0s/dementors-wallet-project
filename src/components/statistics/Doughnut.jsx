import React, { useEffect, useState } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { useSelector } from 'react-redux';
import s from './statistics.module.css';
import { getBalance } from 'redux/transactions/transaction-selectors';
import statisticsSelectors from 'redux/statistics/statistics-selectors';

ChartJS.register(ArcElement, Tooltip, Legend);

export const startV = {
  datasets: [
    {
      label: '# of Votes',
      data: [],
      backgroundColor: [],
      borderWidth: 1,
    },
  ],
};

const Charts = () => {
  const statistics = useSelector(statisticsSelectors.statisticMinus);
  const balance = useSelector(getBalance);
  const [data, setData] = useState(startV);
  useEffect(() => {
    const newData = {
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
    statistics?.forEach(({ color, minus, category }) => {
      newData.datasets[0].backgroundColor.push(color);
      newData.datasets[0].data.push(minus);
      newData.datasets[0].label.push(category);
    });
    setData(newData);
  }, [statistics]);

  return (
    balance && (
      <div className={s.container}>
        <Doughnut data={data} style={{ width: 320, height: 320 }} />
        <p className={s.text}> ₴ {balance}.00</p>
      </div>
    )
  );
};
export default Charts;
