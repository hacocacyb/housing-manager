export default function payments(state={
  fetching: false,
  fetched: false,
  current: undefined,
  currentPayments: undefined,
  widgetData: null,
  data: [],
  rowCount: 0
}, action) {
  let payload = action.payload;
  switch(action.type) {
    case "FETCHING_PAYMENTS": {

      return {...state, fetching: true, fetched: false, data: []};
    }
    case "FETCH_PAYMENTS_FULFILLED": {

      return {...state,
        fetching : false,
        fetched: true,
        data: payload
      };
    }
    case "FETCH_PAYMENTS_FAILED": {
      return {...state,
        fetching: false,
        fetcheed: false,
        data: []
      };
    }
    case "REMOVE_CURRENT_PAYMENT": {
      return {
        ...state,
        current: undefined
      }
    }
    case "WORK_WITH_PAYMENT": {

      return {
        ...state,
        currentPayments: payload
      }
    }
    case "FETCHED_PAYMENT_WIDGET": {
      return {
        ...state,
        widgetData: payload
      }
    }
    default:
      return state;
  }
}
