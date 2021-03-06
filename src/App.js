import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Route, Switch } from 'react-router-dom';
import CocktailDetails from './pages/CocktailDetails';
import DoneRecipes from './pages/DoneRecipes';
import Drinks from './pages/Drinks';
import Explore from './pages/Explore';
import ExploreDrinks from './pages/ExploreDrinks';
import ExploreFoods from './pages/ExploreFoods';
import ExploreIngredients from './pages/ExploreIngredients';
import ExploreNationalities from './pages/ExploreNationalities';
import FavoriteRecipes from './pages/FavoriteRecipes';
import Foods from './pages/Foods';
import Login from './pages/Login';
import Profile from './pages/Profile';
import RecipeDetails from './pages/RecipeDetails';
import 'bootstrap/dist/css/bootstrap.min.css';
import FoodInProgress from './pages/FoodInProgress';
import DrinkInProgress from './pages/DrinkInProgress';
import NotFound from './pages/NotFound';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Switch>
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
        <Route exact path="/done-recipes" component={ DoneRecipes } />
        <Route exact path="/profile" component={ Profile } />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ ExploreNationalities }
        />
        <Route exact path="/explore/foods/ingredients" component={ ExploreIngredients } />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ ExploreIngredients }
        />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinkInProgress } />
        <Route exact path="/foods/:id/in-progress" component={ FoodInProgress } />
        <Route exact path="/drinks/:id" component={ CocktailDetails } />
        <Route exact path="/foods/:id" component={ RecipeDetails } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/" component={ Login } />
        <Route path="*" component={ NotFound } />
      </Switch>
    </>
  );
}

export default App;
