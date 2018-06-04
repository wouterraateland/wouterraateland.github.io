import React from 'react'
import { connect } from 'react-redux'

import Project from 'components/Project'

const Projects = ({projects}) => (
  <div>
    {projects.map((project,i) => <Project key={i} id={i} {...project} />)}
  </div>
)

const mapStateToProps = state => ({
  projects: state.projects
})

export default connect(
  mapStateToProps
)(Projects)
