import styled from 'styled-components'

import Logo from './Logo'
import GitHub from './GitHub'
import Dribbble from './Dribbble'

export const Icon = styled.svg`
  height: ${props => props.size || 1}em;

  fill: currentColor;
`

export {
  Logo, GitHub, Dribbble,
}

export default {
  Logo, GitHub, Dribbble,
}
