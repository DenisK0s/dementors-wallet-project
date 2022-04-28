import { ModalLogOut } from 'components/modalLogOut';
import { ModalAddTransactions } from 'components/modalAddTransactions';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { useDispatch, useSelector } from 'react-redux';
import globalSelectors from 'redux/global/global-selectors';
import modalActions from '../../redux/global/global-actions';
import s from './Modal.module.css';
import LoginVerificationModal from 'components/loginVerificationModal/LoginVerificationModal';

const modalRoot = document.getElementById('modal-root');

export default function Modal({ lang, categoriesTest }) {
  const dispatch = useDispatch();
  const isModalOpen = useSelector(globalSelectors.isModalOpen);
  const isModalLogOutOpen = useSelector(globalSelectors.isModalLogOutOpen);

  const isAddTransactionModalOpen = useSelector(
    globalSelectors.isModalAddTransactionOpen,
  );
  const isLoginVerificationModalOpen = useSelector(
    globalSelectors.isloginVerificationModalOpen,
  );

  // отпимуємо єкшени для тоглінгу статусу модалки із редаксу
  const { closeModal } = modalActions;
  // openModal,
  // хендлер відкриття модалки
  //   const handleOpen = () => {
  //     dispatch(openModal());
  //   };
  const handleClose = () => {
    dispatch(closeModal());
  };
  const handleKeyDown = useCallback(
    e => {
      if (e.code === 'Escape') {
        dispatch(closeModal());
      }
    },
    [dispatch, closeModal],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return createPortal(
    <>
      <div
        className={
          isModalOpen ? classNames(s.modalWrap, s.modalWrapActive) : s.modalWrap
        }
        onClick={() => {
          handleClose();
        }}
      >
        <div
          className={s.exitModal}
          onClick={e => {
            e.stopPropagation();
          }}
        >
          {isModalLogOutOpen && <ModalLogOut handleClose={handleClose} />}
          {isAddTransactionModalOpen && (
            <ModalAddTransactions
              lang={lang}
              handleClose={handleClose}
              testCategory={categoriesTest}
            />
          )}
          {/* {isLoginVerificationModalOpen && (
            <LoginVerificationModal lang={lang} handleClose={handleClose} />
          )} */}
        </div>
      </div>
    </>,
    modalRoot,
  );
}
Modal.propTypes = {
  // categoriesTest: PropTypes.func.isRequired,
  lang: PropTypes.bool.isRequired,
};
