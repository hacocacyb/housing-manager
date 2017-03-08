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

    case "PERSON_FETCHED": {
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
    case "REMOVE_CURRENT_PERSON": {
      return {
        ...state,
        current: undefined
      }
    }
    default:
      return state;
  }
}
