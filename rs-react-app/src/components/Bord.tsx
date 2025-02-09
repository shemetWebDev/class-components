import CardList from './CardList';

interface BordProps {
  listPokemons: { name: string; url: string }[];
  isLoading: boolean;
}

const Bord = ({ listPokemons, isLoading }: BordProps) => {
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
};

export default Bord;
