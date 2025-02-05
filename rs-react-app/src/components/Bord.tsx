import { Component } from 'react';
import CardList from './CardList';

interface BordProps {
  listPokemons: { name: string }[];
  isLoading: boolean;
}

class Bord extends Component<BordProps> {
  render() {
    const { listPokemons, isLoading } = this.props;

    if (isLoading) {
      return <div>Загрузка...</div>;
    }

    if (listPokemons.length === 0) {
      return <div>Нет результатов по вашему запросу.</div>;
    }

    return (
      <div className="bord">
        <CardList listPokemons={listPokemons} />
      </div>
    );
  }
}

export default Bord;
