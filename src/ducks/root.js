import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import window from './window'
import modals from './modals'

import projects from './projects'

const standardReducers = {
  router,
  window,
  modals
}

export const reducer = combineReducers({
  ...standardReducers,
  projects
})

export default reducer
