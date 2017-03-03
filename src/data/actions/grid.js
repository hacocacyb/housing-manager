export function setGridState(gridName, gridState) {
  return {
    type: "UPDATE_GRID_STATE",
    payload: {
      gridName,
      gridState
    }
  }
}
