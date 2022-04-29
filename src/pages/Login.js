import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.min.css';
import './Login.css';

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
    <Form
      onSubmit={ (event) => handleSubmit(event) }
      className="d-flex flex-column m-4"
    >
      <h1 className="mx-auto">Login</h1>

      <Form.Group className="mb-3">
        <Form.Control
          data-testid="email-input"
          type="email"
          value={ email }
          onChange={ (event) => handleChange(event.target, setEmail) }
          placeholder="Email"
          className="mt-5"
          size="lg"
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          data-testid="password-input"
          type="password"
          value={ password }
          onChange={ (event) => handleChange(event.target, setPassword) }
          placeholder="Password"
          size="lg"
        />
      </Form.Group>

      <Button
        data-testid="login-submit-btn"
        disabled={ isLoginBtnDisabled }
        type="submit"
        variant="danger"
        size="lg"
        value="Submit"
        className="mt-5"
      >
        Enter
      </Button>
    </Form>
  );
}

export default Login;
