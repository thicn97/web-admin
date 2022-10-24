import sitterApi from '../../../api/sitterApi';

export const BOOKING_ACTION = {
  GET_ALL: 'BOOKING_GET_ALL',
};

export const getAllBooking = () => {
  return async (dispatch) => {
    const { data } = await sitterApi.getAllBooking();
    dispatch({
      type: BOOKING_ACTION.GET_ALL,
      payload: data,
    });
  };
};
