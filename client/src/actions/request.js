import axios from 'axios';
import { setAlert } from './alert';
import { GET_REQUESTS, REQUEST_ERROR, ADD_REQUESTS } from './types';

// Get requests
export const getRequests = () => async dispatch => {
  try {
    const res = await axios.get('/api/request');

    dispatch({
      type: GET_REQUESTS,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

// Add Request
export const addRequest = formData => async dispatch => {
  const config = {
    headers: {
      'Content-Type': 'application/json'
    }
  };

  try {
    const res = await axios.post('/api/request', formData, config);

    dispatch({
      type: ADD_REQUESTS,
      payload: res.data
    });

    dispatch(setAlert('Request Created', 'success'));
  } catch (err) {
    dispatch({
      type: REQUEST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};
