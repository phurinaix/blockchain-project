import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './containers/Home/Home';
import Request from './containers/Request/Request';
import Error from './containers/Error/Error';
import Navigation from './components/Navigation';
import Layout from './components/Layout';

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Layout>
        <Switch>
          <Route path="/blockchain-project" component={Home} exact/>
          <Route path="/blockchain-project/request" component={Request}/>
          <Route component={Error}/>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
