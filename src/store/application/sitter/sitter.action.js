import sitterApi from '../../../api/sitterApi';

export const SITTER_ACTION = {
  GET_ALL: 'SITTER_GET_ALL',
  GET_BY_ID: 'SITTER_GET_BY_ID',
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
export const getSitterDetail = (id) => {
  return async (dispatch) => {
    const { data } = await sitterApi.getSitterDetail(id);
    dispatch({
      type: SITTER_ACTION.GET_BY_ID,
      payload: data,
    });
  };
};
