import axios from 'axios';

export const loadStars = (page, size, search = "") => {
  return axios.get(`http://localhost:8080/Stars?page=${page}&size=${size}&search=${search}`);
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

export const loadClosestSupernovae = () => {
  return axios.get('http://localhost:8080/Stars/ClosestSupernovae');
};

export const curiousData = () => {
  return axios.get('http://localhost:8080/Stars/StarsResume')
}
