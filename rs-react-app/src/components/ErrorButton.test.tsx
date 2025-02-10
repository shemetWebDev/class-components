import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorButton from './ErorrButton';

describe('ErrorButton Component', () => {
  test('renders button correctly', () => {
    render(<ErrorButton />);
    expect(screen.getByText('Show Error')).toBeInTheDocument();
  });

  test('throws an error when clicked', () => {
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    render(<ErrorButton />);
    fireEvent.click(screen.getByText('Show Error'));
    expect(consoleError).toHaveBeenCalledWith('Fake Error');
    consoleError.mockRestore();
  });
});
