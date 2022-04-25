import React, { useEffect } from 'react';
import s from 'components/statistics/statistics.module.css';
import Donut from './doughnut';
import { useSelector, useDispatch } from 'react-redux';
import globalSelectors from '../../redux/global/global-selectors';
import statisticsSelectors from 'redux/statistics/statistics-selectors';
import statisticsOperations from 'redux/statistics/statistics-operations';

let Data = new Date();
const Year = Data.getFullYear();
const Month = Data.getMonth();

let fMonth = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];
let enMonth = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export default function Statistics() {
  const lang = useSelector(globalSelectors.lang);
  const dispatch = useDispatch();
  const statistics = useSelector(statisticsSelectors.statisticMinus);
  const balance = useSelector(statisticsSelectors.statisticTotal);
  useEffect(() => {
    dispatch(statisticsOperations.getStatistics());
  }, [dispatch]);
  return (
    <div className={s.box_statistics}>
      <div className={s.box_circle}>
        <p className={s.title_statistics}>
          {lang ? 'Statistics' : 'Статистика'}
        </p>
        <div className={s.section} id={s.container}>
          <Donut />
        </div>
      </div>
      <div className={s.container_statistics}>
        <div className={s.box_data}>
          <div className={s.months}>
            {lang ? enMonth[Month] : fMonth[Month]}
          </div>
          <div className={s.years}> {Year}</div>
        </div>

        <div className={s.box_category_summa}>
          <p className={s.category}>{lang ? 'Category' : 'Категория'}</p>
          <p className={s.summa}>{lang ? 'Amount' : 'Cумма'}</p>
        </div>

        <ul className={s.list_statistics}>
          {statistics?.map(({ category, color, minus }) => {
            return (
              <li key={color}>
                <div
                  style={{ background: color }}
                  className={s.rectangle}
                ></div>
                <p className={s.info_statistics}>{category}</p>
                <p>{minus}</p>
              </li>
            );
          })}

          <li>
            <p className={s.info_statistics_expenses}>
              {lang ? 'Outcomes' : 'Расходы'}:
            </p>
            <p>{balance[1]}</p>
          </li>

          <li>
            <p className={s.info_statistics_income}>
              {lang ? 'Incomes' : 'Доходы'}:
            </p>
            <p>{balance[0]}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
