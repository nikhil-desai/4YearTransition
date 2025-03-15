// tests/GenderInput.test.jsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GenderInput } from '../src/index';

describe('GenderInput Component', () => {
  test('renders correct options for "republican" (default)', () => {
    render(
      <GenderInput
        onChange={() => {}}
        currentParty="republican"
        inputType="dropdown"
      />
    );
    // Republican should show only Male and Female
    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();

    expect(screen.getByRole('option', { name: 'Male' })).toBeInTheDocument();
    expect(screen.getByRole('option', { name: 'Female' })).toBeInTheDocument();

    const options = screen.getAllByRole('option');
    expect(options.length).toBe(2);
  });

  test('renders custom options for "democrat" with provided options', () => {
    const customOptions = ['Custom Male', 'Custom Female', 'Custom Non-Binary'];
    render(
      <GenderInput
        onChange={() => {}}
        currentParty="democrat"
        inputType="radio"
        democratGenderOptions={customOptions}
      />
    );
    customOptions.forEach((option) => {
      expect(screen.getByLabelText(option)).toBeInTheDocument();
    });
  });

  test('calls onChange handler when an option is selected', () => {
    const handleChange = jest.fn();
    render(
      <GenderInput
        onChange={handleChange}
        currentParty="democrat"
        inputType="radio"
      />
    );
    // Get a radio button (e.g., Male)
    const maleRadio = screen.getByLabelText('Male');
    fireEvent.click(maleRadio);

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(handleChange.mock.calls[0][0].target.value).toBe('Male');
  });

  test('applies custom styles correctly', () => {
    const customStyles = {
      container: { border: '2px solid green' },
      input: { marginRight: '20px' },
    };
    render(
      <GenderInput
        onChange={() => {}}
        currentParty="republican"
        inputType="radio"
        customStyles={customStyles}
      />
    );
    // Check container styles by targeting an element inside the container.
    const maleLabel = screen.getByLabelText('Male').parentElement;
    const container = maleLabel.parentElement;
    expect(container).toHaveStyle('border: 2px solid green');

    // Check that the input has custom marginRight style.
    const maleInput = screen.getByLabelText('Male');
    expect(maleInput).toHaveStyle('margin-right: 20px');
  });
});
