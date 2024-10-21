import React, { useState } from 'react';
import './StringCalculator.css'; // Import the CSS for styling

const StringCalculator = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(0);

    function addNumbersInString(str) {
      
      
      const delimiters = [',', ';', ' ', '\t', '\n', '|', ':'];
    
      
      const regex = new RegExp(delimiters.join('|'), 'g');
    
      
      const parts = str.split(regex);
    
      if( parts.includes('-')){
        throw new Error(`Negative numbers not allowed `);
      }else{

    
      const numbers = parts
        .filter(part => part.trim() !== '') 
        .map(Number) 
        .filter(num => !isNaN(num)); 
      
      const sum = numbers.reduce((acc, num) => acc + num, 0);
    
      return sum;
      }
    
    }
    const handleSubmit = (e) => {
    e.preventDefault();
    try {
      setResult(addNumbersInString(input));
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
          placeholder="Enter numbers separated by delimiters" 
        />
        <button type="submit">Add</button>
      </form>
      <h2>Result: {result}</h2>
    </div>
  );
};

export default StringCalculator;