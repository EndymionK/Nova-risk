import axios from 'axios';

const apiBaseUrl = 'https://novarisk-back.azurewebsites.net';

// Función genérica para manejar las solicitudes y manejar los encabezados CORS
const handleErrors = (error) => {
  console.error('Error en la solicitud:', error);
  return error;
};

const sendRequest = async (method, endpoint, data = null) => {
  try {
    const url = `${apiBaseUrl}/${endpoint}`;
    console.log(`Enviando solicitud a ${url}`);
    const response = await axios({
      method,
      url,
      data,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.headers['content-type'] && response.headers['content-type'].includes('application/json')) {
      console.log(`Respuesta recibida en services:`, response.data);
      return response.data;
    } else {
      console.log(`Respuesta recibida en services:`, response);
      return response;
    }
  } catch (error) {
    handleErrors(error);
  }
};




export const loadStars = (page, size, search = "") => {
  return sendRequest('get', `Stars?page=${page}&size=${size}&search=${search}`);
};

export const deleteStar = (_id) => {
  return sendRequest('delete', `Stars/${_id}`);
};

export const createStar = (values) => {
  return sendRequest('post', 'Stars', values);
};

export const loadStarById = (id) => {
  return sendRequest('get', `Stars/${id}`);
};

export const updateStar = (id, updatedStarData) => {
  return sendRequest('put', `Stars/${id}`, updatedStarData);
};

export const loadClosestSupernovae = () => {
  return sendRequest('get', 'Stars/ClosestSupernovae');
};

export const curiousData = () => {
  return sendRequest('get', 'Stars/StarsResume')
    .catch(error => {
      handleErrors(error);
      return {}; // Retorna un objeto vacío en caso de error
    });
};

