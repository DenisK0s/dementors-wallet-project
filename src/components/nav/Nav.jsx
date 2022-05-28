import { NavLink } from 'react-router-dom';
import { ReactComponent as HomeIcon } from 'assets/images/icons/home.svg';
import { ReactComponent as StatsIcon } from 'assets/images/icons/stats.svg';
import { ReactComponent as DollarIcon } from 'assets/images/icons/dollar.svg';
import s from './Nav.module.css';
import { useTranslation } from 'react-i18next';

const Nav = () => {
  const { t } = useTranslation();
  return (
    <nav className={s.nav}>
      <ul className={s.list}>
        <li className={s.item}>
          <NavLink
            to="/wallet/transactions"
            className={({ isActive }) =>
              [s.link, isActive ? s.active : ''].join(' ')
            }
          >
            <HomeIcon className={s.icon} />
            <span className={s.linkText}>{t('navHomeLink')}</span>
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink
            to="/wallet/stat"
            className={({ isActive }) =>
              [s.link, isActive ? s.active : ''].join(' ')
            }
          >
            <StatsIcon className={s.icon} />
            <span className={s.linkText}>{t('navStatisticsLink')}</span>
          </NavLink>
        </li>
        <li className={s.item}>
          <NavLink
            className={({ isActive }) =>
              [s.link, isActive ? s.active : ''].join(' ')
            }
            to="/wallet/exchange-rate"
          >
            <DollarIcon className={s.icon} />
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
