import { render, fireEvent } from '@testing-library/react';
import ErrorButton from './ErorrButton';

test('throws an error when clicked', () => {
  const { getByText } = render(<ErrorButton />);
  const button = getByText('Click me');
  expect(() => {
    fireEvent.click(button);
  }).toThrow('Fake Error');
});
