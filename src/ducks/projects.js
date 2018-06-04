import { createReducer, createAsyncActionType } from './util'

// Action types
export const LOAD = createAsyncActionType('projects/LOAD')

// Action creators
export const loadSuccessful = project => ({
  type: LOAD.SUCCESS,
  payload: { project }
})

// Reducers
export const reducer = createReducer([], {
  [LOAD.SUCCESS]: (state, { project }) => [...state, project]
})

export default reducer
