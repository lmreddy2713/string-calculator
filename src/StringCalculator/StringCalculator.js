import React, { useState } from 'react';
import './StringCalculator.css'; // Import the CSS for styling

const StringCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);

  const add = (numbers) => {
    if (numbers === '') return 0;

    const delimiters = [',', '\n'];
    let delimiter = delimiters;

    // Handle custom delimiter case
    if (numbers.startsWith('//')) {
      const delimiterEndIndex = numbers.indexOf('\n');
      delimiter = [numbers.substring(2, delimiterEndIndex)];
      numbers = numbers.substring(delimiterEndIndex + 1);
    }

    const regex = new RegExp(`[${delimiter.join('')}]`);
    const numArray = numbers.split(regex);

    // Handle negative numbers
    const negativeNumbers = numArray.filter(num => {
      const n = parseInt(num);
      return n < 0;
    });

    if (negativeNumbers.length > 0) {
      throw new Error(`Negative numbers not allowed: ${negativeNumbers.join(', ')}`);
    }

    // Calculate the sum
    return numArray.reduce((sum, num) => sum + (parseInt(num) || 0), 0);
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
      <h1>String Calculator</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Enter numbers separated by commas or new lines" 
        />
        <button type="submit">Add</button>
      </form>
      <h2>Result: {result}</h2>
    </div>
  );
};

export default StringCalculator;
