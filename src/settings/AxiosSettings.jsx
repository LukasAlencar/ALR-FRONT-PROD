import axios from 'axios';

const createAxiosInstance = (token) => {
  const apiALR = axios.create({
    baseURL: 'https://api.alrtcc.com/',
    timeout: 5000, 
    headers: {
      'Authorization': `Token ${token}`
    },
  });
  return apiALR;
};

export default createAxiosInstance;
