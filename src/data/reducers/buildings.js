export default function buildings(state={
  fetching: false,
  fetched: false,
  current: undefined,
  data: [],
  byId: {},
  rowCount: 0
}, action) {
  let payload = action.payload;
  switch(action.type) {
    case "FETCHING_BUILDINGS": {

      return {...state, fetching: true, fetched: false, data: [],
      byId: {}};
    }
    case "FETCH_BUILDINGS_FULFILLED": {
      const byId = {}
      payload.forEach(p=>byId[p.id] = p);

      return {...state,
        fetching : false,
        fetched: true,
        data: payload,
        byId: byId
      };
    }
    case "FETCH_BUILDINGS_FAILED": {
      return {...state,
        fetching: false,
        fetched: false,
        data: [],
        byId: {}
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
