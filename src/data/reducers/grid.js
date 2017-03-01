export default function grids(state={

}, action) {
  let payload = action.payload;
  switch(action.type) {
    case "UPDATE_COL_DEF": {
      let grid = payload.gridName
      let gridState = payload.gridState
      let nextState = {...state}
      nextState[grid] = gridState
      return nextState
    }
    default:
      return state;
  }
}
