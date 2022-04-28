import React, { useState } from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const history = useHistory();
  const [logout, setLogout] = useState(false);

  const handleClearClick = () => {
    localStorage.clear();
    setLogout(true);
  };

  return (
    <>
      <Header title="Profile" visible={ false } />
      <div>
        <h2 data-testid="profile-email">
          email
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
        { logout && <Redirect to="/" /> }
      </div>
      <Footer />
    </>
  );
}

export default Profile;
