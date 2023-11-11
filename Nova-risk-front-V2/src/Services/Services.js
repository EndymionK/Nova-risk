import axios from 'axios';

export const loadStars = (page, size, search = "") => {
  return axios.get(`https://novarisk-back.azurewebsites.net/Stars?page=${page}&size=${size}&search=${search}`);
};

export const deleteStar = (_id) => {
    return axios.delete(`https://novarisk-back.azurewebsites.net/Stars/${_id}`)
};

export const createStar = (values) => {
    return axios.post('https://novarisk-back.azurewebsites.net/Stars', values)            
}

export const loadStarById = (id) => {
    return axios.get(`https://novarisk-back.azurewebsites.net/Stars/${id}`)
}

export const updateStar = async (id, updatedStarData) => {
    console.log(id)
    try {
    const response = await axios.put(`https://novarisk-back.azurewebsites.net/Stars/${id}`, updatedStarData);
    return response.data;
  } catch (error) {
    throw error;
  }
  };

export const loadClosestSupernovae = () => {
  return axios.get('https://novarisk-back.azurewebsites.net/Stars/ClosestSupernovae');
};

export const curiousData = () => {
  return axios.get('https://novarisk-back.azurewebsites.net/Stars/StarsResume')
}
