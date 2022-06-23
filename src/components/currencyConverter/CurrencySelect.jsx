import Select, { components } from "react-select";
import CustomIdicatorArrowIcon from "../utils/CustomIdicatorArrowIcon";

export default function CurrencySelect({
  onChange,
  options,
  currencySelectPlaceholder,
  defaultValue,
}) {
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <CustomIdicatorArrowIcon width="10px" height="10px" stroke="#fff" />
      </components.DropdownIndicator>
    );
  };
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: "100%",
      backgroundColor: "rgba(255,255,255)",
      backdropFilter: "blur(8px)",
      zIndex: "2",
      borderRadius: "30px",
    }),
    indicatorsContainer: () => ({
      width: "20px",
      height: "20px",
      marginTop: "-15px",
      marginRight: "10px",
    }),
    dropdownIndicator: () => ({
      width: "20px",
      height: "20px",
      padding: 0,
      paddingTop: "8px",
    }),
    control: () => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "50px",
      border: "1px solid #fff",
      boxSizing: "border-box",
      borderRadius: "50%",
      textAlign: "center",
    }),
    placeholder: () => ({
      color: "var(--primary-text-color)",
      position: "absolute",
      paddingLeft: "20px",
      fontWeight: "400",
      fontSize: "18px",
    }),
    singleValue: () => ({
      position: "absolute",
      paddingLeft: "20px",
      fontSize: "18px",
    }),
    option: (provided) => ({
      ...provided,
      textAlign: "left",
      fontSize: "18px",
      backgroundColor: "transparent",
      color: "inherit",
      padding: "20px",

      "&:hover": {
        color: "#ff6596",
        backgroundColor: "#fff",
        borderRadius: "30px",
        boxShadow: "0 5px 5px -5px rgba(0, 0, 0, 0.3)",
      },
      "&:active": {
        color: "#ff6596",
        backgroundColor: "#fff",
        borderRadius: "30px",
      },
      "&:focus": {
        color: "#ff6596",
        backgroundColor: "#fff",
        borderRadius: "30px",
      },
    }),
  };

  console.log(defaultValue);
  return (
    <Select
      components={{ DropdownIndicator }}
      options={options}
      styles={customStyles}
      defaultValue={defaultValue}
      placeholder={defaultValue}
      onChange={(e) => {
        onChange(e);
      }}
      isSearchable={false}
      // menuIsOpen
    />
  );
}
