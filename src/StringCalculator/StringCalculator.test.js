import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'; // Optional for better matchers
import StringCalculator from './StringCalculator'; // Assuming both files are in the same directory

describe('StringCalculator Component', () => {

  test('renders the calculator with input and button', () => {
    render(<StringCalculator />);
    
    // Check if input and button are rendered
    expect(screen.getByPlaceholderText('Enter numbers separated by delimiters')).toBeInTheDocument();
    expect(screen.getByText('Add')).toBeInTheDocument();
  });

  test('displays correct result for valid inputs', () => {
    render(<StringCalculator />);
    
    // Simulate entering numbers in the input
    const input = screen.getByPlaceholderText('Enter numbers separated by delimiters');
    fireEvent.change(input, { target: { value: '1,2,3' } });

    // Simulate clicking the 'Add' button
    const button = screen.getByText('Add');
    fireEvent.click(button);
    
    // Check if result is displayed correctly
    expect(screen.getByText('Result: 6')).toBeInTheDocument();
  });

  test('handles input with new lines and spaces', () => {
    render(<StringCalculator />);
    
    const input = screen.getByPlaceholderText('Enter numbers separated by delimiters');
    fireEvent.change(input, { target: { value: '1\n2 3' } });

    const button = screen.getByText('Add');
    fireEvent.click(button);

    // Check if the result is correct
    expect(screen.getByText('Result: 6')).toBeInTheDocument();
  });

  test('handles custom delimiters correctly', () => {
    render(<StringCalculator />);
    
    const input = screen.getByPlaceholderText('Enter numbers separated by delimiters');
    fireEvent.change(input, { target: { value: '1;2|3:4' } });

    const button = screen.getByText('Add');
    fireEvent.click(button);

    expect(screen.getByText('Result: 10')).toBeInTheDocument();
  });

  test('throws error when negative numbers are included', () => {
    render(<StringCalculator />);
    
    const input = screen.getByPlaceholderText('Enter numbers separated by delimiters');
    fireEvent.change(input, { target: { value: '1,-2,3' } });

    const button = screen.getByText('Add');
    fireEvent.click(button);

    // Since we have an alert for error, mock it
    jest.spyOn(window, 'alert').mockImplementation(() => {});

    expect(window.alert).toHaveBeenCalledWith('Negative numbers not allowed');
  });

  test('ignores non-numeric inputs', () => {
    render(<StringCalculator />);
    
    const input = screen.getByPlaceholderText('Enter numbers separated by delimiters');
    fireEvent.change(input, { target: { value: '1,2,a,4' } });

    const button = screen.getByText('Add');
    fireEvent.click(button);

    // Should sum only numeric inputs and ignore the non-numeric ones
    expect(screen.getByText('Result: 7')).toBeInTheDocument();
  });

  test('returns 0 for empty input', () => {
    render(<StringCalculator />);
    
    const input = screen.getByPlaceholderText('Enter numbers separated by delimiters');
    fireEvent.change(input, { target: { value: '' } });

    const button = screen.getByText('Add');
    fireEvent.click(button);

    // Empty string should result in 0
    expect(screen.getByText('Result: 0')).toBeInTheDocument();
  });
});
