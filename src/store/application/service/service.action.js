import sitterApi from '../../../api/sitterApi';

export const SERVICE_ACTION = {
  GET_ALL: 'SERVICE_GET_ALL',
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
