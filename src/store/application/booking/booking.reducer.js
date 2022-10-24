import { BOOKING_ACTION } from './booking.action';

const initState = {
  booking: [],
};

//
const bookingReducer = (state = initState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case BOOKING_ACTION.GET_ALL:
      return {
        ...state,
        booking: payload,
      };

    default:
      return state;
  }
};

export default bookingReducer;
