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
export const TAKE_ITEM = 'TAKE_ITEM'
export const TAKE_ITEM_SUCCESS = 'TAKE_ITEM_SUCCESS'
export const TAKE_ITEM_FAILURE = 'TAKE_ITEM_FAILURE'
export const SELL_ITEMS = 'SELL_ITEMS'
export const SELL_ITEMS_SUCCESS = 'SELL_SUCCESS'
export const SELL_ITEMS_FAILURE = 'SELL_FAILURE'
export const DROP_ITEM = 'DROP_ITEM'
export const DROP_ITEM_SUCCESS = 'DROP_ITEM_SUCCESS'
export const DROP_ITEM_FAILURE = 'DROP_ITEM_FAILURE'
export const PRAY = 'PRAY'
export const PRAY_SUCCESS = 'PRAY_SUCCESS'
export const PRAY_FAILURE = 'PRAY_FAILURE'

let config = {
    'Content-Type': 'Application/JSON'
  };

  axios.interceptors.request.use(
    options => {
      options.headers.authorization = `Token 012d6dc740a0af2c6321ccf5c2754d1eba3ba1bc`
    return options},
    error => {return Promise.reject(error)}
  )

export const move = (direction, id) => dispatch => {
    dispatch({type: MOVE_START})
    axios
        .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/move/', {headers: config, direction: direction} )
        .then(res => dispatch({type: MOVE_SUCCESS, payload: res.data}))
        .catch(err => dispatch({type: MOVE_FAILURE, payload: err}))
}

export const moveSmarter = (direction, id) => dispatch => {
  dispatch({type: MOVE_START})
  axios
      .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/move/', {headers: config, direction: direction, next_room_id: id} )
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

export const takeItem = (name) => dispatch => {
    dispatch({type: TAKE_ITEM})
    axios
        .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/take/', {headers: config, name: name})
        .then(res => dispatch({type: TAKE_ITEM_SUCCESS, payload: res.data}))
        .catch(err => dispatch({type: TAKE_ITEM_FAILURE, payload: err}))
}

export const sellItem = (name) => dispatch => {
    dispatch({type: SELL_ITEMS})
    axios
        .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/sell', {headers: config, name: name, confirm: 'yes'})
        .then(res => dispatch({type: SELL_ITEMS_SUCCESS, payload: res.data}))
        .catch(err => dispatch({type: SELL_ITEMS_FAILURE, payload: err}))
}

export const dropItem = (name) => dispatch => {
    dispatch({type: DROP_ITEM})
    axios
        .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/drop', {headers: config, name: name})
        .then(res => dispatch({type: DROP_ITEM_SUCCESS, payload: res.data}))
        .catch(err => dispatch({type: DROP_ITEM_FAILURE, payload: err}))
}

export const pray = () => dispatch => {
    dispatch({type: PRAY})
    axios
        .post('https://lambda-treasure-hunt.herokuapp.com/api/adv/pray', {headers: config})
        .then(res => dispatch({type: PRAY_SUCCESS, payload: res.data}))
        .catch(err => dispatch({type: PRAY_FAILURE, payload: err}))
}