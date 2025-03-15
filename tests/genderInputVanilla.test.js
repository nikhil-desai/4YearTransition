// tests/genderInputVanilla.test.js
/**
 * @jest-environment jsdom
 */
import { createGenderInput } from '../src/index';

describe('createGenderInput (Vanilla JS)', () => {
  test('renders correct options for "republican" (default) as a dropdown', () => {
    const onChange = jest.fn();
    const element = createGenderInput({
      inputType: 'dropdown',
      currentParty: 'republican',
      onChange,
    });
    document.body.appendChild(element);

    const select = element.querySelector('select');
    expect(select).not.toBeNull();

    const options = select.querySelectorAll('option');
    expect(options.length).toBe(2);
    expect(options[0].textContent).toBe('Male');
    expect(options[1].textContent).toBe('Female');
  });

  test('renders custom options for "democrat" when provided as radios', () => {
    const onChange = jest.fn();
    const customOptions = ['Custom Male', 'Custom Female', 'Custom Non-Binary'];
    const element = createGenderInput({
      inputType: 'radio',
      currentParty: 'democrat',
      democratGenderOptions: customOptions,
      onChange,
    });
    document.body.appendChild(element);

    customOptions.forEach((option) => {
      // Check if a label exists that includes the custom option
      const label = Array.from(element.querySelectorAll('label')).find((l) =>
        l.textContent.includes(option)
      );
      expect(label).toBeTruthy();
    });
  });

  test('calls onChange when an option is selected using buttonGroup', () => {
    const onChange = jest.fn();
    const element = createGenderInput({
      inputType: 'buttonGroup',
      currentParty: 'republican',
      onChange,
    });
    document.body.appendChild(element);

    const button = element.querySelector('button');
    button.click();
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.value).toBe('Male');
  });

  test('applies custom styles correctly', () => {
    const onChange = jest.fn();
    const customStyles = {
      container: 'border: 3px solid purple;',
      button: 'background-color: yellow;',
    };
    const element = createGenderInput({
      inputType: 'buttonGroup',
      currentParty: 'republican',
      onChange,
      customStyles,
    });
    document.body.appendChild(element);

    // Check container's style attribute
    expect(element.getAttribute('style')).toContain('border: 3px solid purple;');

    // Check first button style
    const button = element.querySelector('button');
    expect(button.getAttribute('style')).toContain('background-color: yellow;');
  });
});
