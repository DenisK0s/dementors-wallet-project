import { useMediaQuery } from 'react-responsive';
import { Link } from 'react-router-dom';
import s from './Logo.module.css';

import { ReactComponent as LogoDesktop } from '../../assets/images/icons/logo.svg';
import { ReactComponent as LogoMobile } from '../../assets/images/icons/logoMobile.svg';

export default function LogoComponent() {
  const isMobileOrTablet = useMediaQuery({ query: '(min-width: 768px)' });
  return (
    <>
      {isMobileOrTablet ? (
        <div className={s.logo}>
          <Link to="/" style={{ textDecoration: 'none', color: 'unset' }}>
            <LogoDesktop />
          </Link>
        </div>
      ) : (
        <div className={s.logo}>
          <Link to="/" style={{ textDecoration: 'none', color: 'unset' }}>
            <LogoMobile />
          </Link>
        </div>
      )}
    </>
  );
}
