import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import logoApp from '../images/logoAppFundo.png';

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
      <div className="d-flex justify-content-center mt-2">
        <img
          className="logo"
          src={ logoApp }
          alt="Logotipo do App"
          width="320px"
        />
      </div>
      <Form
        onSubmit={ (event) => handleSubmit(event) }
        className="d-flex flex-column mx-5"
      >
        <h4>Login</h4>

        <Form.Group className="mb-3">
          <Form.Control
            data-testid="email-input"
            type="email"
            value={ email }
            onChange={ (event) => handleChange(event.target, setEmail) }
            placeholder="Email"
            className="mt-3"
            size="md"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            data-testid="password-input"
            type="password"
            value={ password }
            onChange={ (event) => handleChange(event.target, setPassword) }
            placeholder="Password"
            size="md"
          />
        </Form.Group>

        <Button
          data-testid="login-submit-btn"
          disabled={ isLoginBtnDisabled }
          type="submit"
          variant="danger"
          value="Submit"
          className="mt-3"
          size="md"
        >
          Enter
        </Button>
      </Form>
    </>
  );
}

export default Login;
