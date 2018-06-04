import React from 'react'
import styled from 'styled-components'
import { theme } from 'style-utils'

import { Row, Column, Image, H2, Text } from 'components/lib'

const Project = Row.extend`
  display: flex;
  margin-bottom: 2em;
`

const ProjectThumbnail = styled.div`
  padding-bottom: 56.25%;
  border-radius: ${theme('border','radius')};

  background: url(${props => props.background}) no-repeat center / 100%;
  filter: grayscale(100%);

  transition-property: background-size, filter;
  transition-duration: .3s;
  transition-timing-function: ease-out;

  ${Project}:hover & {
    background-size: 105%;
    filter: none;
  }
`

const ProjectInfo = Column.extend`
  position: relative;
`
const ProjectID = Text.extend`
  margin: 0;

  transform: scale(.75);
  transform-origin: left top;

  transition: transform .3s ease-out;

  ${Project}:hover & {
    transform: none;
  }
`

const ProjectTitle = H2.extend`
  margin: 0;
  opacity: .5;

  transition: opacity .3s .15s ease-out;

  ${Project}:hover & {
    opacity: 1;
  }
`
const ProjectTags = Text.extend`
  margin-top: 0;
  opacity: 0;

  transition: opacity .3s .25s ease-out;

  ${Project}:hover & {
    opacity: 1;
  }
`

const ProjectDescription = Text.extend`
  position: absolute;
  bottom: -2em;

  margin-bottom: 0;
  max-width: 20em;

  opacity: 0;

  transition-property: bottom, opacity;
  transition-duration: .3s;
  transition-timing-function: ease-out;
  transition-delay: .35s;

  ${Project}:hover & {
    opacity: 1;

    bottom: 0;
  }
`

export default ({id,title,tags,description,image}) => (
  <Project>
    <Column size={8}>
      <ProjectThumbnail background={image} />
    </Column>
    <ProjectInfo size={4}>
      <ProjectID size={1.5}><em>0{id+1}</em></ProjectID>
      <ProjectTitle><strong>{title}</strong></ProjectTitle>
      <ProjectTags size={.75} emphasis>{tags.join(" / ")}</ProjectTags>
      <ProjectDescription>{description}</ProjectDescription>
    </ProjectInfo>
  </Project>
)
