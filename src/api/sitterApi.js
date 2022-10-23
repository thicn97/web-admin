import axiosClient from './axiosClient';

const sitterApi = {
  getAll: (params) => {
    const url = '/sitter';
    return axiosClient.get(url, { params });
  },
  getAllService: (url = '/service') => {
    return axiosClient.get(url);
  },
  getAllSitter: (url = '/sitter') => {
    return axiosClient.get(url);
  },
};

// class SitterApi {
//     async getAllSitter() {
//         const url = '/sitter';
//         return await axiosClient.get(url);
//     }
// }
// const sitterAPI = new SitterApi();

export default sitterApi;
