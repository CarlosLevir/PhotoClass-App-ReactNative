import api from '../api';

export const createBox = title => api.post('/boxes', {
  title,
});

export const getBox = boxId => api.get(`/boxes/${boxId}`);

export const sendNewFile = (boxId, data) => api.post(`/boxes/${boxId}/files`, data);
