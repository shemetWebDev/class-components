import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CardList from './CardList';
import { MemoryRouter } from 'react-router-dom';

describe('CardList Component', () => {
  const mockPokemons = [
    { name: 'Bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
    { name: 'Charmander', url: 'https://pokeapi.co/api/v2/pokemon/4/' },
  ];

  test('renders a list of Pokémon cards', () => {
    render(
      <MemoryRouter>
        <CardList listPokemons={mockPokemons} />
      </MemoryRouter>
    );

    // Проверяем, что каждый покемон отобразился
    expect(screen.getByText('Bulbasaur')).toBeInTheDocument();
    expect(screen.getByText('Charmander')).toBeInTheDocument();
  });
});
