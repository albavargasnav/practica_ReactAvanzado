import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Button from '../shared/Button';
import FormField from '../shared/FormField';
import './LoginPage.css';
import { useRef } from 'react';
import { useEffect } from 'react';
import { authLogin, uiResetError } from '../../store/actions';
import { getUi } from '../../store/selectors';


function LoginPage() {
  const dispatch = useDispatch();
  const { isLoading, error } = useSelector(getUi);
  const renders = useRef(0);

  useEffect(() => {
    renders.current++;
    console.log(renders.current, ' times rendered');
  });

  const [credentials, setCredentials] = useState({
        email: '',
        password: '',
  });

  const [rememberMe, setRememberMe] = useState(false);

  const resetError = () => {
    dispatch(uiResetError());
  };


  const handleSubmit = async event => {
    event.preventDefault();
    dispatch(authLogin(credentials));
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
