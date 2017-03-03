import jfmock from 'jest-fetch-mock'
fetch = jfmock
import * as Bed from './bed.js'
import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

const mockStore = configureMockStore([thunk])


describe('Bed Actions', () => {

  it('should create an action to get all', () => {
    fetch.mockResponseOnce(JSON.stringify([{
      "id": 1,
      "name": "asdf"
    }]))

    const expectedActions = [{
      type: 'FETCHING_BEDS'
    }, {
      type: "FETCH_BEDS_FULFILLED",
      payload: [{
        "id": 1,
        "name": "asdf"
      }]
    }]
    const store = mockStore({
      beds: []
    })
    return store.dispatch(Bed.getAll())
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
      .catch((err) => {
        console.log('Catch in mock store dispatch response!')
      })
  })

  it('should create an action to get a bed', () => {
    fetch.mockResponseOnce(JSON.stringify({
      "id": 1,
      "name": "asdf"
    }))

    const expectedActions = [{
      type: "FETCHING_BED"
    }, {
      type: "BED_FETCHED",
      payload: {
        "id": 1,
        "name": "asdf"
      }
    }]
    const store = mockStore({
      beds: []
    })
    return store.dispatch(Bed.getBed(1))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
      .catch((err) => {
        console.log('Catch in mock store dispatch response!')
      })
  })
})
