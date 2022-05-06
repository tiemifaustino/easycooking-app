import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const getEmail = JSON.parse(localStorage.getItem('user'));

  const handleClearClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <>
      <Header title="Profile" visible={ false } />
      <div>
        <h2 data-testid="profile-email">
          { getEmail && getEmail.email }
        </h2>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => history.push('/done-recipes') }
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => history.push('/favorite-recipes') }
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ handleClearClick }
        >
          Logout
        </button>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
