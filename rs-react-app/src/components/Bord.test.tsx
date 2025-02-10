import '@testing-library/jest-dom'; // Добавьте этот импорт
import { render, screen } from '@testing-library/react';
import Bord from './Bord';
jest.mock('./CardList', () => {
  return function DummyCardList({ listPokemons }: { listPokemons: { name: string; url: string }[] }) {
    return (
      <div>
        {listPokemons.map((pokemon) => (
          <div key={pokemon.url}>{pokemon.name}</div>
        ))}
      </div>
    );
  };
});

describe('Bord Component', () => {
  it('should display loading message when isLoading is true', () => {
    render(<Bord listPokemons={[]} isLoading={true} />);
    expect(screen.getByText('Загрузка...')).toBeInTheDocument();
  });

  it('should display no results message when listPokemons is empty', () => {
    render(<Bord listPokemons={[]} isLoading={false} />);
    expect(screen.getByText('Нет результатов по вашему запросу.')).toBeInTheDocument();
  });

  it('should display list of pokemons when listPokemons is not empty and not loading', () => {
    const mockPokemons = [
      { name: 'Pikachu', url: '1' },
      { name: 'Bulbasaur', url: '2' },
    ];

    render(<Bord listPokemons={mockPokemons} isLoading={false} />);
    expect(screen.getByText('Pikachu')).toBeInTheDocument();
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
  });
});
