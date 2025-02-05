import { Component } from 'react';
import './styles/ErorrButton.css';

class ErrorButton extends Component {
  state = {
    errorState: false,
  };

  handleClick = () => {
    this.setState({ errorState: true });
  };

  render() {
    if (this.state.errorState) {
      throw new Error('Fake Error');
    }

    return (
      <div className="error-section">
        <div className="error">
          <div className="error-button" onClick={this.handleClick}>
            <div className="error-button-text">Show Error</div>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorButton;
