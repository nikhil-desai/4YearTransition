// src/components/GenderInput.jsx
import React from 'react';
import PropTypes from 'prop-types';

// Default styles with American red/white/blue colors.
const defaultStyles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    border: '2px solid #002868', // Blue border
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '4px',
  },
  input: {
    marginRight: '10px',
    accentColor: '#BF0A30', // Red accent for radio buttons (where supported)
  },
  select: {
    border: '1px solid #002868',
    borderRadius: '4px',
    padding: '5px',
    color: '#002868',
  },
  button: {
    backgroundColor: '#BF0A30', // Red
    color: '#fff',
    border: 'none',
    padding: '5px 10px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  },
};

const GenderInput = ({
  inputType = 'radio',            // 'radio' | 'dropdown' | 'buttonGroup'
  currentParty = 'republican',     // Developer sets the current political party.
  democratGenderOptions,           // Optional: custom gender options when currentParty is Democrat
  onChange,
  customStyles = {},
  name = 'gender',
  ...props
}) => {
  // Normalize the party value.
  const party = currentParty.toLowerCase();

  // Determine gender options based on the party.
  const options =
    party === 'democrat'
      ? (democratGenderOptions && Array.isArray(democratGenderOptions)
          ? democratGenderOptions
          : ['Male', 'Female', 'Non-Binary', 'Gender-Fluid', 'Prefer Not to Say'])
      : ['Male', 'Female'];

  // Merge default and custom styles.
  const styles = {
    container: { ...defaultStyles.container, ...customStyles.container },
    input: { ...defaultStyles.input, ...customStyles.input },
    select: { ...defaultStyles.select, ...customStyles.select },
    button: { ...defaultStyles.button, ...customStyles.button },
  };

  const renderInput = () => {
    if (inputType === 'radio') {
      return options.map(option => (
        <label key={option} style={{ marginRight: '10px' }}>
          <input
            style={styles.input}
            type="radio"
            name={name}
            value={option}
            onChange={onChange}
            {...props}
          />
          {option}
        </label>
      ));
    } else if (inputType === 'dropdown') {
      return (
        <select style={styles.select} name={name} onChange={onChange} {...props}>
          {options.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      );
    } else if (inputType === 'buttonGroup') {
      return options.map(option => (
        <button
          key={option}
          type="button"
          style={styles.button}
          onClick={() => onChange({ target: { value: option } })}
          {...props}
        >
          {option}
        </button>
      ));
    } else {
      return <div>Unsupported input type: {inputType}</div>;
    }
  };

  return <div style={styles.container}>{renderInput()}</div>;
};

GenderInput.propTypes = {
  inputType: PropTypes.oneOf(['radio', 'dropdown', 'buttonGroup']),
  currentParty: PropTypes.string,
  democratGenderOptions: PropTypes.arrayOf(PropTypes.string),
  onChange: PropTypes.func.isRequired,
  customStyles: PropTypes.object,
  name: PropTypes.string,
};

export default GenderInput;
