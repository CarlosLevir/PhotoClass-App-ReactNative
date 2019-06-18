import api from '../api';

export const createSubject = title => api.post('/subject', {
  title,
});

export const getSubejectList = () => api.get('/subject');

export const getSubeject = subjectId => api.get(`/subject/${subjectId}`);

export const sendNewFile = (subjectId, data) => api.post(`/subject/${subjectId}/files`, data);
