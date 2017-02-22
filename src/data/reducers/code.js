export default function codeReducer(state={
  bedTypes: []
}, action) {
  let payload = action.payload;
  switch(action.type) {
    case "FETCH_BEDS_TYPES_FULFILLED": {

      return {...state,
        bedTypes : payload.bedTypes
      };
    }
    default:
      return state;
  }
}
