import React, { useState } from 'react';
import {
  View, TextInput, TouchableOpacity, Text, Modal,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';

import styles from './styles';

import { createSubject } from '../../services/subjects';

function SubjectForm({ closeModal }) {
  const [newBoxName, setNewBoxName] = useState('');

  const handleCreateBox = async () => {
    try {
      // eslint-disable-next-line no-unused-vars
      const response = await createSubject(newBoxName);

      closeModal(false);
    } catch (err) {
      console.log(err);

      closeModal(false);
    }
  };

  return (
    <Modal
      animationType="fade"
      transparent
      visible
      onRequestClose={() => {
        closeModal(false);
      }}
    >
      <View style={styles.modalWrapper}>
        <View style={styles.container}>
          <View>
            <Text style={styles.title}>Nova matéria</Text>
            <TouchableOpacity
              style={styles.closeModalButton}
              onPress={() => {
                closeModal(false);
              }}
            >
              <Icon name="times" size={24} color="#a5cfff" />
            </TouchableOpacity>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Nome da matéria"
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
      </View>
    </Modal>
  );
}

SubjectForm.propTypes = {
  closeModal: PropTypes.func.isRequired,
};

export default SubjectForm;
