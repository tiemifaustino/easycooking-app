import React from 'react';
import { toast } from 'react-toastify';
import shareBtnLogo from '../images/shareIcon.svg';

function ShareBtn() {
  const handleShare = () => {
    toast.success('Link copied!');
    const textToCopy = window.location.href.replace('/in-progress', '');
    navigator.clipboard.writeText(textToCopy);
  };

  return (
    <button
      data-testid="share-btn"
      type="button"
      onClick={ handleShare }
      className="button-icon"
    >
      <img
        src={ shareBtnLogo }
        alt="shareIcon"
        className="p-1"
      />
    </button>
  );
}

export default ShareBtn;
