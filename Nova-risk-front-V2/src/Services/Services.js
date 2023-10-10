import axios from 'axios';

export const loadStars = () => {
    return axios.get('http://localhost:8080/Stars')
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

export const updateStar = (id, updatedStarData) => {
    return axios.put(`http://localhost:8080/Stars/${id}`, updatedStarData)
      .then((response) => {
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  };