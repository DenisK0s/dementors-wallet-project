import s from "components/statistics/statistics.module.css";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import statisticsOperations from "redux/statistics/statistics-operations";
import statisticsSelectors from "redux/statistics/statistics-selectors";
import monthInRussian from "../../data/monthInRussian.json";
import monthsInEnglish from "../../data/monthsInEnglish.json";
import helpers from "../../helpers";
import Donut from "./Doughnut";
import StatisticsSelect from "./StatisticsSelect";
import { ReactComponent as NoDataIcon } from "../../assets/images/icons/no-data-amico.svg";
import { CSSTransition } from "react-transition-group";
import animationStyles from "../../assets/css/appearAnimation2.module.css";

const { currentMonth, currentYear } = helpers.getCurrentMonthYear();

const filterOptions = (opts) => {
  return opts.filter((_, idx) => idx + 1 <= currentMonth);
};

export default function Statistics() {
  const correctedCurrentMonth = currentMonth.toString().padStart(2, "0");
  const [selectedMonth, setSelectedMonth] = useState(correctedCurrentMonth);
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const statistics = useSelector(statisticsSelectors.statisticMinus);
  const balance = useSelector(statisticsSelectors.statisticTotal);
  const isNoData = useSelector(statisticsSelectors.isNoData);

  const firstTransactionYear = useSelector(
    statisticsSelectors.firstTransactionYear
  );

  // console.log(selectedMonth, "selectedMonth");
  // console.log(correctedCurrentMonth, "correctedCurrentMonth");

  const filtredMonthInRuss = filterOptions(monthInRussian);
  const filtredMonthInEng = filterOptions(monthsInEnglish);
  const yearsList = helpers.createStatsYearsList({
    firstTransactionYear,
    currentYear,
  });

  const isSelectedYearEqualCurrentYear = selectedYear === currentYear;

  let months;

  if (isSelectedYearEqualCurrentYear) {
    months =
      i18n.resolvedLanguage === "en" ? filtredMonthInEng : filtredMonthInRuss;
  } else {
    months = i18n.resolvedLanguage === "en" ? monthsInEnglish : monthInRussian;
  }

  const selectMonthHandler = (e) => {
    setSelectedMonth(e.value);
  };
  const selectYearHandler = (e) => {
    setSelectedYear(e.value);
  };

  useEffect(() => {
    dispatch(
      statisticsOperations.getStatistics({ selectedMonth, selectedYear })
    );
  }, [dispatch, selectedMonth, selectedYear]);

  return (
    <div className={s.box_statistics}>
      <div className={s.box_circle}>
        <p className={s.title_statistics}>{t("statisticsTitle")}</p>
        <div className={s.section} id={s.container}>
        {isNoData ? <CSSTransition
          in={isNoData}
          timeout={1200}
          classNames={animationStyles}
          unmountOnExit
        ><NoDataIcon className={s.noData}/>
        </CSSTransition> : <Donut />}
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
              {t("statisticsOutcomes")}:
            </p>
            <p>{balance[1]}</p>
          </li>

          <li>
            <p className={s.info_statistics_income}>
              {t("statisticsIncomes")}:
            </p>
            <p>{balance[0]}</p>
          </li>
        </ul>
      </div>
    </div>
  );
}
