import s from './Money.module.css';
import { ReactComponent as Wolna } from '../../assets/images/icons/wolna.svg';
export default function Svg() {
  return (
    <div className={s.wolna}>
      <Wolna className={s.wolna} />
    </div>
  );
}
