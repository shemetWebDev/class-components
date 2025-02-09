import { useState, useEffect } from 'react';
import ErrorBoundary from './ErrorBoundary';
import SearchBlock from './SearchBlock';
import Bord from './Bord';
import ErrorButton from './ErorrButton';

interface Pokemon {
  name: string;
}

interface MainState {
  listPokemons: Pokemon[];
  isLoading: boolean;
  firstSearch: boolean;
}

function Main() {
  const [state, setState] = useState<MainState>({
    listPokemons: [],
    isLoading: false,
    firstSearch: false,
  });

  function fetchResults(query: string = '') {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      firstSearch: true,
    }));

    fetch('https://pokeapi.co/api/v2/pokemon?limit=10&offset=0')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка запроса к API');
        }
        return response.json();
      })
      .then((data) => {
        let filteredPokemons = data.results as Pokemon[];

        if (query) {
          filteredPokemons = filteredPokemons.filter((pokemon) =>
            pokemon.name.toLowerCase().includes(query.toLowerCase())
          );
        }

        setState((prevState) => ({
          ...prevState,
          listPokemons: filteredPokemons,
          isLoading: false,
        }));
      })
      .catch(() => {
        setState((prevState) => ({ ...prevState, isLoading: false }));
      });
  }

  useEffect(() => {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    fetchResults(savedQuery);
  }, []);

  return (
    <>
      <ErrorBoundary>
        <SearchBlock onSearch={fetchResults} />
        {state.firstSearch && (
          <Bord listPokemons={state.listPokemons} isLoading={state.isLoading} />
        )}
        <ErrorButton />
      </ErrorBoundary>
    </>
  );
}

export default Main;
