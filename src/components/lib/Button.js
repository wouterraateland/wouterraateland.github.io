import styled, { css } from 'styled-components'
import { darken, opacity } from 'style-utils'

const Button = styled.button`
  ${props => props.block && css`
    display: block;
    width: 100%;
  `}

  border-color: ${props => opacity(props.theme.colors.text, props.theme.opacity.text)};
  border-width: ${props => props.theme.border.width};
  border-radius: ${props => props.theme.border.radius};

  background: transparent;

  ${props => props.primary && css`
    border-color: ${props.theme.colors.primary};
    background-color: ${props.theme.colors.primary};
    color: ${props.theme.colors.background};
  `}

  ${props => props.small && css`padding: .25em .125em;`}
  ${props => props.medium && css`padding: .5em .25em;`}
  ${props => props.large && css`padding: .7em .5em;`}

  &:hover {
    cursor: pointer;
    ${props => props.primary && css`
      border-color: ${darken(props.theme.colors.primary, 10)};
      background-color: ${darken(props.theme.colors.primary, 10)};
    `}
  }
`

export default Button
