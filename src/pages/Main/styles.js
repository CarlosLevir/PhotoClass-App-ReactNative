import { StyleSheet } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingHorizontal: 30,
  },

  boxTitle: {
    marginTop: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },

  fab: {
    position: 'absolute',
    right: 30,
    bottom: 30 + getBottomSpace(),
    width: 60,
    height: 60,
    backgroundColor: '#7159c1',
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },

  file: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
  },

  separator: {
    height: 1,
    backgroundColor: '#EEE',
  },

  fileInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  fileTitle: {
    fontSize: 16,
    color: '#333',
    marginLeft: 10,
  },

  fileDate: {
    fontSize: 14,
    color: '#666',
  },
});

export default styles;
