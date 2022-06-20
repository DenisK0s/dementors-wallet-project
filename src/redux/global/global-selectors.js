const isLoadingSpinner = (state) => state.global.isLoading;
const isData = (state) => state.global.isData;
const isModalOpen = (state) => state.global.isModalOpen;
const isModalAddTransactionOpen = (state) => state.global.isModalAddTransactionOpen;
const isModalLogOutOpen = (state) => state.global.isModalLogOutOpen;
const lang = (state) => state.global.isEnglishVersion;
const isloginVerificationModalOpen = (state) => state.global.isloginVerificationModalOpen;
const globalSelectors = {
  isLoadingSpinner,
  isModalOpen,
  isModalAddTransactionOpen,
  isModalLogOutOpen,
  lang,
  isData,
  isloginVerificationModalOpen,
};
export default globalSelectors;
