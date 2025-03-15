# 4YearTransition

**4YearTransition** is an npm package that provides a set of form input components for selecting gender/sex. The component displays different options based on the current political party (set by the developer). When the current party is set to "republican" (default), only basic options (Male, Female) are shown; when set to "democrat", more inclusive options are displayed (with the ability to override or add custom gender options).

The package supports both **React** components and a **Vanilla JavaScript** function, along with customizable styles (defaulting to red/white/blue “America” colors).

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [React Version](#react-version)
  - [Vanilla JavaScript Version](#vanilla-javascript-version)
- [Props and Options](#props-and-options)
- [Custom Styling](#custom-styling)
- [Testing](#testing)
- [Publishing](#publishing)
- [License](#license)

## Installation

Install the package via npm:

```bash
npm install 4yeartransition
Note: Make sure your project uses a compatible version of React if you want to use the React component.

Usage
React Version
Import the GenderInput component from the package:

jsx
Copy
Edit
import React, { useState } from 'react';
import { GenderInput } from '4yeartransition';

function App() {
  const [selectedGender, setSelectedGender] = useState('');

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  return (
    <div>
      <h1>Select Gender</h1>
      <GenderInput
        currentParty="democrat" // Set to "republican" or "democrat"
        inputType="radio"       // Options: "radio", "dropdown", "buttonGroup"
        onChange={handleGenderChange}
        // Optionally provide custom gender options for Democrat:
        democratGenderOptions={[
          'Male',
          'Female',
          'Non-Binary',
          'Genderqueer', // custom option
          'Agender',
          'Prefer Not to Say'
        ]}
        // Optionally override default styles:
        customStyles={{
          container: { border: '2px solid #002868' },
          input: { marginRight: '10px' }
        }}
      />
      <p>Selected: {selectedGender}</p>
    </div>
  );
}

export default App;
Vanilla JavaScript Version
You can also use the package in a non-React project. Import the createGenderInput function and attach the generated element to your DOM.

html
Copy
Edit
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Gender Input Example</title>
</head>
<body>
  <div id="form-container"></div>
  <script type="module">
    import { createGenderInput } from '4yeartransition';

    function handleGenderChange(event) {
      console.log('Selected gender:', event.target.value);
    }

    const genderInputEl = createGenderInput({
      inputType: 'dropdown',       // Options: "radio", "dropdown", "buttonGroup"
      currentParty: 'democrat',    // "republican" or "democrat"
      democratGenderOptions: [
        'Male',
        'Female',
        'Non-Binary',
        'Genderqueer',  // custom option
        'Agender',
        'Prefer Not to Say'
      ],
      onChange: handleGenderChange,
      name: 'gender',
      customStyles: {
        container: 'border: 2px solid #002868; padding: 10px;',
        select: 'border: 1px solid #002868; padding: 5px;'
      }
    });

    document.getElementById('form-container').appendChild(genderInputEl);
  </script>
</body>
</html>
Props and Options
For the React Component (GenderInput)
currentParty (string):
Set the current political party. Accepted values: "republican" or "democrat".
Default: "republican"

inputType (string):
Determines the type of input displayed. Options include:

"radio"
"dropdown"
"buttonGroup"
democratGenderOptions (array of strings):
When currentParty is set to "democrat", these options will override the default list.

onChange (function, required):
Callback function that gets called when an option is selected.

customStyles (object):
An object to override default styling. You can provide styles for:

container
input
select
button
name (string):
The name attribute for the input elements.
Default: "gender"

For the Vanilla JS Function (createGenderInput)
Accepts an options object with the same properties as above:

currentParty
inputType
democratGenderOptions
onChange
customStyles
name
Custom Styling
Both implementations come with default styling that uses red, white, and blue colors. You can override these defaults by passing your own CSS styles via the customStyles prop (React) or option (Vanilla JS).

Example for React:

jsx
Copy
Edit
customStyles={{
  container: { border: '3px solid green' },
  input: { marginRight: '15px' }
}}
Testing
Tests have been written using Jest and React Testing Library for the React component and Jest (with a jsdom environment) for the Vanilla JS implementation. To run tests, use:

bash
Copy
Edit
npm test
For more details, check the tests directory in the repository.

