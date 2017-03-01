import { hashHistory } from 'react-router'

const apiRoot = '/api/buildings'
const actionNoun = 'BUILDING'

export function getAll() {
  return function(dispatch) {
    dispatch({
      type: "FETCHING_" + actionNoun + 'S'
    })

    fetch(apiRoot)
      .then((response) => {
        return response.json()
      })
      .then(function(json) {
        dispatch({
          type: 'FETCH_' + actionNoun + 'S_FULFILLED',
          payload: json
        })
      })
      .catch((err) => {
        dispatch({type: 'FETCH_' + actionNoun + 'S_FAILED', payload: err})
      })
  }
}

export function get(id, byForce) {
  return function(dispatch, getState) {
    dispatch({
      type: 'FETCHING_' + actionNoun
    })

    if (byForce) {
      fetchById(id, dispatch)
    } else {
      const state = getState()
      const localBuilding = state.buildings.byId[id]
      if (localBuilding) {
        dispatch({
          type: 'BUILDING_FETCHED',
          payload: localBuilding
        })
      } else {
        fetchById(id, dispatch)
      }
    }
  }
}
function fetchById(id, dispatch) {
  fetch(apiRoot + '/' + id).then((response) => {
    return response.json();
  }).then((json) => {
    dispatch({
      type: 'BUILDING_FETCHED',
      payload: json
    })
  })
}

export function removeCurrent() {
  return {
    type: 'REMOVE_CURRENT_' + actionNoun,
  }
}

export function save(obj) {

  return function(dispatch) {
    return new Promise(function(resolve, reject) {
      dispatch({
        type: 'SAVING_'+ actionNoun
      })

      fetch(apiRoot, {
        method: 'PUT',
        body: JSON.stringify(obj)
      }).then((response) => {
        return response.json();
      }).then((json) => {
        if (json.success) {
          hashHistory.push('/buildings');
          dispatch({
            type: actionNoun + '_SAVED'
          })
          getAll()
          resolve()
        }
      }).catch((err) => {
        reject(err)
        dispatch({type: 'SAVING_' + actionNoun + '_FAILED', payload: err})
      })
    })

  }
}
