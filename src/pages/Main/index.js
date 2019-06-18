import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View, TouchableOpacity, Text, FlatList,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';

import styles from './styles';

function Main({ navigation }) {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    setSubjects(navigation.getParam('subjects').user.subjects);
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
    <View style={styles.container}>
      <Text style={styles.boxTitle}>Minhas matérias</Text>
      <FlatList
        data={subjects}
        style={styles.list}
        keyExtractor={file => file._id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.fab} onPress={() => {}}>
        <Icon name="plus-square" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

Main.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default Main;
