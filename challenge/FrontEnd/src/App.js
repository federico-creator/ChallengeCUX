import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/Navbar';
import Chatbot from './components/Chatbot';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Switch>
          <Route path="/" exact>
            <h1>Welcome to My App</h1>
          </Route>
          <Route path="/chatbot/:type" component={Chatbot} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
