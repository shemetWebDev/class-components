import { Component } from 'react';
import './styles/SearchBlock.css';

interface SearchProps {
  onSearch: (query: string) => void;
}

interface SearchState {
  query: string;
  searchHistory: string[];
  showHistory: boolean;
}

class SearchBlock extends Component<SearchProps, SearchState> {
  constructor(props: SearchProps) {
    super(props);
    this.state = {
      query: '',
      searchHistory: JSON.parse(localStorage.getItem('searchHistory') || '[]'), // Загружаем историю из localStorage
      showHistory: false,
    };
  }

  handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ query: event.target.value });
  };

  handleSearch = () => {
    const { query, searchHistory } = this.state;
    const trimmedQuery = query.trim();

    if (trimmedQuery && !searchHistory.includes(trimmedQuery)) {
      const newHistory = [...searchHistory, trimmedQuery];
      localStorage.setItem('searchHistory', JSON.stringify(newHistory));
      this.setState({ searchHistory: newHistory });
    }

    localStorage.setItem('searchQuery', trimmedQuery);
    this.setState({ query: '', showHistory: false });
    this.props.onSearch(trimmedQuery);
  };

  handleReset = () => {
    this.setState({ query: '', showHistory: false });
    localStorage.removeItem('searchQuery');
    this.props.onSearch('');
  };

  handleHistoryClick = (query: string) => {
    this.setState({ query });
    this.props.onSearch(query);
  };

  toggleHistory = (show: boolean) => {
    this.setState({ showHistory: show });
  };

  componentDidMount() {
    localStorage.removeItem('searchQuery');
    localStorage.removeItem('searchHistory');
  }

  render(): JSX.Element {
    const { query, searchHistory, showHistory } = this.state;

    return (
      <div className="search-bar">
        {showHistory && searchHistory.length > 0 && (
          <div className="search-history">
            <h4>История запросов:</h4>
            <ul>
              {searchHistory.map((item, index) => (
                <li key={index} onClick={() => this.handleHistoryClick(item)}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
        <input
          type="text"
          value={query}
          onChange={this.handleChange}
          placeholder="Введите поисковый запрос..."
          onFocus={() => this.toggleHistory(true)}
        />
        <button onClick={this.handleSearch}>Поиск</button>
        <button onClick={this.handleReset}>Сброс</button>
      </div>
    );
  }
}

export default SearchBlock;
