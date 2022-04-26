import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoginBtnDisabled, setIsLoginBtnDisabled] = useState(true);
  const history = useHistory();

  function handleChange(event, setState) {
    setState(event.value);
  }

  useEffect(() => {
    const passwordMinLength = 6;

    const passwordValid = password.length > passwordMinLength;

    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const mailValidator = regexEmail.test(email);

    const isValid = (passwordValid && mailValidator);
    if (!isValid) {
      setIsLoginBtnDisabled(true);
    } else {
      setIsLoginBtnDisabled(false);
    }
  }, [email, password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);

    const user = JSON.stringify({ email });
    localStorage.setItem('user', user);

    history.push('/foods');
  };

  return (
    <>
      <h1>Login</h1>
      <form
        onSubmit={ (event) => handleSubmit(event) }
      >
        <input
          data-testid="email-input"
          type="email"
          value={ email }
          onChange={ (event) => handleChange(event.target, setEmail) }
          placeholder="Email"
        />

        <input
          data-testid="password-input"
          type="password"
          value={ password }
          onChange={ (event) => handleChange(event.target, setPassword) }
          placeholder="Password"
        />

        <button
          data-testid="login-submit-btn"
          disabled={ isLoginBtnDisabled }
          type="submit"
        >
          Enter
        </button>
      </form>
    </>
  );
}

export default Login;
