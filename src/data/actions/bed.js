import { hashHistory } from 'react-router'

export function getAll() {
  return function(dispatch) {
    dispatch({
      type: "FETCHING_BEDS"
    })

    fetch('api/beds/getAll')
      .then((response) => {
        return response.json();
      })
      .then(function(json) {
        dispatch({type: "FETCH_BEDS_FULFILLED", payload: {
          beds: json.data
        }})
      })
      .catch((err) => {
        dispatch({type: "FETCH_BEDS_FAILED", payload: err})
      })
  }
}

export function getBed(id) {
  return function(dispatch) {
    dispatch({
      type: 'FETCHING_BED'
    })

    fetch('api/beds/getBed/' + id)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        dispatch({
          type: 'WORK_WITH_BED',
          payload: json.data
        })
      })
  }
}

export function removeCurrentBed() {
  return {
    type: "REMOVE_CURRENT_BED"
  }
}

export function saveBed(bed) {

  if (typeof bed.TypeId === 'object') {
    bed.TypeId = bed.TypeId.Id;
  }
  if (typeof bed.BuildingId === 'object') {
    bed.BuildingId = bed.BuildingId.Id
  }
  return function(dispatch) {
    dispatch({
      type: 'SAVING_BED'
    })

    fetch('api/beds', {
      method: 'PUT',
      body: JSON.stringify(bed)
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        hashHistory.push('/beds')
        dispatch({
          type: 'BED_SAVED',
          payload: json
        })
      })
      .catch((err) => {
        dispatch({type: "SAVING_BED_FAILED", payload: err})
      })
  }

}
