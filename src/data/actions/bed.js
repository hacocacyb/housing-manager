import { hashHistory } from 'react-router'

export function getAll() {
  return function(dispatch) {
    dispatch({
      type: "FETCHING_BEDS"
    })

    return fetch('api/beds')
      .then((response) => {
        return response.json();
      })
      .then(function(json) {
        dispatch({type: "FETCH_BEDS_FULFILLED", payload: json})
      })
      .catch((err) => {
        dispatch({type: "FETCH_BEDS_FAILED", payload: err})
      })
  }
}

export function getBed(id, byForce) {
  return function(dispatch,getState) {
    dispatch({
      type: 'FETCHING_BED'
    })
    if (byForce) {
      return fetchById(id, dispatch)
    } else {
      const state = getState();
      const byId = state.beds.byId || {};
      const localBed = byId[id];
      if (localBed) {
        return new Promise((resolve, reject) => {
          dispatch({
            type: 'BED_FETCHED',
            payload: localBed
          })
          resolve()
        })
      } else {
        return fetchById(id, dispatch)
      }
    }
  }
}
function fetchById(id, dispatch) {
  return fetch('api/beds/' + id).then((response) => {
    return response.json();
  }).then((json) => {
    dispatch({
      type: 'BED_FETCHED',
      payload: json
    })
  }).catch(err => {
    dispatch({
      type: 'FETCH_BED_ERROR'
    })
  })
}
export function removeCurrentBed() {
  return {
    type: "REMOVE_CURRENT_BED"
  }
}

export function saveBed(bed) {

  return function(dispatch) {
    dispatch({
      type: 'SAVING_BED'
    })

    return fetch('api/beds', {
      method: 'PUT',
      body: JSON.stringify(bed)
    }).then((response) => {
      return response.json();
    }).then((json) => {
      hashHistory.push('/beds')
      return dispatch({
        type: 'BED_SAVED',
        payload: json
      })
    }).catch((err) => {
      return dispatch({type: "SAVING_BED_FAILED", payload: err})
    })
  }

}
