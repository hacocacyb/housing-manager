import React from 'react'
import { render } from 'react-dom'
import Routes from './Routes.js'
import { shallow } from 'enzyme'
import { Router, Route } from 'react-router'
import createHistory from 'react-router/lib/createMemoryHistory'
import Dashboard from './modules/dashboard/Dashboard'
import Bed from './modules/bed/Bed.js'
import Building from './modules/building/Building.js'

describe('Router implementation', () => {
  let a, node
  const history = createHistory('/dashboard')
  node = shallow((
    <Router history={history} routes={Routes}/>
  ))

  it('absorbs routes from config', () => {
    let pathMap = {};
    const iterator = function(routes) {
      routes.forEach((route) => {
        if (route.childRoutes) {
          iterator(route.childRoutes)
        } else {
          pathMap[route.path] = route.component
        }
      })
    }
    iterator(node.props().router.routes)

    //small smapling
    expect(pathMap['/dashboard']).toEqual(Dashboard)
    expect(pathMap['/beds']).toEqual(Bed)
    expect(pathMap['/buildings']).toEqual(Building)

  })

  it('renders header', () => {
    const currentLoc = node.props().router.getCurrentLocation()
    expect(currentLoc.pathname).toEqual('/dashboard')
    history.push('/beds')
  })
  it('renders correct routes', () => {
    const currentLoc = node.props().router.getCurrentLocation()
    expect(currentLoc.pathname).toEqual('/beds')
  });

})
