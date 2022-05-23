import styled from 'styled-components'

export const Container = styled.div`
  padding: ${(props) => (props.hideHeaderFooter ? '0' : '0 0 0')};
  height: 100%;
  @media (max-width: 767px) {
    padding: ${(props) => (props.hideHeaderFooter ? '0' : '0 0 0')};
  }
`
