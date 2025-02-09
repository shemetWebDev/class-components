import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Card from './Card';

describe('Card Component', () => {
  const name = 'Bulbasaur';
  const url = 'https://pokeapi.co/api/v2/pokemon/1/';

  test('clicking on the card triggers an API call', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      json: jest.fn().mockResolvedValueOnce({ name: 'Bulbasaur', id: 1 }),
    });

    render(
      <MemoryRouter>
        <Card name={name} url={url} />
      </MemoryRouter>
    );

    const linkElement = screen.getByRole('link');
    fireEvent.click(linkElement);
  });
});
