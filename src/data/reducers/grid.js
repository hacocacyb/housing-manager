let firstState = {}
if (typeof localStorage !== 'undefined') {
  try {
    firstState = JSON.parse(localStorage.gridState) || {};
  } catch(e) {}
}

export default function grids(state=firstState, action) {
  let payload = action.payload;
  switch(action.type) {
    case "UPDATE_GRID_STATE": {
      let grid = payload.gridName
      let gridState = payload.gridState
      let nextState = {...state}
      nextState[grid] = gridState
      if (localStorage) {
        localStorage.setItem('gridState', JSON.stringify(nextState))
      }
      return nextState
    }
    default:
      return state;
  }
}
