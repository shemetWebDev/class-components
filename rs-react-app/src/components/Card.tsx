import React from 'react';

interface CardProps {
  name: string;
}

const Card: React.FC<CardProps> = ({ name }) => {
  return (
    <div className="card">
      <h3>{name}</h3>
    </div>
  );
};

export default Card;
