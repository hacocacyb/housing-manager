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
      const beds = payload.beds.map(function(b) {
        b.Display = b.Name + ' - ' + b.Type;
        if (b.Occupied) {
          b.Display += ' (Occupied)'
        }
        return b;
      })

      return {...state,
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
      if (payload.length > 0) {
        payload = payload[0]
      }
      return {
        ...state,
        currentBed: payload
      }
    }
    default:
      return state;
  }
}
