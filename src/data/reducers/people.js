export default function people(state={
  fetching: false,
  fetched: false,
  current: undefined,
  data: [],
  rowCount: 0
}, action) {
  let payload = action.payload;
  switch(action.type) {
    case "FETCHING_PERSONS": {

      return {...state, fetching: true, fetched: false, data: []};
    }
    case "FETCH_PERSONS_FULFILLED": {
      payload.forEach(function(p) {
        let middle = p.Middle ? ' ' + p.Middle + ' ' : ' ';
        p.FullName = p.First + middle + p.Last
      })
      return {...state,
        fetching : false,
        fetched: true,
        data: payload
      };
    }
    case "FETCH_PERSONS_FAILED": {
      return {...state,
        fetching: false,
        fetcheed: false,
        data: []
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
