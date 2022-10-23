import sitterApi from '../../../api/sitterApi';

export const SITTER_ACTION = {
  GET_ALL: 'SITTER_GET_ALL',
};

export const getAllSitter = () => {
  return async (dispatch) => {
    const { data } = await sitterApi.getAllSitter();
    dispatch({
      type: SITTER_ACTION.GET_ALL,
      payload: data,
    });
  };
};
