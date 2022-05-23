import styled from 'styled-components'

export const ContentWrapper = styled.div`
  position: relative;
  margin: 0 0 30px;
  padding: 30px;
  background: #ffffff;
  display: flex;
  box-shadow: 1px 1px 6px rgb(0 0 0 / 10%);
  @media (max-width: 767px) {
    padding: 15px;
    flex-direction: column;
    align-items: center;
  }
`

export const ImgSecWrap = styled.div`
  width: 235px;
  height: 235px;
  background: ${(props) => (props.showBlack ? 'black' : '#f5f5f5')};
  display: flex;
  align-items: center;
  justify-content: center;
  iframe {
    border: 0;
  }
  @media (max-width: 767px) {
    margin: 0 0 30px;
  }
`

export const RightFormSec = styled.div`
  max-width: calc(100% - 295px);
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 0 0 60px;
  @media (max-width: 767px) {
    max-width: 100%;
    padding: 0;
  }
`

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 40px;
  width: 100%;
  button {
    max-width: 200px;
    margin: 0;
  }
  .SecLabel {
    color: #aaa;
  }
  .QuestionTootip {
    display: flex;
    margin: 0 0 0 10px;
    color: #ccc;
    cursor: pointer;
    svg {
      font-size: 20px;
      @media (max-width: 767px) {
        font-size: 14px;
      }
    }
    :hover {
      color: #222;
    }
  }
  &.BottomSpan {
    text-align: center;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    text-transform: uppercase;
    margin: 0 0 5px;
    @media (max-width: 767px) {
      margin: 0 0 20px;
    }
    svg {
      margin: 0 8px 0 0;
    }
    .BottomSpanDiv {
      max-width: 200px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      cursor: pointer;
    }
  }
`
export const RadioWrap = styled.div`
  display: flex;
  flex-direction: row;
`

export const RadioDiv = styled.div`
  width: 48%;
  display: flex;
  align-items: center;
  > div:first-child {
    margin: 0;
  }
  .container {
    padding-left: 22px;
    margin-bottom: 19px;
    input:checked ~ .checkmark {
      border: 2px solid #000;
    }
    .checkmark {
      border: 2px solid #aaa;
      background-color: #fff;
    }
    input:checked ~ .checkmark:after {
      background: #222222;
    }
    :hover input ~ .checkmark {
      border: 2px solid #000;
    }
  }
`

export const RadioText = styled.div`
  padding: 2px 0 0 5px;
  color: #aaa;
`

export const IframeCodeInput = styled.input`
  overflow: hidden;
  width: 85%;
  border: 2px solid #eee;
  border-radius: 0;
  height: 36px;
  margin: 0 0 10px;
  padding: 0 15px;
  appearance: none;
  color: #666;
  font-family: 'Montserrat-Regular';
  font-size: 16px;
  :hover,
  :focus {
    outline: 0;
  }
`
