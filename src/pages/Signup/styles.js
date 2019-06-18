import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 30,
  },
  logo: {
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#DDD',
    borderRadius: 4,
    fontSize: 16,
    paddingHorizontal: 20,
    marginTop: 10,
  },
  buttonSignin: {
    height: 48,
    borderRadius: 4,
    fontSize: 16,
    paddingHorizontal: 20,
    marginTop: 10,
    backgroundColor: '#7159c1',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSignup: {
    height: 48,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonSigninText: {
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'center',
    color: '#FFF',
  },
  buttonSignupText: {
    fontWeight: 'bold',
    fontSize: 16,
    alignItems: 'center',
    color: '#7159c1',
  },
});

export default styles;
