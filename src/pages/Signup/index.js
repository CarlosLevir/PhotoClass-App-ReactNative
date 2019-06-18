import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, TextInput, TouchableOpacity, Text,
} from 'react-native';

import styles from './styles';

import logo from '../../assets/images/logo.png';

import { signup } from '../../services/auth';
import { onSignIn } from '../../services/auth/utils';

function Signin({ navigation }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignin = async () => {
    navigation.navigate('Signin');
  };

  const handleRegister = async () => {
    try {
      const { data } = await signup({ name, email, password });

      await onSignIn(data.token);

      navigation.navigate('Main', { subjects: data });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <TextInput
        style={styles.input}
        placeholder="Seu nome"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        onChangeText={typedName => setName(typedName)}
        defaultValue={name}
      />
      <TextInput
        style={styles.input}
        placeholder="Seu email"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        onChangeText={typedEmail => setEmail(typedEmail)}
        defaultValue={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Sua senha"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        onChangeText={typedPassword => setPassword(typedPassword)}
        defaultValue={password}
        secureTextEntry
      />

      <TouchableOpacity style={styles.buttonSignin} onPress={handleRegister}>
        <Text style={styles.buttonSigninText}>Cadastrar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonSignup} onPress={handleSignin}>
        <Text style={styles.buttonSignupText}>Já possuo conta</Text>
      </TouchableOpacity>
    </View>
  );
}

Signin.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default Signin;
