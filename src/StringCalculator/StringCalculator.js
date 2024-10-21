import React, { useState } from 'react';
import './StringCalculator.css'; // Optional CSS

const StringCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);

  const add = (numbers) => {
    if (numbers === '') return 0; // Handle empty input

    let delimiters = [',', '\n']; // Default delimiters

    // Handle custom delimiters
    if (numbers.startsWith('//')) {
      const delimiterEndIndex = numbers.indexOf('\n');
      const delimiterSection = numbers.substring(2, delimiterEndIndex);

      if (delimiterSection.startsWith('[') && delimiterSection.endsWith(']')) {
        // Multiple delimiters case, e.g., //[***][%%]
        delimiters = extractMultipleDelimiters(delimiterSection);
      } else {
        // Single custom delimiter case, e.g., //;\n
        delimiters = [delimiterSection];
      }

      numbers = numbers.substring(delimiterEndIndex + 1); // Remove the delimiter declaration line
    }

    // Split numbers manually using multiple delimiters
    const numArray = splitByDelimiters(numbers, delimiters);

    // Check for negative numbers
    const negativeNumbers = numArray.filter(num => parseInt(num) < 0);
    if (negativeNumbers.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(', ')}`);
    }

    // Sum all valid numbers
    return numArray.reduce((sum, num) => sum + (parseInt(num) || 0), 0);
  };

  // Helper function to extract multiple delimiters from format //[delim1][delim2]
  const extractMultipleDelimiters = (delimiterSection) => {
    const delimiters = [];
    let currentDelimiter = '';

    for (const char of delimiterSection) {
      if (char === '[') {
        currentDelimiter = ''; // Start collecting delimiter characters
      } else if (char === ']') {
        delimiters.push(currentDelimiter); // Add collected delimiter to the list
      } else {
        currentDelimiter += char; // Collect characters inside brackets
      }
    }
    return delimiters;
  };

  // Helper function to split the numbers string by multiple delimiters
  const splitByDelimiters = (numbers, delimiters) => {
    let result = [numbers]; // Start with the full string

    for (const delimiter of delimiters) {
      const temp = [];
      for (const part of result) {
        temp.push(...part.split(delimiter)); // Split each part by the current delimiter
      }
      result = temp;
    }

    return result.filter(Boolean); // Remove any empty strings
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setResult(add(input));
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="string-calculator">
      <div className="string-calculator-box">
        <h1>String Calculator</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter numbers with delimiters"
          />
          <button type="submit">Add</button>
        </form>
        <h2>Result: {result}</h2>
      </div>
    </div>
  );
};

export default StringCalculator;
