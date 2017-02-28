export default function people(state={
  fetching: false,
  fetched: false,
  current: undefined,
  data: [],
  byId: {},
  rowCount: 0
}, action) {
  let payload = action.payload;
  switch(action.type) {
    case "FETCHING_PERSONS": {

      return {
        ...state,
        fetching: true,
        fetched: false,
        data: [],
        byId: {}
      };
    }
    case "FETCH_PERSONS_FULFILLED": {
      let byId = {};
      payload.forEach(p=>byId[p.id] = p);

      return {...state,
        fetching : false,
        fetched: true,
        data: payload,
        byId: byId
      };
    }
    case "FETCH_PERSONS_FAILED": {
      return {
        ...state,
        fetching: false,
        fetched: false,
        data: [],
        byId: {}
      };
    }
    case "REMOVE_CURRENT_PERSON": {
      return {
        ...state,
        current: undefined
      }
    }
    case "WORK_WITH_PERSON": {
      return {
        ...state,
        current: payload
      }
    }
    default:
      return state;
  }
}
