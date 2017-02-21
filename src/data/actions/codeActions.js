export function getBedTypes() {
  return function(dispatch) {
    dispatch({
      type: "FETCHING_BED_TYPES"
    })

    fetch('api/codes/getBedTypes')
      .then((response) => {
        return response.json();
      })
      .then(function(json) {
        dispatch({type: "FETCH_BEDS_TYPES_FULFILLED", payload: {
          bedTypes: json.data
        }})
      })
      .catch((err) => {
        dispatch({type: "FETCH_BED_TYPES_FAILED", payload: err})
      })
  }
}
