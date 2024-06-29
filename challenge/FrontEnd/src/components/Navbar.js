import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/chatbot/1">Chatbot 1</Link></li>
        <li><Link to="/chatbot/2">Chatbot 2</Link></li>
        <li><Link to="/chatbot/3">Chatbot 3</Link></li>
        <li><Link to="/chatbot/4">Chatbot 4</Link></li>
      </ul>
    </nav>
  );
};

export default Navbar;