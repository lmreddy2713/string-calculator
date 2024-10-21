// StringCalculator.test.js
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StringCalculator from './StringCalculator';

describe('StringCalculator', () => {
  
  test('should return 0 for an empty string', () => {
    render(<StringCalculator />);
    fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), { target: { value: '' } });
    fireEvent.click(screen.getByText(/Add/i));
    expect(screen.getByText(/Result: 0/i)).toBeInTheDocument();
  });

  test('should return the number for a single number', () => {
    render(<StringCalculator />);
    fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), { target: { value: '1' } });
    fireEvent.click(screen.getByText(/Add/i));
    expect(screen.getByText(/Result: 1/i)).toBeInTheDocument();
  });

  test('should return the sum for two numbers', () => {
    render(<StringCalculator />);
    fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), { target: { value: '1,5' } });
    fireEvent.click(screen.getByText(/Add/i));
    expect(screen.getByText(/Result: 6/i)).toBeInTheDocument();
  });

  test('should handle new lines between numbers', () => {
    render(<StringCalculator />);
    fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), { target: { value: '1\n2,3' } });
    fireEvent.click(screen.getByText(/Add/i));
    expect(screen.getByText(/Result: 6/i)).toBeInTheDocument();
  });

  test('should handle different delimiters', () => {
    render(<StringCalculator />);
    fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), { target: { value: '//;\n1;2' } });
    fireEvent.click(screen.getByText(/Add/i));
    expect(screen.getByText(/Result: 3/i)).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), { target: { value: '//:\n1:2:3' } });
    fireEvent.click(screen.getByText(/Add/i));
    expect(screen.getByText(/Result: 6/i)).toBeInTheDocument();
  });

  test('should alert and not update the result for negative numbers', () => {
    window.alert = jest.fn(); // Mock alert
    render(<StringCalculator />);
    fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), { target: { value: '1,-2,3' } });
    fireEvent.click(screen.getByText(/Add/i));
    expect(window.alert).toHaveBeenCalledWith("negative numbers not allowed -2");
    expect(screen.getByText(/Result: 0/i)).toBeInTheDocument();
  });

  test('should alert for multiple negative numbers', () => {
    window.alert = jest.fn(); // Mock alert
    render(<StringCalculator />);
    fireEvent.change(screen.getByPlaceholderText(/Enter numbers/i), { target: { value: '1,-2,-3' } });
    fireEvent.click(screen.getByText(/Add/i));
    expect(window.alert).toHaveBeenCalledWith("negative numbers not allowed -2, -3");
    expect(screen.getByText(/Result: 0/i)).toBeInTheDocument();
  });
});
