import sitterApi from '../../../api/sitterApi';

export const SERVICE_ACTION = {
  GET_ALL: 'SERVICE_GET_ALL',
  GET_BY_ID: 'SERVICE_GET_BY_ID',
};

export const getAllService = () => {
  return async (dispatch) => {
    const { data } = await sitterApi.getAllService();
    dispatch({
      type: SERVICE_ACTION.GET_ALL,
      payload: data,
    });
  };
};

export const getServiceById = (id) => {
  return async (dispatch) => {
    const { data } = await sitterApi.getServiceById(id);
    dispatch({
      type: SERVICE_ACTION.GET_BY_ID,
      payload: data,
    });
  };
};

export const updateService = (values) => {
  return async (dispatch) => {};
};
