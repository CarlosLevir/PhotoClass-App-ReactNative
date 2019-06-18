import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  View, Image, TextInput, TouchableOpacity, Text,
} from 'react-native';

import styles from './styles';

import logo from '../../assets/images/logo.png';

import { signin, onSignIn } from '../../services/auth';

function Signin({ navigation }) {
  const [email, setEmail] = useState('jose@phhh');
  const [password, setPassword] = useState('testeteste');

  const handleLogin = async () => {
    try {
      const { data } = await signin({ email, password });

      await onSignIn('@Photoclass:box', data.token);

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
        placeholder="Crie um box"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        onChangeText={typedPassword => setPassword(typedPassword)}
        defaultValue={password}
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

Signin.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default Signin;
