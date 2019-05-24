import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Home from './containers/Home';
import Request from './containers/Request';
import RequestList from './containers/RequestList';
import Add from './containers/Add';
import About from './containers/About';
import Error from './containers/Error';
import Profile from './containers/Profile';
import Logout from './components/Logout';
import Layout from './components/Layout';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Switch>
          <Route path="/blockchain-project" component={Home} exact/>
          <Route path="/blockchain-project/add" component={Add}/>
          <Route path="/blockchain-project/request" component={Request}/>
          <Route path="/blockchain-project/about" component={About} />
          <Route path="/blockchain-project/profile" component={Profile} />
          <Route path="/blockchain-project/request_list" component={RequestList} />
          <Route path="/blockchain-project/logout" component={Logout} />
          <Route component={Error}/>
        </Switch>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
