import { Component } from 'react';
import './styles/Header.css';

class Header extends Component {
  render(): JSX.Element {
    return (
      <div className="header">
        <h1>POKEMON</h1>
      </div>
    );
  }
}

export default Header;
