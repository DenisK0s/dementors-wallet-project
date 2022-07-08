import s from "components/statistics/statistics.module.css";
import React, { useEffect, useState, useRef, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import statisticsOperations from "redux/statistics/statistics-operations";
import statisticsSelectors from "redux/statistics/statistics-selectors";
import monthInRussian from "../../data/monthInRussian.json";
import monthsInEnglish from "../../data/monthsInEnglish.json";
import Donut from "./Doughnut";
import StatisticsSelect from "./StatisticsSelect";
import { getBalance } from "redux/transactions/transaction-selectors";
import { ReactComponent as NoDataIcon } from "../../assets/images/icons/no-data-amico.svg";
import helpers from "../../helpers";
import { useMatchMedia } from "../../hooks/use-match-media";
import { useScrollbar } from "../../hooks/use-scrollbar";

const { currentMonth, currentYear } = helpers.getCurrentMonthYear();

const filterOptions = (opts, currentMonth) => {
  return opts.filter((_, idx) => idx.toString().padStart(2, "0") < currentMonth);
};

export default function Statistics() {
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const statsListWrapper = useRef(null);
  const dispatch = useDispatch();
  const { isMobile } = useMatchMedia();
  const { t, i18n } = useTranslation();
  const isNoData = useSelector(statisticsSelectors.isNoData);

  useEffect(() => {
    if (isNoData) {
      dispatch(statisticsOperations.getStatistics({}));
    }
  }, []);

  useEffect(() => {
    if (selectedMonth) {
      dispatch(statisticsOperations.getStatistics({ selectedMonth }));
    }
    if (selectedYear && selectedYear !== currentYear) {
      dispatch(statisticsOperations.getStatistics({ selectedMonth, selectedYear }));
    }
  }, [dispatch, selectedMonth, selectedYear]);

  const statsCosts = useSelector(statisticsSelectors.statisticMinus);
  const statsIncomes = useSelector(statisticsSelectors.statisticPlus);
  const statisticTotalPerGroup = useSelector(statisticsSelectors.statisticTotal);
  const balance = useSelector(getBalance);
  const chartOpts = useMemo(() => helpers.prepareOptsForChart(statsCosts, statsIncomes), [
    statsCosts,
    statsIncomes,
  ]);
  const firstTransactionYear = useSelector(statisticsSelectors.firstTransactionYear);
  const hasScroll = !isMobile && statsCosts.length > 5;

  useScrollbar(statsListWrapper, hasScroll);

  const filtredMonthInRuss = filterOptions(monthInRussian, currentMonth);
  const filtredMonthInEng = filterOptions(monthsInEnglish, currentMonth);
  const yearsList = helpers.createStatsYearsList({
    firstTransactionYear,
    currentYear,
  });

  const isSelectedYearEqualCurrentYear = selectedYear === currentYear;

  let months;

  if (isSelectedYearEqualCurrentYear) {
    months = i18n.resolvedLanguage === "en" ? filtredMonthInEng : filtredMonthInRuss;
  } else {
    months = i18n.resolvedLanguage === "en" ? monthsInEnglish : monthInRussian;
  }

  const selectMonthHandler = (e) => {
    setSelectedMonth(e.value);
  };
  const selectYearHandler = (e) => {
    setSelectedYear(e.value);
  };

  return (
    <div className={s.box_statistics}>
      <div className={s.box_circle}>
        <p className={s.title_statistics}>{t("statisticsTitle")}</p>
        <div className={s.section} id={s.container}>
          {isNoData ? (
            <NoDataIcon className={s.noData} />
          ) : (
            <Donut data={chartOpts} balance={balance} />
          )}
        </div>
      </div>
      <div className={s.container_statistics}>
        <div className={s.box_data}>
          <StatisticsSelect
            options={months}
            statsSelectPlaceholder={t("statsMonthPlaceholder")}
            onChange={selectMonthHandler}
          />
          <StatisticsSelect
            options={yearsList}
            statsSelectPlaceholder={t("statsYearPlaceholder")}
            onChange={selectYearHandler}
          />
        </div>

        <div className={s.box_category_summa}>
          <p className={s.category}>{t("statisticsCategory")}</p>
          <p className={s.summa}>{t("statisticsAmounts")}</p>
        </div>

        <div className={s.list_statistics_wrapper} ref={statsListWrapper}>
          <ul className={s.list_statistics}>
            {statsCosts.map(({ category, color, minus }) => {
              return (
                <li key={color}>
                  <div style={{ background: color }} className={s.rectangle}></div>
                  <p className={s.info_statistics}>{category}</p>
                  <p>{minus}</p>
                </li>
              );
            })}
            {statsCosts.length === 0 &&
              statsIncomes.map(({ category, color, plus }) => {
                return (
                  <li key={color}>
                    <div style={{ background: color }} className={s.rectangle}></div>
                    <p className={s.info_statistics}>{category}</p>
                    <p>{plus}</p>
                  </li>
                );
              })}
          </ul>
        </div>
        <div className={s.info_statistics_summary}>
          <div className={s.info_statistics_summary_item}>
            <p className={s.info_statistics_expenses}>{t("statisticsOutcomes")}:</p>
            <p>{statisticTotalPerGroup[1]}</p>
          </div>

          <div className={s.info_statistics_summary_item}>
            <p className={s.info_statistics_income}>{t("statisticsIncomes")}:</p>
            <p>{statisticTotalPerGroup[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
