import axios from 'axios';

export const MOVE_START = 'MOVE_START'
export const MOVE_SUCCESS = 'MOVE_SUCCESS'
export const MOVE_FAILURE = 'MOVE_FAILURE'
export const FETCH_STATUS_START = 'FETCH_STATUS_START'
export const FETCH_STATUS_SUCCESS = 'FETCH_STATUS_SUCCESS'
export const FETCH_FAILURE = 'FETCH_FAILURE'
export const FETCH_LOCATION_START = 'FETCH_LOCATION_START'
export const FETCH_LOCATION_SUCCESS = 'FETCH_LOCATION_SUCCESS'
export const UPDATE_MAP = 'UPDATE_MAP'
export const UPDATE_MAP_SUCCESS = 'UPDATE_MAP_SUCCESS'
export const UPDATE_FAILURE = 'UPDATE_FAILURE'

let config = {
    'Content-Type': 'Application/JSON'
  };

  axios.interceptors.request.use(
    options => {
      options.headers.authorization = `Token 012d6dc740a0af2c6321ccf5c2754d1eba3ba1bc`
    return options},
    error => {return Promise.reject(error)}
  )

export const move = (direction) => dispatch => {
    dispatch({type: MOVE_START})
    axios
        .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/move/', {headers: config, direction: direction} )
        .then(res => dispatch({type: MOVE_SUCCESS, payload: res.data}))
        .catch(err => dispatch({type: MOVE_FAILURE, payload: err}))
}

export const fetchStatus = () => dispatch => {
    dispatch({type: FETCH_STATUS_START})
    axios
        .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/status', {headers: config})
        .then(res => dispatch({type: FETCH_STATUS_SUCCESS, payload: res.data}))
        .catch(err => dispatch({type: FETCH_FAILURE, payload: err}))
}

export const fetchLocation = () => dispatch => {
    dispatch({type: FETCH_LOCATION_START})
    axios
        .get('https://lambda-treasure-hunt.herokuapp.com/api/adv/init', {headers: config})
        .then(res => dispatch({type: FETCH_LOCATION_SUCCESS, payload: res.data}))
        .catch(err => dispatch({type: FETCH_FAILURE, payload: err}))
}

export const updateMap = () => dispatch => {
    dispatch({type: UPDATE_MAP})
    axios
        .get('https://lambda-treasure-hunt.herokuapp.com/api/adv/init', {headers: config})
        .then(res => dispatch({type: UPDATE_MAP_SUCCESS, payload: res.data}))
        .catch(err => dispatch({type: UPDATE_FAILURE, payload: err}))
}