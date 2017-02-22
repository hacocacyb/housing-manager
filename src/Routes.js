import Layout from './modules/Layout'
import Beds from './modules/Bed'
import BedEdit from './modules/BedEdit'
import Rooms from './modules/Room'
import Buildings from './modules/Building'
import BuildingEdit from './modules/BuildingEdit'
import People from './modules/People'
import PeopleEdit from './modules/PeopleEdit'
import Visit from './modules/Visit'
import VisitEdit from './modules/VisitEdit'
import Payment from './modules/Payment'

const routes = {
  path: '/',
  component: Layout,
  indexRoute: {
    onEnter: (nextState, replace) => {
      replace('/beds')
    }
  },
  childRoutes: [{
    path: '/beds',
    component : Beds
  }, {
    path: '/beds/edit(/:Id)',
    component: BedEdit
  }, {
    path: '/rooms',
    component: Rooms
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
    path: '/payment(:/id)',
    component: Payment
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
        replace('/beds')
      }
    }
  }]
}

module.exports = routes;
