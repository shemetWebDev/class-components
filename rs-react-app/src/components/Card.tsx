interface CardProps {
  name: string;
}

const Card = ({ name }: CardProps) => (
  <div className="card">
    <h3>{name}</h3>
  </div>
);

export default Card;
