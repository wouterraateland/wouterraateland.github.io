import React from 'react'
import styled from 'styled-components'

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

export default () => (
  <MainNav>
    <Left>
      <Link to="/"><Logo size={2} /></Link>
    </Left>
    <Right>
      <Link to="/">Projects</Link>
      <Link to="/about">About</Link>
      <Link accent to="/contact">Contact me</Link>
      <Link target="_blank" to="https://github.com/wouterraateland"><GitHub size={1.5} /></Link>
      <Link target="_blank" to="https://dribbble.com/wouterraateland"><Dribbble size={1.5} /></Link>
    </Right>
  </MainNav>
)
