import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import {
  View, Image, TextInput, TouchableOpacity, Text,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import styles from './styles';

import logo from '../../assets/images/logo.png';

import { createBox } from '../../services/box';

function Main({ navigation }) {
  const [newBoxName, setNewBoxName] = useState('');

  async function verifyBox() {
    const box = await AsyncStorage.getItem('http://localhost:3333');

    if (box) {
      navigation.navigate('Box');
    }
  }

  useEffect(() => {
    verifyBox();
  }, []);

  const handleCreateBox = async () => {
    try {
      const response = await createBox(newBoxName);

      await AsyncStorage.setItem('@Photoclass:box', response.data._id);

      navigation.navigate('Box');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={logo} />

      <TextInput
        style={styles.input}
        placeholder="Crie um box"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        onChangeText={boxName => setNewBoxName(boxName)}
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateBox}>
        <Text style={styles.buttonText}>Criar</Text>
      </TouchableOpacity>
    </View>
  );
}

Main.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default Main;
