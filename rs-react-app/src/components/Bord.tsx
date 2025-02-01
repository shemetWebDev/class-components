import { Component } from 'react';
interface BordProps {
  listPokemons: { name: string; description?: string }[];
  isLoading: boolean;
  error: string | null;
}


class Bord extends Component<BordProps> {
  render(): JSX.Element {
    const { listPokemons, isLoading, error } = this.props;
    if (isLoading) {
      return <p>Загрузка...</p>;
    }

    if (error) {
      return <p className="error">Ошибка: {error}</p>;
    }
    return (
      <div className="results">
        {listPokemons.length > 0 ? (
          listPokemons.map((item, index) => (
            <div key={index} className="card">
              <h3>{item.name}</h3>
              <p>{item.description || 'Нет описания'}</p>
            </div>
          ))
        ) : (
          <p>Ничего не найдено</p>
        )}
      </div>
    );
  }
}

export default Bord;
