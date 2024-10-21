// App.test.js
import { render, screen } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom/extend-expect'; // for extra matchers

describe('App Component', () => {
  test('renders StringCalculator component', () => {
    render(<App />);

    // Assuming the StringCalculator has some text or element that can be selected to confirm rendering
    // Replace 'enter numbers' with an actual placeholder or other identifiable text in StringCalculator
    const stringCalculatorInput = screen.getByPlaceholderText(/enter numbers/i);
    
    expect(stringCalculatorInput).toBeInTheDocument();
  });
});
