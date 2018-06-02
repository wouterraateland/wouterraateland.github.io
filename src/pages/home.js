import React from 'react'
import styled from 'styled-components'
import { translate, Trans } from 'react-i18next'

import { Text } from 'components/lib'

const Page = styled.div`
  background-color: ${props => props.theme.colors.background};
`

const HomePage = ({t}) => (
  <Page>
    <Text>Hello world</Text>
  </Page>
)

export default translate('page')(HomePage)
