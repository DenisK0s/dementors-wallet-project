import Select, { components } from 'react-select';
import IndicatorArrow from '../../assets/images/icons/categories.svg';
import ClearIcon from '../../assets/images/icons/close.svg';
import { useTranslation } from 'react-i18next';
// import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
// import categoriesSelectors from '../../redux/categories/categories-selectors';
export default function TransactionsCategoriesSelect({
  onChange,
  newCategory,
  lang,
  type,
  categories,
}) {
  const { t } = useTranslation();
  const options = () => {
    const takeLange = lang
      ? categories.categories.categoryList.en
      : categories.categories.categoryList.ru;
    const resultFormap = takeLange.filter(item => item.type === type);
    const result = resultFormap.map(item => {
      return { label: item.value, value: item.value };
    });
    return result;
  };

  const DropdownIndicator = props => {
    return (
      <components.DropdownIndicator {...props}>
        <img src={IndicatorArrow} alt="" width="20px" height="20px" />
      </components.DropdownIndicator>
    );
  };
  const ClearIndicator = props => {
    return (
      <components.ClearIndicator {...props}>
        <img src={ClearIcon} alt="" width="20px" height="20px" />
      </components.ClearIndicator>
    );
  };
  const IndicatorSeparator = props => {
    return (
      <components.IndicatorSeparator {...props}>
        <span></span>
      </components.IndicatorSeparator>
    );
  };
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: '100%',
      backgroundColor: 'rgba(255,255,255,0.5)',
      backdropFilter: 'blur(10px)',
    }),

    indicatorSeparator: () => ({
      marginTop: '4px',
      width: '1px',
      height: '18px',
      left: '-9px',
      position: 'absolute',
      backgroundColor: 'var(--placeholder-text-color)',
    }),

    indicatorsContainer: () => ({
      width: '20px',
      height: '20px',
      position: 'absolute',
      right: '8px',
      marginTop: '-26px',
    }),

    clearIndicator: () => ({
      width: '12px',
      height: '12px',
      position: 'absolute',
      padding: '0px',
      left: ' -30px',
      top: '7px',
    }),
    dropdownIndicator: () => ({
      width: '20px',
      height: '20px',
      padding: 0,
      paddingTop: '8px',
    }),

    control: () => ({
      width: '100%',
      borderBottom: '1px solid var(--placeholder-text-color)',
    }),

    placeholder: () => ({
      color: '#808080',
      position: 'absolute',
      paddingLeft: '10px',
      fontWeight: '400',
      fontSize: '18px',
    }),
    singleValue: () => ({
      position: 'absolute',
      paddingLeft: '10px',
      fontSize: '18px',
    }),

    input: () => ({
      textAlign: 'left',
    }),
    option: provided => ({
      ...provided,
      textAlign: 'left',
      fontSize: '18px',
      backgroundColor: 'transparent',
      color: 'inherit',
      padding: '20px',
      '&:hover': {
        color: '#ff6596',
        backgroundColor: '#fff',
      },
      '&:active': {
        color: '#ff6596',
        backgroundColor: '#fff',
      },
      '&:focus': {
        color: '#ff6596',
        backgroundColor: '#fff',
      },
    }),
  };

  return (
    <Select
      components={{ DropdownIndicator, ClearIndicator, IndicatorSeparator }}
      options={options()}
      styles={customStyles}
      isDisabled={newCategory}
      isClearable={true}
      placeholder={t('modalAddTransactionSelectPlaceholder')}
      onChange={e => {
        onChange(e);
      }}
    />
  );
}
TransactionsCategoriesSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
  newCategory: PropTypes.string.isRequired,
  lang: PropTypes.bool.isRequired,
};
