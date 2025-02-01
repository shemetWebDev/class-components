import { Component } from 'react';

interface SearchProps {
  onSearch: (query: string) => void;
}

interface SearchState {
  query: string;
}

class SearchBlock extends Component<SearchProps, SearchState> {
    constructor(props){
        super(props);
        const savedQuery = localStorage.getItem('searchQuery') || '';
        this.state = { query: savedQuery };
    }
        handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ query: event.target.value });
          };
    
          handleSearch = () => {
            const trimmedQuery = this.state.query.trim();
            localStorage.setItem('searchQuery', trimmedQuery);
            console.log(localStorage);
            this.props.onSearch(trimmedQuery);
          };
        
          handleReset = () => {
            this.setState({ query: '' });
            localStorage.removeItem('searchQuery');
            this.props.onSearch('');
          };
    
  render(): JSX.Element {
    return (
        <div className="search-bar">
        <input
          type="text"
          value={this.state.query}
          onChange={this.handleChange}
          placeholder="Введите поисковый запрос..."
        />
        <button onClick={this.handleSearch}>Поиск</button>
        <button onClick={this.handleReset}>Сброс</button>
      </div>
    );
  }
}

export default SearchBlock;
