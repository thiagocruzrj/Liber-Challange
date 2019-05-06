import { GET_REQUESTS, REQUEST_ERROR, ADD_REQUESTS } from '../actions/types';

const initialState = {
  requests: [],
  request: null,
  loading: true,
  error: {}
};

export default function(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_REQUESTS:
      return {
        ...state,
        requests: payload,
        loading: false
      };
    case ADD_REQUESTS:
      return {
        ...state,
        requests: [...state.requests, payload],
        loading: false
      };
    case REQUEST_ERROR:
      return {
        ...state,
        requests: payload,
        loading: false
      };
    default:
      return state;
  }
}
