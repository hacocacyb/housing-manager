import React from 'react'
import NavLink from './NavLink'
import { render } from 'react-dom'
import { shallow } from 'enzyme'
import { Router, Route } from 'react-router'
import createHistory from 'react-router/lib/createMemoryHistory'
import execSteps from '../../fn/testHelpers/execSteps'

/**
  Tests below similar to Link-tests on react-router, but wrapping my NavLink
**/
describe('NavLink', () => {
  const Hello = ({ params }) => (
    <div>Hello {params.name}!</div>
  )

  const Goodbye = () => (
    <div>Goodbye</div>
  )
  let node

  it('has its activeStyle', done => {
    const LinkWrapper = ({ children }) => (
      <div>
        <NavLink to="/hello">
          Link
        </NavLink>
        {children}
      </div>
    )
    let a
    const history = createHistory('/goodbye')
    const steps = [
      () => {
        a = node.querySelector('li')
        expect(a.hasClass('active')).toEqual(false)
        history.push('/hello')
      },
      () => {
        expect(a.hasClass('active')).toEqual(true)
      }
    ]

    const execNextStep = execSteps(steps, done)
    node = document.createElement('div')
    render((
      <Router history={history} onUpdate={execNextStep}>
        <Route path="/" component={LinkWrapper}>
          <Route path="hello" component={Hello} />
          <Route path="goodbye" component={Goodbye} />
        </Route>
      </Router>
    ), node, execNextStep)

  })
})
