const apiRoot = '/api/payments/'
const actionNoun = 'PAYMENT'

export function getAll() {
  return function(dispatch) {
    dispatch({
      type: "FETCHING_" + actionNoun + 'S'
    })

    return fetch(apiRoot + 'getAll')
      .then((response) => {
        return response.json();
      })
      .then(function(json) {
        return dispatch({type: 'FETCH_' + actionNoun + 'S_FULFILLED', payload: json.data})
      })
      .catch((err) => {
        return dispatch({type: 'FETCH_' + actionNoun + 'S_FAILED', payload: err})
      })
  }
}

export function get(id) {
  return function(dispatch) {
    dispatch({
      type: 'FETCHING_' + actionNoun
    })

    return fetch(apiRoot + id)
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return dispatch({
          type: 'WORK_WITH_' + actionNoun,
          payload: json
        })
      })
  }
}

export function getPaymentsWidget() {
  return function(dispatch) {
    dispatch({
      type: 'FETCHING_' + actionNoun
    })

    return fetch('api/dashboard/billing')
      .then((response) => {
        return response.json();
      })
      .then((json) => {
        return dispatch({
          type: 'FETCHED_PAYMENT_WIDGET',
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

    return fetch(apiRoot, {
      method: 'PUT',
      body: JSON.stringify(obj)
    })
    .then((response) => {
      return response.json();
    })
    .then((json) => {
      if (json.success) {
        return dispatch({
          type: actionNoun + '_SAVED',
          payload: json
        })

      }
    })
    .catch((err) => {
      return dispatch({type: 'SAVING_' + actionNoun + '_FAILED', payload: err})
    })

  }
}
