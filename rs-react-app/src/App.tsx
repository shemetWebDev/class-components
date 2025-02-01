import { Component } from 'react';

import Header from './components/header';
import Footer from './components/footer';
import SearchBlock from './components/SearchBlock';
import Bord from './components/Bord';
import ErrorBoundary from './components/ErrorBoundary';

interface AppState{ 
  listPokemons: { name: string; description?: string }[];
  isLoading: boolean;
  error: string | null;
}

class App extends Component<{},AppState> {
  constructor(props: {}) {
    super(props);
    this.state = {
      listPokemons: [],
      isLoading: false,
      error: null,
    };
  }

  fetchResults = (query: string = '') => {
    this.setState({ isLoading: true, error: null });

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=10&offset=0`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Ошибка запроса к API');
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ listPokemons: data.results, isLoading: false });
      })
      .catch((error) => {
        this.setState({ error: error.message, isLoading: false });
      });
  };

  componentDidMount() {
    const savedQuery = localStorage.getItem('searchQuery') || '';
    this.fetchResults(savedQuery);
  }

  render(): JSX.Element {
    return (
      <ErrorBoundary>
        <Header />
        <SearchBlock onSearch={this.fetchResults} />
        <Bord />
        <Footer />
      </ErrorBoundary>
    );
  }
}

export default App;
