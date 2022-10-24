import { APPLIED_ACTION } from './applied.action';

const initState = {
  appliedForm: [],
};

//
const appliedReducer = (state = initState, action = {}) => {
  const { type, payload } = action;
  switch (type) {
    case APPLIED_ACTION.GET_ALL:
      return {
        ...state,
        appliedForm: payload,
      };
    case APPLIED_ACTION.APPROVE:
      return {
        ...state,
        appliedForm: state.appliedForm.filter((el) => el.id !== payload.id),
      };
    default:
      return state;
  }
};

export default appliedReducer;
