import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';

function App() {
  return (
    <Switch>
      <Route exact path="/favorite-recipes" />
      <Route exact path="/done-recipes" />
      <Route exact path="/profile" />
      <Route exact path="/explore/foods/nationalities" />
      <Route exact path="/explore/drinks/ingredients" />
      <Route exact path="/explore/drinks" />
      <Route exact path="/explore/foods" />
      <Route exact path="/explore" />
      <Route exact path="/drinks/:id/in-progress" />
      <Route exact path="/foods/:id/in-progress" />
      <Route exact path="/drinks/:id" />
      <Route exact path="/foods/:id" />
      <Route exact path="/drinks" />
      <Route exact path="/foods" />
      <Route exact path="/" component={ Login } />
    </Switch>
  );
}

export default App;
