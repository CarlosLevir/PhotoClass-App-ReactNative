import AsyncStorage from '@react-native-community/async-storage';

export const TOKEN_KEY = '@Photoclass:token';

export const onSignIn = token => AsyncStorage.setItem(TOKEN_KEY, token);

export const onSignOut = () => AsyncStorage.removeItem(TOKEN_KEY);

export const getToken = () => AsyncStorage.getItem(TOKEN_KEY);

export const isSignedIn = async () => {
  const token = await getToken();

  return token !== null;
};
