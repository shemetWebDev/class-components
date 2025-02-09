import { useState, useEffect } from 'react';
import { useSearchParams, Link, Outlet, useNavigate } from 'react-router-dom';
import SearchBlock from './SearchBlock';
import Bord from './Bord';
import ErrorButton from './ErorrButton';
import './styles/Main.css';

interface Pokemon {
  name: string;
  url: string;
}

interface MainState {
  listPokemons: Pokemon[];
  isLoading: boolean;
  firstSearch: boolean;
  query: string;
}

function Main() {
  const [state, setState] = useState<MainState>({
    listPokemons: [],
    isLoading: false,
    firstSearch: false,
    query: localStorage.getItem('searchQuery') || '',
  });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = parseInt(searchParams.get('page') || '1', 10);

  const fetchResults = (query: string = '') => {
    setState((prevState) => ({
      ...prevState,
      isLoading: true,
      firstSearch: true,
      query,
    }));

    fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=10&offset=${(page - 1) * 10}`
    )
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
        localStorage.setItem('searchQuery', query);
      })
      .catch(() => {
        setState((prevState) => ({ ...prevState, isLoading: false }));
      });
  };

  useEffect(() => {
    fetchResults(state.query); // Загружаем список с последним поиском
  }, [page]);

  const closeDetails = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (target.closest('.card') || target.closest('.search-block')) return;

    navigate(`/?page=${page}`);
  };

  return (
    <div className="main-container" onClick={closeDetails}>
      <SearchBlock onSearch={fetchResults} />
      {state.firstSearch && (
        <div className="main-content">
          <div className="left-section">
            <Bord
              listPokemons={state.listPokemons}
              isLoading={state.isLoading}
            />
            <div className="pagination">
              <Link
                to={`/?page=${page - 1}`}
                className="pagination__button"
                style={{ pointerEvents: page <= 1 ? 'none' : 'auto' }}
              >
                Previous
              </Link>
              <span>{page}</span>
              <Link to={`/?page=${page + 1}`} className="pagination__button">
                Next
              </Link>
            </div>
          </div>
          <div className="right-section">
            <Outlet />
          </div>
        </div>
      )}
      <ErrorButton />
    </div>
  );
}

export default Main;
