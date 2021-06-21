import React from 'react';
import './App.css';
import { Route, Switch } from 'wouter';
import { Container } from 'react-bulma-components';

import NavigationBar from './components/NavigationBar';

import Home from './views/Home';
import NewPost from './views/NewPost';
import ViewPost from './views/ViewPost';
import EditPost from './views/EditPost';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Container mt="2" mb="5">
        <Switch>
          <Route path="/posts/:id/edit" component={EditPost} />
          <Route path="/posts/:id" component={ViewPost} />
          <Route path="/posts" component={Home} />
          <Route path="/new" component={NewPost} />
          <Route component={Home} />
        </Switch>
      </Container>
    </div>
  )
}

export default App;
