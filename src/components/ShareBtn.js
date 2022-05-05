import React from 'react';
import { toast } from 'react-toastify';
import shareBtnLogo from '../images/shareIcon.svg';

function ShareBtn() {
  const handleShare = () => {
    toast.success('Link copied!');
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <div>
      <button data-testid="share-btn" type="button" onClick={ handleShare }>
        <img src={ shareBtnLogo } alt="shareIcon" />
      </button>
    </div>
    // <input
    //   type="image"
    //   data-testid="share-btn"
    //
    //   src={ shareBtnLogo }
    //   alt="Share button"
    // />
  );
}

export default ShareBtn;
