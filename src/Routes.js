import Layout from './modules/layout/Layout'
import Beds from './modules/bed/Bed'
import BedEdit from './modules/bed/BedEdit'
import Buildings from './modules/building/Building'
import BuildingEdit from './modules/building/BuildingEdit'
import People from './modules/people/People'
import PeopleEdit from './modules/people/PeopleEdit'
import Visit from './modules/visit/Visit'
import VisitEdit from './modules/visit/VisitEdit'
import Payment from './modules/payment/Payment'
import Dashboard from './modules/dashboard/Dashboard'
import About from './modules/About'

const routes = {
  path: '/',
  component: Layout,
  indexRoute: {
    onEnter: (nextState, replace) => {
      replace('/dashboard')
    }
  },
  childRoutes: [{
    path: '/about',
    component : About
  }, {
    path: '/beds',
    component : Beds
  }, {
    path: '/beds/edit(/:Id)',
    component: BedEdit
  }, {
    path: '/dashboard',
    component: Dashboard
  }, {
    path: '/buildings',
    component: Buildings
  }, {
    path: '/buildings/edit(/:Id)',
    component: BuildingEdit
  }, {
    path: '/people',
    component : People
  }, {
    path: '/people/edit(/:Id)',
    component: PeopleEdit
  }, {
    path: '/payment',
    component: Payment,
    childRoutes: [{
      path: ':VisitId',
      component: Payment
    }]
  }, {
    path: '/visits',
    component : Visit
  }, {
    path: '/visits/edit(/:Id)',
    component: VisitEdit
  }, {
    path: '*',
    indexRoute: {
      onEnter: (nextState, replace) => {
        replace('/dashboard')
      }
    }
  }]
}

module.exports = routes;
