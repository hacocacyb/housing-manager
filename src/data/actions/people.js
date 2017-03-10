import { hashHistory } from 'react-router'

const apiRoot = '/api/people'

export function getAll() {
  return function(dispatch) {
    dispatch({
      type: 'FETCHING_PERSONS'
    })

    fetch(apiRoot)
      .then((response) => {
        return response.json();
      })
      .then(function(json) {
        dispatch({type: 'FETCH_PERSONS_FULFILLED', payload: json})
      })
      .catch((err) => {
        dispatch({type: 'FETCH_PERSONS_FAILED', payload: err})
      })
  }
}

export function get(id, byForce) {
  return function(dispatch, getState) {
    dispatch({
      type: 'FETCHING_PERSON'
    })

    if (byForce) {
      return fetchById(id, dispatch)
    } else {
      const state = getState()
      const localPerson = state.people.byId[id]
      if (localPerson) {
        return dispatch({
          type: 'PERSON_FETCHED',
          payload: localPerson
        })
      } else {
        return fetchById(id, dispatch);
      }
    }
  }
}
function fetchById(id, dispatch) {
  return fetch(apiRoot + '/' + id).then((response) => {
    return response.json();
  }).then((json) => {
    dispatch({
      type: 'PERSON_FETCHED',
      payload: json
    })
  })
}
export function removeCurrent() {
  return {
    type: 'REMOVE_CURRENT_PERSON',
  }
}

export function save(obj) {
  return function(dispatch) {
    dispatch({
      type: 'SAVING_PERSON'
    })

    return fetch(apiRoot, {
      method: 'PUT',
      body: JSON.stringify(obj)
    }).then((response) => {
      return response.json();
    }).then((json) => {
      if (json) {
        hashHistory.push('/people');
        dispatch({
          type: 'PERSON_SAVED',
          payload: json
        })
      }
    }).catch((err) => {
      dispatch({type: 'SAVING_PERSON_FAILED', payload: err})
    })
  }
}
