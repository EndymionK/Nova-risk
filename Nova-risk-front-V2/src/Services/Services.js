import axios from 'axios';

export const loadStars = (page, size) => {
    return axios.get(`http://localhost:8080/Stars?page=${page}&size=${size}`);
  };

export const deleteStar = (_id) => {
    return axios.delete(`http://localhost:8080/Stars/${_id}`)
};

export const createStar = (values) => {
    return axios.post('http://localhost:8080/Stars', values)            
}

export const loadStarById = (id) => {
    return axios.get(`http://localhost:8080/Stars/${id}`)
}

export const updateStar = async (id, updatedStarData) => {
    console.log(id)
    try {
    const response = await axios.put(`http://localhost:8080/Stars/${id}`, updatedStarData);
    return response.data;
  } catch (error) {
    throw error;
  }
  };