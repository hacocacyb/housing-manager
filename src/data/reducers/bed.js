export default function bedReducer(state={
  fetching: false,
  fetched: false,
  current: undefined,
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
        current: undefined
      }
    }
    case "BED_FETCHED": {
      let newId = payload.id;
      let data = state.data.map((item)=> {
        if (item.id === newId) {
          return payload
        }
        return item
      })
      const byId = {...state.byId}
      byId[newId] = payload;

      return {
        ...state,
        byId: byId,
        data: data,
        current: payload
      }
    }
    default:
      return state;
  }
}
