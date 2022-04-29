import { Link } from 'react-router-dom';
import Container from 'components/сontainer';
import { ReactComponent as LogoIcon } from 'assets/images/icons/logo.svg';
import s from './Header.module.css';
import authSelectors from '../../redux/auth/auth-selectors';
import { ModalLogOutBtn } from 'components/modalLogOut';
import { useSelector } from 'react-redux';
import LangCheckbox from './LangCheckbox';

const Header = () => {
  const userName = useSelector(authSelectors.getUsername);
  return (
    <header className={s.header}>
      <Container>
        <div className={s.headerContainer}>
          <Link className={s.logoLink} to="/">
            <LogoIcon className={s.logoIcon} />
          </Link>
          <div className={s.rightContainerWrap}>
            <LangCheckbox />
            <span className={s.userName}>{userName}</span>
            <ModalLogOutBtn />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
