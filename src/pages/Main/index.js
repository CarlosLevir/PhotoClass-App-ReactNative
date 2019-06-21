import React, { useState, useEffect } from 'react';
import {
  View, TouchableOpacity, Text, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import io from 'socket.io-client';

import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';

import styles from './styles';

import SubjectForm from '../../components/SubjectForm';

function Main({ navigation }) {
  const [subjects, setSubjects] = useState([]);
  const [showNewSubjectModal, setShowNewSubjectModal] = useState(false);

  const subscribeToNewSubjects = () => {
    const socket = io('http://192.168.3.8:3333');

    socket.emit('connectUser', navigation.getParam('subjects').user._id);

    socket.on('newSubject', (newSubject) => {
      setSubjects(oldSubjects => [newSubject, ...oldSubjects]);
    });

    socket.on('updatedSubject', (newSubject) => {
      // eslint-disable-next-line max-len
      setSubjects(oldSubjects => oldSubjects.map(oldSubject => (newSubject._id === oldSubject._id ? newSubject : oldSubject)));
    });
  };

  useEffect(() => {
    setSubjects(navigation.getParam('subjects').user.subjects);

    subscribeToNewSubjects();
  }, []);

  const showSubjectDetails = (subject) => {
    navigation.navigate('Subject', { subject });
  };

  // eslint-disable-next-line react/prop-types
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.file} onPress={() => showSubjectDetails(item)}>
      <View style={styles.fileInfo}>
        <Icon name="book" size={24} color="#a5cfff" />
        <Text style={styles.fileTitle}>{item.title}</Text>
      </View>
      <Text style={styles.fileDate}>
        há
        {' '}
        {distanceInWords(item.updatedAt, new Date(), {
          locale: pt,
        })}
      </Text>
    </TouchableOpacity>
  );

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={subjects}
          style={styles.list}
          keyExtractor={file => file._id}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />

        <TouchableOpacity
          style={styles.fab}
          onPress={() => {
            setShowNewSubjectModal(true);
          }}
        >
          <Icon name="plus-square" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {showNewSubjectModal && <SubjectForm closeModal={setShowNewSubjectModal} />}
    </>
  );
}

Main.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default Main;
