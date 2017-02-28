export default function visits(state={
  fetching: false,
  fetched: false,
  current: undefined,
  data: [],
  rowCount: 0
}, action) {
  let payload = action.payload;
  switch(action.type) {
    case "FETCHING_VISITS": {

      return {...state, fetching: true, fetched: false, data: []};
    }
    case "FETCH_VISITS_FULFILLED": {
      const visits = payload.map(function(v) {
        v.display = v.first + ' ' + v.last + ' (' + v.buildingName + ')'
        return v;
      })
      return {
        ...state,
        fetching : false,
        fetched: true,
        data: visits
      };
    }
    case "FETCH_VISITS_FAILED": {
      return {...state,
        fetching: false,
        fetcheed: false,
        data: []
      };
    }
    case "REMOVE_CURRENT_VISIT": {
      return {
        ...state,
        current: undefined
      }
    }
    case "WORK_WITH_VISIT": {
      return {
        ...state,
        current: payload
      }
    }
    default:
      return state;
  }
}
