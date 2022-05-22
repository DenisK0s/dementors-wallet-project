import s from './Money.module.css';

export default function TableCell({ date }) {
  const { ccy, buy, sale } = date;
  const round = value => {
    let result = Number(Math.round(value + 'e' + 2) + 'e-' + 2);
    if (result < 1) {
      result = `0${result}`;
    }
    return result;
  };
  return (
    <>
      <td>{ccy}</td>
      <td className={s.elemCentr}>{round(buy)}</td>
      <td>{round(sale)}</td>
    </>
  );
}
