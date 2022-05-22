const { createAction } = require('@reduxjs/toolkit');

const openModal = createAction('modal/openModal');
const closeModal = createAction('modal/closeModal');

const changeLanguage = createAction('language/changeLanguage');

const modalLogOutOpen = createAction('modal/modalLogOutOpen');
const modalLogOutClose = createAction('modal/modalLogOutClose');

const modalAddTransactionOpen = createAction('modal/modalAddTransactionOpen');
const modalAddTransactionClose = createAction('modal/modalAddTransactionClose');

const loginVerificationModal = createAction('language/loginVerificationModal');
const modalActions = {
  openModal,
  closeModal,
  modalAddTransactionOpen,
  modalAddTransactionClose,
  modalLogOutOpen,
  modalLogOutClose,
  changeLanguage,
  loginVerificationModal,
};
export default modalActions;
