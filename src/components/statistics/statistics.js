import s from "components/statistics/statistics.module.css";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import statisticsOperations from "redux/statistics/statistics-operations";
import statisticsSelectors from "redux/statistics/statistics-selectors";
import monthInRussian from "../../data/monthInRussian.json";
import monthsInEnglish from "../../data/monthsInEnglish.json";
import helpers from "../../helpers";
import Donut from "./doughnut";
import StatisticsSelect from "./StatisticsSelect";

const { currentMonth, currentYear } = helpers.getCurrentMonthYear();

const yearsList = helpers.createStatsYearsList({
  currentYear,
});
console.log(yearsList);
const sortedMonthInRuss = monthInRussian.filter(
  (_, idx) => idx + 1 <= currentMonth
);

const sortedMonthInEng = monthsInEnglish.filter(
  (_, idx) => idx + 1 <= currentMonth
);

export default function Statistics() {
  const dispatch = useDispatch();
  const statistics = useSelector(statisticsSelectors.statisticMinus);
  const balance = useSelector(statisticsSelectors.statisticTotal);
  const { t, i18n } = useTranslation();

  let months;

  // if (condition) {
  //   months = i18n.resolvedLanguage === "en" ? monthsInEnglish : monthInRussian;
  // }

  useEffect(() => {
    dispatch(statisticsOperations.getStatistics());
  }, [dispatch]);
  return (
    <div className={s.box_statistics}>
      <div className={s.box_circle}>
        <p className={s.title_statistics}>{t("statisticsTitle")}</p>
        <div className={s.section} id={s.container}>
          <Donut />
        </div>
      </div>
      <div className={s.container_statistics}>
        <div className={s.box_data}>
          <StatisticsSelect
            options={months}
            statsSelectPlaceholder={t("statsMonthPlaceholder")}
          />
          <StatisticsSelect
            statsSelectPlaceholder={t("statsYearPlaceholder")}
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
