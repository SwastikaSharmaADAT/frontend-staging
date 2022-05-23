import styled from 'styled-components'

export const CommonSection = styled.div`
  width: 100%;
`
export const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 22px;
    color: #666;
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }
`
export const LeftDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 15px;
`
export const TabsName = styled.div`
  padding-left: 10px;
  line-height: 28px;
  font-size: 18px;
  color: #666;
  font-weight: 600;
`
export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 15px;
  width: 100%;
  input {
    color: #000;
    :placeholder {
      color: #666;
    }
    :disabled {
      color: #8a8a8a;
    }
  }
  button {
    max-width: 200px;
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
export const BlockDiv = styled.div`
  display: block;
  p {
    color: orange;
    font-size: 14px;
  }
`
