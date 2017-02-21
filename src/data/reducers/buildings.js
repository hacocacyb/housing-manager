export default function buildings(state={
  fetching: false,
  fetched: false,
  current: undefined,
  data: [],
  rowCount: 0
}, action) {
  let payload = action.payload;
  switch(action.type) {
    case "FETCHING_BUILDINGS": {

      return {...state, fetching: true, fetched: false, data: []};
    }
    case "FETCH_BUILDINGS_FULFILLED": {

      return {...state,
        fetching : false,
        fetched: true,
        data: payload
      };
    }
    case "FETCH_BUILDINGS_FAILED": {
      return {...state,
        fetching: false,
        fetcheed: false,
        data: []
      };
    }
    case "REMOVE_CURRENT_BUILDING": {
      return {
        ...state,
        current: undefined
      }
    }
    case "WORK_WITH_BUILDING": {

      return {
        ...state,
        current: payload
      }
    }
    default:
      return state;
  }
}
