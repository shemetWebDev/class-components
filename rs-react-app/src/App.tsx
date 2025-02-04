import { Component } from 'react';

import Header from './components/Header';
import Footer from './components/Footer';
import SearchBlock from './components/SearchBlock';
import Bord from './components/Bord';
import ErrorBoundary from './components/ErrorBoundary';

interface Pokemon {
  name: string;
}

interface AppState {
  listPokemons: Pokemon[];
  isLoading: boolean;
  error: string | null;
  firstSearch: boolean;
}

class App extends Component<Record<string, never>, AppState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      listPokemons: [],
      isLoading: false,
      error: null,
      firstSearch: false,
    };
  }

  fetchResults = (query: string = '') => {
    this.setState({ isLoading: true, error: null, firstSearch: true });

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`)
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

        this.setState({ listPokemons: filteredPokemons, isLoading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, isLoading: false });
      });
  };

  render(): JSX.Element {
    const { listPokemons, isLoading, error, firstSearch } = this.state;
    return (
      <ErrorBoundary>
        <Header />
        <SearchBlock onSearch={this.fetchResults} />
        {firstSearch && (
          <Bord
            listPokemons={listPokemons}
            isLoading={isLoading}
            error={error}
          />
        )}
        <Footer />
      </ErrorBoundary>
    );
  }
}

export default App;
