import styled from 'styled-components'

const Row = styled.div`
  margin-left: -${props => props.theme.columns.gap};
  margin-right: -${props => props.theme.columns.gap};

  &:after {
    content: '';
    display: block;
    clear: both;
  }
`

export default Row
