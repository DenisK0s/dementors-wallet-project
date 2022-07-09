import s from "./Money.module.css";
import { useTranslation } from "react-i18next";
const TableHeader = () => {
  const { t } = useTranslation();
  return (
    <thead className={`${s.tableRow} ${s.tableRowHeader}`}>
      <tr className={s.tableCell}>
        <td>{t("currency")}</td>
      </tr>
      <tr className={s.tableCell}>
        <td>{t("currencyPurchase")}</td>
      </tr>
      <tr className={s.tableCell}>
        <td>{t("currencySale")}</td>
      </tr>
    </thead>
  );
};

export default TableHeader;
