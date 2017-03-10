import { hashHistory } from 'react-router'
import { getBed } from './bed'
import { get as getBuilding } from './building'
import { get as getPerson } from './people.js'

const apiRoot = '/api/visits'
const actionNoun = 'VISIT'


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
  return function(dispatch, getState) {
    dispatch({
      type: 'FETCHING_' + actionNoun
    })

    fetch(apiRoot + '/' + id).then((response) => {
      return response.json();
    }).then((json) => {
      dispatch({
        type: 'WORK_WITH_' + actionNoun,
        payload: json
      })
    }).catch((err) => {
      dispatch({type: 'FETCH_' + actionNoun + 'S_FAILED', payload: err})
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

    return fetch(apiRoot, {
      method: 'PUT',
      body: JSON.stringify(obj)
    })
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        if (json.success) {
          hashHistory.push('/visits');

          dispatch(getBed(obj.bedId, true))
          dispatch(getBuilding(obj.buildingId, true))
          dispatch(getPerson(obj.personId, true))

          dispatch({
            type: actionNoun + '_SAVED',
            payload: json
          })
        } else {
          //alert user of errors
        }
      })
      .catch((err) => {
        dispatch({type: 'SAVING_' + actionNoun + '_FAILED', payload: err})
      })
  }
}
