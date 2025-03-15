// src/components/genderInput.js

// Default styling (red, white, blue)
const defaultStyles = {
    container: 'font-family: Arial, sans-serif; border: 2px solid #002868; background-color: #fff; padding: 10px; border-radius: 4px;',
    input: 'margin-right: 10px; accent-color: #BF0A30;',
    select: 'border: 1px solid #002868; border-radius: 4px; padding: 5px; color: #002868;',
    button: 'background-color: #BF0A30; color: #fff; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer; margin-right: 10px;',
  };
  
  /**
   * createGenderInput - creates a gender input element.
   * @param {Object} options - configuration options.
   * @param {string} options.inputType - 'radio' | 'dropdown' | 'buttonGroup'
   * @param {string} [options.currentParty='republican'] - the current political party ('democrat' or 'republican')
   * @param {Array} [options.democratGenderOptions] - optional custom gender options for Democrat
   * @param {Function} options.onChange - callback when value changes
   * @param {Object} [options.customStyles] - custom CSS styles for container, input, select, button
   * @param {string} [options.name='gender'] - name attribute for the input
   * @returns {HTMLElement} the container element with the input(s)
   */
  function createGenderInput({
    inputType = 'radio',
    currentParty = 'republican',
    democratGenderOptions,
    onChange,
    customStyles = {},
    name = 'gender',
  }) {
    const party = currentParty.toLowerCase();
  
    // Determine gender options based on the party.
    const genderOptions =
      party === 'democrat'
        ? (democratGenderOptions && Array.isArray(democratGenderOptions)
            ? democratGenderOptions
            : ['Male', 'Female', 'Non-Binary', 'Gender-Fluid', 'Prefer Not to Say'])
        : ['Male', 'Female'];
  
    // Merge default and custom styles.
    const styles = {
      container: customStyles.container || defaultStyles.container,
      input: customStyles.input || defaultStyles.input,
      select: customStyles.select || defaultStyles.select,
      button: customStyles.button || defaultStyles.button,
    };
  
    // Create container element.
    const container = document.createElement('div');
    container.setAttribute('style', styles.container);
  
    // Helper to trigger onChange callback.
    const handleChange = value => {
      if (typeof onChange === 'function') {
        onChange({ target: { value } });
      }
    };
  
    if (inputType === 'radio') {
      genderOptions.forEach(option => {
        const label = document.createElement('label');
        label.style.marginRight = '10px';
  
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = name;
        input.value = option;
        input.setAttribute('style', styles.input);
        input.addEventListener('change', () => handleChange(option));
  
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        container.appendChild(label);
      });
    } else if (inputType === 'dropdown') {
      const select = document.createElement('select');
      select.name = name;
      select.setAttribute('style', styles.select);
      genderOptions.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        select.appendChild(opt);
      });
      select.addEventListener('change', e => handleChange(e.target.value));
      container.appendChild(select);
    } else if (inputType === 'buttonGroup') {
      genderOptions.forEach(option => {
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute('style', styles.button);
        button.textContent = option;
        button.addEventListener('click', () => handleChange(option));
        container.appendChild(button);
      });
    } else {
      const errorMsg = document.createElement('div');
      errorMsg.textContent = `Unsupported input type: ${inputType}`;
      container.appendChild(errorMsg);
    }
  
    return container;
  }
  
  export { createGenderInput };
  