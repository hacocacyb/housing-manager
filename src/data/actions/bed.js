import { hashHistory } from 'react-router'

export function getAll() {
  return function(dispatch) {
    dispatch({
      type: "FETCHING_BEDS"
    })

    fetch('api/beds')
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

export function getBed(id) {
  return function(dispatch,getState) {
    dispatch({
      type: 'FETCHING_BED'
    })

    const state = getState();
    const localBed = state.beds.byId[id];
    if (localBed) {
      dispatch({
        type: 'WORK_WITH_BED',
        payload: localBed
      })
    } else {

      fetch('api/beds/' + id).then((response) => {
        return response.json();
      }).then((json) => {
        dispatch({
          type: 'WORK_WITH_BED',
          payload: json
        })
      })
    }

  }
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

    fetch('api/beds', {
      method: 'PUT',
      body: JSON.stringify(bed)
    }).then((response) => {
      return response.json();
    }).then((json) => {
      hashHistory.push('/beds')
      dispatch({
        type: 'BED_SAVED',
        payload: json
      })
    }).catch((err) => {
      dispatch({type: "SAVING_BED_FAILED", payload: err})
    })
  }

}
