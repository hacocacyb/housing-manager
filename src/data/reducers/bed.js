export default function bedReducer(state={
  fetching: false,
  fetched: false,
  currentBed: undefined,
  data: []
}, action) {
  let payload = action.payload;
  switch(action.type) {
    case "FETCHING_BEDS": {

      return {...state, fetching: true, fetched: false, data: []};
    }
    case "FETCH_BEDS_FULFILLED": {
      const beds = payload.map(function(b) {
        b.display = b.name + ' - ' + b.type;
        if (b.occupied) {
          b.display += ' (Occupied)'
        }
        return b;
      })
      return {
        ...state,
        fetching : false,
        fetched: true,
        data: beds
      };
    }
    case "FETCH_BEDS_FAILED": {
      return {...state,
        fetching: false,
        fetcheed: false,
        data: []
      };
    }
    case "REMOVE_CURRENT_BED": {
      return {
        ...state,
        currentBed: undefined
      }
    }
    case "WORK_WITH_BED": {

      return {
        ...state,
        currentBed: payload
      }
    }
    default:
      return state;
  }
}
