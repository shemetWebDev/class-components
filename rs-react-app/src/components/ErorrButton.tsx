import { useState } from 'react';
import './styles/ErorrButton.css';

const ErrorButton = () => {
  const [errorState, setErrorState] = useState(false);

  const handleClick = () => {
    setErrorState(true);
  };

  if (errorState) {
    throw new Error('Fake Error');
  }

  return (
    <div className="error-section">
      <div className="error">
        <div className="error-button" onClick={handleClick}>
          <div className="error-button-text">Show Error</div>
        </div>
      </div>
    </div>
  );
};

export default ErrorButton;
