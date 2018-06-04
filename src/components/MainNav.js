import React from 'react'
import styled, { css } from 'styled-components'
import { theme, darken } from 'style-utils'

import { Logo, GitHub, Dribbble } from 'components/icons'
import { Link } from 'components/lib'

const MainNav = styled.nav`
  height: 6em;
  padding: 2em;
`

const Left = styled.div`float: left;`
const Right = styled.div`
  padding: .25em 0;
  float: right;

  a {
    display: inline-block;
    margin-left: 1em;

    vertical-align: middle;
  }
`

const NavLink = Link.extend`
  transition: color .2s ease-out;

  &:hover {
    color: ${theme('colors','emphasis')};
    ${props => props.accent && css`
      color: ${props => darken(theme('colors','accent')(props), 10)};
    `}
  }
`

export default () => (
  <MainNav>
    <Left>
      <NavLink href="/"><Logo size={2} /></NavLink>
    </Left>
    <Right>
      <NavLink href="/">Projects</NavLink>
      <NavLink href="/about">About</NavLink>
      <NavLink accent href="/contact">Contact me</NavLink>
      <NavLink target="_blank" href="https://github.com/wouterraateland"><GitHub size={1.5} /></NavLink>
      <NavLink target="_blank" href="https://dribbble.com/wouterraateland"><Dribbble size={1.5} /></NavLink>
    </Right>
  </MainNav>
)
