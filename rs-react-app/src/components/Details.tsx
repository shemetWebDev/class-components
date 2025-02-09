import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface PokemonDetails {
  name: string;
  description: string;
}

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [details, setDetails] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data: PokemonDetails = await response.json();
        setDetails(data);
      } catch (error) {
        console.error('Error fetching details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleClose = () => {
    const searchParams = new URLSearchParams(location.search); // Получаем текущие параметры
    navigate(`/?${searchParams.toString()}`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="details-section">
      <button onClick={handleClose}>Close</button>
      <h2>{details?.name}</h2>
      <p>{details?.description}</p>
    </div>
  );
};

export default Details;
