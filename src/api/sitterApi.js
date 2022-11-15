import axiosClient from './axiosClient';

const sitterApi = {
  getAll: (params) => {
    const url = '/sitter';
    return axiosClient.get(url, { params });
  },
  getAllService: (url = '/service/services') => {
    return axiosClient.get(url);
  },
  getAllSitter: (url = '/sitter/sitters') => {
    return axiosClient.get(url);
  },
  getAllApplied: (url = '/candidate/candidates') => {
    return axiosClient.get(url);
  },
  approveApplied: (email, url = '/candidate/accept') => {
    return axiosClient.put(`${url}/${email}`);
  },
  getAllBooking: (url = '/booking/bookings') => {
    return axiosClient.get(url);
  },
  rejectApplied: (email, url = '/candidate/reject') => {
    return axiosClient.put(`${url}/${email}`);
  },
  getAllCustomer: (url = '/customer/customers') => {
    return axiosClient.get(url);
  },
  getCustomerById: (id, url = '/customer/get-by-id') => {
    return axiosClient.get(`${url}/${id}`);
  },
  getSitterDetail: (id, url = '/sitter/get-by-id') => {
    return axiosClient.get(`${url}/${id}`);
  },
  getServiceById: (id, url = '/service/services-by-active') => {
    return axiosClient.put(`${url}/${id}`);
  },
  getCandidateById: (id, url = '/candidate/get-by-id') => {
    return axiosClient.get(`${url}/${id}`);
  },
  getBookingRevenue: (startDate, endDate, url = '/booking/revenue') => {
    return axiosClient.post(url, { startDate, endDate });
  },
  getNumOfBooking: (startDate, endDate, url = '/booking/count-booking') => {
    return axiosClient.post(url, { startDate, endDate });
  },
};
export default sitterApi;
