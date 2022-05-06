import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Profile.css';

function Profile() {
  const history = useHistory();
  const getEmail = JSON.parse(localStorage.getItem('user'));

  const handleClearClick = () => {
    localStorage.clear();
    history.push('/');
  };

  return (
    <div className="container-page-profile">
      <Header title="Profile" visible={ false } />
      <div className="my-5">
        <h4 data-testid="profile-email">
          { getEmail && getEmail.email }
        </h4>
        <div className="d-flex flex-column mx-5 mt-5">
          <Button
            type="button"
            data-testid="profile-done-btn"
            onClick={ () => history.push('/done-recipes') }
            variant="danger"
            size="lg"
            className="my-2"
          >
            Done Recipes
          </Button>
          <Button
            type="button"
            data-testid="profile-favorite-btn"
            onClick={ () => history.push('/favorite-recipes') }
            variant="danger"
            size="lg"
            className="my-2"
          >
            Favorite Recipes
          </Button>
          <Button
            type="button"
            data-testid="profile-logout-btn"
            onClick={ handleClearClick }
            variant="danger"
            size="lg"
            className="my-2"
          >
            Logout
          </Button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Profile;
