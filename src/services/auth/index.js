import api from '../api';

export const signin = ({ email, password }) => api.post('/signin', {
  email,
  password,
});

export const signup = ({ name, email, password }) => api.post('/signup', {
  name,
  email,
  password,
});

// export const logout = boxId => api.get(`/boxes/${boxId}`);
