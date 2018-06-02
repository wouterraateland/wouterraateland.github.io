import styled from 'styled-components'
import { opacity } from 'style-utils'

const Title = level => styled[`h${level}`]`
  color: ${props => opacity(props.theme.colors.text, props.theme.opacity.titles)};
`

export default Title
