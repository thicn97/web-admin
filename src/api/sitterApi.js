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
  getAllApplied: (url = '/candidate') => {
    return axiosClient.get(url);
  },
  approveApplied: (email, url = '/candidate') => {
    return axiosClient.put(`${url}/${email}`);
  },
  getAllBooking: (url = '/booking') => {
    return axiosClient.get(url);
  },
  rejectApplied: (email, url = '/candidate/reject') => {
    return axiosClient.put(`${url}/${email}`);
  },
  getAllCustomer: (url = '/customer') => {
    return axiosClient.get(url);
  },
  getCustomerById: (id, url = '/customer/detail') => {
    return axiosClient.get(`${url}/${id}`);
  },
  getSitterDetail: (id, url = '/sitter/detail') => {
    return axiosClient.get(`${url}/${id}`);
  },
  getServiceById: (id, url = '/service') => {
    return axiosClient.put(`${url}/${id}`);
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
