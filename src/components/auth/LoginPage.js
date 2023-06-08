import { useState } from 'react';
import { useDispatch } from 'react-redux';

import Button from '../shared/Button';
import FormField from '../shared/FormField';
import { login } from './service';
import './LoginPage.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRef } from 'react';
import { useEffect } from 'react';
import { authLogin } from '../../redux/actions';


function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const renders = useRef(0);

  useEffect(() => {
    renders.current++;
    console.log(renders.current, ' times rendered');
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [credentials, setCredentials] = useState({
        email: '',
        password: '',
  });

  const [rememberMe, setRememberMe] = useState(false);

  const resetError = () => {
    setError(null);
  };

  const onLogin = () => dispatch(authLogin());


  const handleSubmit = async event => {
    event.preventDefault();
    resetError();
    setIsLoading(true);
    try {
      await login(credentials, rememberMe);
      setIsLoading(false);
      onLogin();
      const to = location.state?.from?.pathname || '/';
      navigate(to);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  };

  const handleChange = event => {

    setCredentials({
      ...credentials,
      [event.target.name]: event.target.value,
    });
  };

  const handleRememberMeChange = event => {
    setRememberMe(event.target.checked);
  };

  const buttonDisabled =
    isLoading || !credentials.email || !credentials.password;

  return (
    <div className="loginPage">
      <h1 className="loginPage-title">Log in to Adverts</h1>
      <form onSubmit={handleSubmit}>
        <FormField
          type="text"
          name="email"
          label="Email"
          className="loginForm-field"
          onChange={handleChange}
          value={credentials.username}
          autofocus
        />
        <FormField
          type="password"
          name="password"
          label="password"
          className="loginForm-field"
          onChange={handleChange}
          value={credentials.password}
        />

        <div className="rememberMe">
          <input
            type="checkbox"
            id="rememberMe"
            name="rememberMe"
            checked={rememberMe}
            onChange={handleRememberMeChange}
          />
          <label htmlFor="rememberMe">Remember me</label>
        </div>
        <Button
          type="submit"
          variant="primary"
          className="loginForm-submit"
          disabled={buttonDisabled}
        >
          Log in
        </Button>
      </form>
      {error && (
        <div onClick={resetError} className="loginPage-error">
          {error.message}
        </div>
      )}
    </div>
  );
}

export default LoginPage;
