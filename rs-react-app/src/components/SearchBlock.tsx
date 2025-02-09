import React, { useState, useEffect } from 'react';
import './styles/SearchBlock.css';

interface SearchProps {
  onSearch: (query: string) => void;
}

const SearchBlock: React.FC<SearchProps> = (props) => {
  const { onSearch } = props;

  const [query, setQuery] = useState<string>(
    localStorage.getItem('searchQuery') || ''
  );
  const [searchHistory, setSearchHistory] = useState<string[]>(
    JSON.parse(localStorage.getItem('searchHistory') || '[]')
  );
  const [showHistory, setShowHistory] = useState<boolean>(false);

  useEffect(() => {
    if (query.trim()) {
      localStorage.setItem('searchQuery', query.trim());
    }
  }, [query]);

  useEffect(() => {
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
  }, [searchHistory]);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>): void {
    setQuery(event.target.value);
  }

  function handleSearch(): void {
    const trimmedQuery = query.trim();
    if (trimmedQuery && !searchHistory.includes(trimmedQuery)) {
      const newHistory = [...searchHistory, trimmedQuery];
      setSearchHistory(newHistory);
    }
    onSearch(trimmedQuery);
  }

  function handleReset(): void {
    setQuery('');
    setShowHistory(false);
    onSearch('');
  }

  function handleHistoryClick(query: string): void {
    setQuery(query);
    onSearch(query);
  }

  function toggleHistory(show: boolean): void {
    setShowHistory(show);
  }

  return (
    <div className="search-bar">
      {showHistory && searchHistory.length > 0 && (
        <div className="search-history">
          <h4>История запросов:</h4>
          <ul>
            {searchHistory.map((item) => (
              <li key={item} onClick={() => handleHistoryClick(item)}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      <input
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Введите поисковый запрос..."
        onFocus={() => toggleHistory(true)}
      />
      <button onClick={handleSearch}>Поиск</button>
      <button onClick={handleReset}>Сброс</button>
    </div>
  );
};

export default SearchBlock;
