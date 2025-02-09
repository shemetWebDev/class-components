import Card from './Card';

interface CardListProps {
  listPokemons: { name: string }[];
}

const CardList = ({ listPokemons }: CardListProps) => (
  <div className="card-list">
    {listPokemons.map((pokemon) => (
      <Card key={pokemon.name} name={pokemon.name} />
    ))}
  </div>
);

export default CardList;
