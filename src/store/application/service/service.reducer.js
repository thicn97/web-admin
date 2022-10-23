const { SERVICE_ACTION } = require('./service.action');

const initState = {
  services: [],
};

//
const serviceReducer = (state = initState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case SERVICE_ACTION.GET_ALL:
      return {
        ...state,
        services: payload,
      };

    default:
      return state;
  }
};

export default serviceReducer;
