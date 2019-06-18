import AsyncStorage from '@react-native-community/async-storage';
import api from '../api';

export const TOKEN_KEY = '@Photoclass:token';

export const signup = ({ email, password }) => api.post('/signin', {
  email,
  password,
});

export const signin = ({ name, email, password }) => api.post('/signin', {
  name,
  email,
  password,
});

export const logout = boxId => api.get(`/boxes/${boxId}`);

export const onSignIn = () => AsyncStorage.setItem(TOKEN_KEY, 'true');

export const onSignOut = () => AsyncStorage.removeItem(TOKEN_KEY);

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);

  return token !== null;
};
