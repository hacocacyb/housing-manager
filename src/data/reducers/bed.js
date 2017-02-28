export default function bedReducer(state={
  fetching: false,
  fetched: false,
  currentBed: undefined,
  byId: {},
  data: []
}, action) {
  let payload = action.payload;
  switch(action.type) {
    case "FETCHING_BEDS": {

      return {
        ...state,
        fetching: true,
        fetched: false,
        byId: {},
        data: []
      };
    }
    case "FETCH_BEDS_FULFILLED": {
      let byId = {}
      payload.forEach(function(bed) {
        byId[bed.id] = bed
      })
      return {
        ...state,
        fetching : false,
        fetched: true,
        byId: byId,
        data: payload
      };
    }
    case "FETCH_BEDS_FAILED": {
      return {...state,
        fetching: false,
        fetched: false,
        byId: {},
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
