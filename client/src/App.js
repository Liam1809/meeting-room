import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

// import components
import Home from './components/Home/Home';
import AdminDB from './components/AdminDB/AdminDB';
import Joiner from './components/Joiner/Joiner';
import Snackbar from './components/Snackbar/Snackbar';

//import styling
import './index.css';

const App = () => {
  return (
    <BrowserRouter>
      <Snackbar />
      <div>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/admindb" exact component={AdminDB} />
          <Route path="/joiner/:room" component={Joiner} />
          <Route path="/joiner" component={Joiner} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
