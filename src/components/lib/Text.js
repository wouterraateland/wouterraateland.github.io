import styled, { css } from 'styled-components'

const Text = styled.p`
  line-height: ${props => props.theme.lineHeight};
  color: ${props => props.theme.colors.text};

  ${props => props.size && css`font-size: ${props.size}em;`}

  ${props => props.emphasis && css`color: ${props.theme.colors.emphasis};`}
  ${props => props.accent && css`color: ${props.theme.colors.accent};`}

  ${props => props.center && css`text-align: center;`}
`

export default Text
