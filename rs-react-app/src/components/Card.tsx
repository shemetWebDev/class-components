import { Link } from 'react-router-dom';
interface CardProps {
  name: string;
  url: string;
}

const Card = ({ name, url }: CardProps) => (
  <div className="card">
    <Link to={`/details/${url.split('/')[6]}`}>
      <h3>{name}</h3>
    </Link>
  </div>
);

export default Card;
