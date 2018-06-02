import styled, { css } from 'styled-components'

const Wrapper = styled.div`
  max-width: 60em;
  margin-left: auto;
  margin-right: auto;

  ${props => !props.nopadding && css`
    padding-left: 2em;
    padding-right: 2em;
  `}

  ${props => props.small  && css`max-width: 30em;`}
  ${props => props.medium && css`max-width: 45em;`}
  ${props => props.xlarge  && css`max-width: 75em;`}
`

export default Wrapper
