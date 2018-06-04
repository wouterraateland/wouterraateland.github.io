import styled, { css } from 'styled-components'
import { theme } from 'style-utils'

const Title = level => styled[`h${level}`]`
  ${props => props.small && css`max-width: 12.5em;`}
  ${props => props.medium && css`max-width: 17.5em;`}
  ${props => props.wide && css`max-width: 22.5em;`}

  line-height: ${theme("lineHeight")};

  color: ${theme("colors", "text")};

  strong {
    color: ${theme("colors", "emphasis")};
  }
`

export const H1 = Title(1)
export const H2 = Title(2)
export const H3 = Title(3)
export const H4 = Title(4)
export const H5 = Title(5)
export const H6 = Title(6)

export default Title
