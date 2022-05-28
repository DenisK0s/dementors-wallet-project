import PropTypes from "prop-types";
import s from "./Transaction.module.css";

export default function Transaction({
  date,
  type,
  category,
  comment,
  amount,
  balance,
}) {
  const isPositive = type === "+";
  return (
    <>
      <td data-title="Date" className={s.table_cell}>
        {date}
      </td>
      <td data-title="Type" className={s.table_cell}>
        {type}
      </td>
      <td data-title="Category" className={s.table_cell}>
        {category}
      </td>
      <td data-title="Comment" className={s.table_cell}>
        {comment}
      </td>
      <td
        data-title="Amount"
        className={`${s.table_cell} + ${isPositive ? s.green : s.red}`}
      >
        {amount}
      </td>
      <td data-title="Balance" className={s.table_cell}>
        {balance}
      </td>
    </>
  );
}

Transaction.propTypes = {
  date: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  comment: PropTypes.string,
  amount: PropTypes.number.isRequired,
  balance: PropTypes.number.isRequired,
};
