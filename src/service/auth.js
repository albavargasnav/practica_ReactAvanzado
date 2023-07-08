import client, {removeAuthorizationHeader, setAuthorizationHeader,} from '../api/client';
import storage from '../utils/storage';

export const login = (credentials, rememberMe) => {
  return client.post('/api/auth/login', credentials).then(({ accessToken }) => {
    setAuthorizationHeader(accessToken);
    if (rememberMe) {
      localStorage.setItem('auth', accessToken);
    }
    return accessToken;
  });
};

export const logout = () => {
  return Promise.resolve().then(() => {
    removeAuthorizationHeader();
    storage.remove('auth');
  });
};
