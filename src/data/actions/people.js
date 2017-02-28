import { hashHistory } from 'react-router'

const apiRoot = '/api/people'
const actionNoun = 'PERSON'

export function getAll() {
  return function(dispatch) {
    dispatch({
      type: "FETCHING_" + actionNoun + 'S'
    })

    fetch(apiRoot)
      .then((response) => {
        return response.json();
      })
      .then(function(json) {
        dispatch({type: 'FETCH_' + actionNoun + 'S_FULFILLED', payload: json})
      })
      .catch((err) => {
        dispatch({type: 'FETCH_' + actionNoun + 'S_FAILED', payload: err})
      })
  }
}

export function get(id) {
  return function(dispatch) {
    dispatch({
      type: 'FETCHING_' + actionNoun
    })

    fetch(apiRoot + '/' + id)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch({
          type: 'WORK_WITH_' + actionNoun,
          payload: json
        })
      })
  }
}

export function removeCurrent() {
  return {
    type: 'REMOVE_CURRENT_' + actionNoun,
  }
}

export function save(obj) {

  return function(dispatch) {
    dispatch({
      type: 'SAVING_'+ actionNoun
    })

    fetch(apiRoot, {
      method: 'PUT',
      body: JSON.stringify(obj)
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json) {
          hashHistory.push('/people');
          dispatch({
            type: actionNoun + '_SAVED',
            payload: json
          })
        }
      })
      .catch((err) => {
        dispatch({type: 'SAVING_' + actionNoun + '_FAILED', payload: err})
      })
  }
}
