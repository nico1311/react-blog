import React from 'react';
import './App.css';
import { Route } from 'wouter';
import { Container } from 'react-bulma-components';

import NavigationBar from './components/NavigationBar';

import Home from './views/Home';
import NewPost from './views/NewPost';
import ViewPost from './views/ViewPost';

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Container mt="2" mb="5">
        <Route path="/" component={Home} />
        <Route path="/new" component={NewPost} />
        <Route path="/posts" component={Home} />
        <Route path="/posts/:id" component={ViewPost} />
      </Container>
    </div>
  )
}

export default App;
