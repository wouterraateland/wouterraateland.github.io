import { fork, put, call } from 'redux-saga/effects'

import projects from 'assets/projects.json'

import * as Projects from 'ducks/projects'

async function loadImage(project) {
  const image = await import(`assets/cases/${project.image}/cover.jpg`)
  return {...project, image}
}

function* projectLoadSaga(project) {
  const p = yield call(loadImage, project)
  yield put(Projects.loadSuccessful(p))
}

export function* saga() {
  for (let project of projects) {
    yield fork(projectLoadSaga, project)
  }
}

export default saga
