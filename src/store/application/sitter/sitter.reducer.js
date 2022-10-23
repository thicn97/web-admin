import { SITTER_ACTION } from './sitter.action';

const initState = {
  sitters: [],
};

//
const sitterReducer = (state = initState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case SITTER_ACTION.GET_ALL:
      return {
        ...state,
        sitters: payload,
      };

    default:
      return state;
  }
};

export default sitterReducer;
