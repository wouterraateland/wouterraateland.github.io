import React from 'react'
import styled from 'styled-components'
import { translate, Trans } from 'react-i18next'

import { Text, H1, Row, Column } from 'components/lib'

import MainNav from 'components/MainNav'
import Projects from 'containers/Projects'

const Page = styled.div`
  background: linear-gradient(transparent, #f9f9f9 100vh);
  background-color: ${props => props.theme.colors.background};
`

const PageBody = styled.div`
  padding: 2em;
`

const HomePage = ({t}) => (
  <Page>
    <MainNav />
    <PageBody>
      <Row>
        <Column size={12}>
          <Text>Wouter Raateland — Webdesigner and Developer</Text>
          <H1 small>Hi there! <strong>I create scalable web-based produts that resonate with their users.</strong></H1>
        </Column>
      </Row>
      <Row>
        <Column size={12}>
          <Text size={.75}>Check out my selected projects</Text>
        </Column>
      </Row>
      <Projects />
    </PageBody>
  </Page>
)

export default translate('page')(HomePage)
