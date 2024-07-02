import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Sidebar = styled.div`
  background-color: #2c2c2c;
  color: white;
  height: 100vh;
  width: 250px;
  position: fixed;
  top: 0;
  left: 0;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  margin: 15px 0;
  font-size: 18px;
  &:hover {
    text-decoration: underline;
  }
`;

const Navbar = () => {
  return (
    <Sidebar>
      <h2>Chatbot</h2>
      <NavItem to="/chatbot/clasico">Clásico</NavItem>
      <NavItem to="/chatbot/astrologia">Astrología</NavItem>
      <NavItem to="/chatbot/romance">Romance</NavItem>
      <NavItem to="/chatbot/trabajo">Trabajo</NavItem>
    </Sidebar>
  );
};

export default Navbar;