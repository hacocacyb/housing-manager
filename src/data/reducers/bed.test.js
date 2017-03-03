import reducer from './bed'
import Actions from '../actions/bed'

describe('beds reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      fetching: false,
      fetched: false,
      current: undefined,
      byId: {},
      data: []
    })
  })
})
