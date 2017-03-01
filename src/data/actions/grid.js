export function setGridState(gridName, gridState) {
  return {
    type: "UPDATE_COL_DEF",
    payload: {
      gridName,
      gridState
    }
  }
}
