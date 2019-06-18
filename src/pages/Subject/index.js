import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  View, Text, FlatList, TouchableOpacity,
} from 'react-native';

import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';

import styles from './styles';
import { sendNewFile } from '../../services/subjects';

function Subject({ navigation }) {
  const [subject, setSubject] = useState({});

  const openFile = async (file) => {
    const filePath = `${RNFS.DocumentDirectoryPath}/${file.title}`;

    try {
      await RNFS.downloadFile({
        fromUrl: file.url,
        toFile: filePath,
      });

      await FileViewer.open(filePath);
    } catch (err) {
      console.log('Arquivo não suportado');
    }
  };

  useEffect(() => {
    setSubject(navigation.getParam('subject'));
  }, []);

  // eslint-disable-next-line react/prop-types
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.file}
      onPress={() => {
        openFile(item);
      }}
    >
      <View style={styles.fileInfo}>
        <Icon name="insert-drive-file" size={24} color="#a5cfff" />
        <Text style={styles.fileTitle}>{item.title}</Text>
      </View>
      <Text style={styles.fileDate}>
        há
        {' '}
        {distanceInWords(item.createdAt, new Date(), {
          locale: pt,
        })}
      </Text>
    </TouchableOpacity>
  );

  const handleUpload = () => {
    ImagePicker.launchImageLibrary({}, async (upload) => {
      if (upload.error) {
        console.log('Image picker error');
      } else if (upload.didCancel) {
        console.log('Canceled by user');
      } else {
        const data = new FormData();

        const [prefix, suffix] = upload.fileName.split('.');
        const ext = suffix.toLowerCase() === 'heic' ? 'jpg' : suffix;

        data.append('file', {
          uri: upload.uri,
          type: upload.type,
          name: `${prefix}.${ext}`,
        });

        sendNewFile(subject._id, data);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.boxTitle}>{subject.title}</Text>
      <FlatList
        data={subject.files}
        style={styles.list}
        keyExtractor={file => file._id}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={renderItem}
      />

      <TouchableOpacity style={styles.fab} onPress={handleUpload}>
        <Icon name="cloud-upload" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
}

Subject.propTypes = {
  navigation: PropTypes.shape({}).isRequired,
};

export default Subject;
