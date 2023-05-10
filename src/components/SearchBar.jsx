import PropTypes from "prop-types";
import searchsvg from "../assets/magnifying-glass-solid.svg";

const SearchBar = ({ value, onChange, errors = {} }) => {

  const styleError = {
    width: "100%",
    border: errors.errors && "1px solid transparent",
    borderColor: errors.errors && "#ff5148",
    color: errors.errors && "#ff5148",
  };

  const styleInput = {
    color: "white",
    backgroundImage: `url('${searchsvg}')`,
    backgroundPosition: "1em",
    backgroundRepeat: "no-repeat",
    paddingLeft: "40px",
    backgroundSize: "10% auto",
    // add a conditional style for the placeholder
    ".error::placeholder": {
      color: errors.errors ? "green" : "#red",
    },
  };

  return (
    <input
      className={errors.errors ? "error" : ""}
      type="text"
      value={value}
      name="searchValue"
      onChange={onChange}
      placeholder={
        errors.errors ? errors.errors + "!!" : "Avengers, John Wick, Avatar..."
      }
      style={{ ...styleInput, ...styleError }}
    />
  );
};

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object,
};

export default SearchBar;
