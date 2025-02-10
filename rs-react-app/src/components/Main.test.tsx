import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Main from './Main';
import '@testing-library/jest-dom'; // ✅ Импортируем матчеры

// Мокаем дочерние компоненты и задаём displayName
jest.mock('./SearchBlock', () => {
  const MockSearchBlock = () => <div data-testid="search-block" />;
  MockSearchBlock.displayName = 'MockSearchBlock';
  return MockSearchBlock;
});

jest.mock('./Bord', () => {
  const MockBord = () => <div data-testid="bord" />;
  MockBord.displayName = 'MockBord';
  return MockBord;
});

jest.mock('./ErorrButton', () => {
  const MockErrorButton = () => <div data-testid="error-button" />;
  MockErrorButton.displayName = 'MockErrorButton';
  return MockErrorButton;
});

describe('Main Component', () => {
  test('renders without crashing', () => {
    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    // Проверяем, что компоненты отрендерены
    expect(screen.getByTestId('search-block')).toBeInTheDocument();
    expect(screen.getByTestId('bord')).toBeInTheDocument();
    expect(screen.getByTestId('error-button')).toBeInTheDocument();
  });
});
