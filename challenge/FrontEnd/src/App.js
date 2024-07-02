import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';
import styled from 'styled-components';

const AppContainer = styled.div`
  display: flex;
  background: pink;
`;

const ContentContainer = styled.div`
  margin-left: 250px;
  width: 100%;
`;

function App() {
  return (
    <Router>
      <AppContainer>
        <Navbar />
        <ContentContainer>
          <Routes>
            <Route path="/" element={<h1>Welcome to My App</h1>} />
            <Route path="/chatbot/:type" element={<Chatbot />} />
          </Routes>
        </ContentContainer>
      </AppContainer>
    </Router>
  );
}

export default App;
