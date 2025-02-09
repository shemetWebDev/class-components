import Card from './Card';

interface CardListProps {
  listPokemons: { name: string; url: string }[];
}

const CardList = ({ listPokemons }: CardListProps) => (
  <div className="card-list">
    {listPokemons.map((pokemon) => (
      <Card key={pokemon.name} name={pokemon.name} url={pokemon.url} />
    ))}
  </div>
);

export default CardList;
