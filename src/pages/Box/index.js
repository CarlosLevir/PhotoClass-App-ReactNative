import React, { useState, useEffect } from 'react';
import {
  View, Text, FlatList, TouchableOpacity,
} from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';
import socket from 'socket.io-client';

import { distanceInWords } from 'date-fns';
import pt from 'date-fns/locale/pt';

import styles from './styles';
import { getBox, sendNewFile } from '../../services/box';

function Box() {
  const [box, setBox] = useState({});

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

  const subscribeToNewFiles = (boxId) => {
    const io = socket('http://localhost:3333');

    io.emit('connectRoom', boxId);

    io.on('file', (newFile) => {
      setBox(oldBox => ({ ...oldBox, files: [newFile, ...oldBox.files] }));
    });
  };

  const loadBoxFiles = async () => {
    const boxId = await AsyncStorage.getItem('@Photoclass:box');

    subscribeToNewFiles(boxId);

    const response = await getBox(boxId);

    setBox(response.data);
  };

  useEffect(() => {
    loadBoxFiles();
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

        sendNewFile(box._id, data);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.boxTitle}>{box.title}</Text>
      <FlatList
        data={box.files}
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

export default Box;
