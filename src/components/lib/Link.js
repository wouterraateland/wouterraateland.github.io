import styled, { css } from 'styled-components'

export default styled.a`
  display: inline-block;

  text-decoration: none;

  color: currentColor;
  ${props => props.primary && css`color: ${props.theme.colors.primary};`}
  ${props => props.accent && css`color: ${props.theme.colors.accent};`}
`
