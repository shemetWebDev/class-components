import { Component } from 'react';
import SearchBlock from './SearchBlock';
import Bord from './Bord';
import ErrorBoundary from './ErrorBoundary';
import ErrorButton from './ErorrButton';

interface Pokemon {
  name: string;
}

interface MainState {
  listPokemons: Pokemon[];
  isLoading: boolean;
  firstSearch: boolean;
}

class Main extends Component<Record<string, never>, MainState> {
  constructor(props: Record<string, never>) {
    super(props);
    this.state = {
      listPokemons: [],
      isLoading: false,
      firstSearch: false,
    };
  }

  fetchResults = (query: string = '') => {
    this.setState({ isLoading: true, firstSearch: true });

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
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };

  componentDidMount() {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    if (savedQuery) {
      this.fetchResults(savedQuery);
    } else {
      this.fetchResults();
    }
  }

  render() {
    const { listPokemons, isLoading, firstSearch } = this.state;
    return (
      <>
        <ErrorBoundary>
          <SearchBlock onSearch={this.fetchResults} />
          {firstSearch && (
            <Bord listPokemons={listPokemons} isLoading={isLoading} />
          )}
          <ErrorButton />
        </ErrorBoundary>
      </>
    );
  }
}

export default Main;
