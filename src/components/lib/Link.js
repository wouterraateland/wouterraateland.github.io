import styled, { css } from 'styled-components'

const Link = styled.a`
  display: inline-block;

  color: currentColor;
  ${props => props.primary && css`color: ${props.theme.colors.primary};`}
  ${props => props.accent && css`color: ${props.theme.colors.accent};`}
`

export default Link
