import TableCell from './TableCell';
import s from './Money.module.css';
export default function TableRow({ date }) {
  return (
    <tr className={s.tr}>
      <TableCell date={date} />
    </tr>
  );
}
