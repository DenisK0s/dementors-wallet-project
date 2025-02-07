import Select, { components } from "react-select";
import CustomIdicatorArrowIcon from "../utils/CustomIdicatorArrowIcon";

export default function CurrencySelect({ onChange, options, currencySelectPlaceholder, value }) {
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        {<CustomIdicatorArrowIcon width="10px" height="10px" stroke="#fff" />}
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
    indicatorsContainer: (_, { selectProps: { noOptions } }) => ({
      display: noOptions ? "none" : "block",
      width: "20px",
      height: "20px",
      marginTop: "-14px",
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
      height: "40px",
      color: "var(--green-color)",
      border: "1px solid #fff",
      boxSizing: "border-box",
      borderRadius: "50%",
      textAlign: "center",
      "&:hover": {
        cursor: "pointer",
      },
    }),
    placeholder: (_, { selectProps: { noOptions } }) => ({
      color: "var(--green-color)",
      position: "absolute",
      marginTop: "2px",
      paddingLeft: noOptions ? "20px" : "13px",
      fontWeight: "400",
      fontSize: "16px",
    }),
    singleValue: () => ({
      position: "absolute",
      paddingLeft: "13px",
      fontSize: "16px",
    }),
    option: (provided) => ({
      ...provided,
      textAlign: "left",
      fontSize: "16px",
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

  return (
    <Select
      components={{ DropdownIndicator }}
      options={options}
      noOptions={!options ? true : false}
      styles={customStyles}
      value={value}
      placeholder={value}
      isDisabled={!options ? true : false}
      onChange={(e) => {
        onChange(e);
      }}
      isSearchable={false}
    />
  );
}
