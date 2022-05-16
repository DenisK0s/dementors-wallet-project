import PropTypes from "prop-types";
import React from "react";
import Select, { components } from "react-select";
import IndicatorArrow from "../../assets/images/icons/categories.svg";

export default function StatisticsSelect({
  onChange,
  options,
  statsSelectPlaceholder,
}) {
  const DropdownIndicator = (props) => {
    return (
      <components.DropdownIndicator {...props}>
        <img src={IndicatorArrow} alt="" width="20px" height="20px" />
      </components.DropdownIndicator>
    );
  };
  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
      width: "100%",
      backgroundColor: "rgba(255,255,255,0.8)",
      backdropFilter: "blur(8px)",
      zIndex: "2",
      borderRadius: "30px",
    }),
    indicatorsContainer: () => ({
      width: "20px",
      height: "20px",
      position: "absolute",
      right: "20px",
      marginTop: "-8px",
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
      justifiContent: "center",
      width: "160px",
      height: "50px",
      border: "1px solid #000000",
      boxSizing: "border-box",
      borderRadius: "30px",
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
  return (
    <Select
      components={{ DropdownIndicator }}
      options={options}
      styles={customStyles}
      placeholder={statsSelectPlaceholder}
      onChange={(e) => {
        onChange(e);
      }}
      isSearchable={false}
      // menuIsOpen
    />
  );
}

StatisticsSelect.propTypes = {
  onChange: PropTypes.func.isRequired,
};
