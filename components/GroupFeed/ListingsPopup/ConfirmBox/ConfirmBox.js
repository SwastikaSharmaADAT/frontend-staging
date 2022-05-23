import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import ModalComponent from '../../../UI/Modal'
import CancelButton from '../../../UI/CancelButton'

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  padding: 35px 37px;
  position: relative;
  max-width: 500px;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  font-style: normal;
  font-weight: 400;
  @media (max-width: 991px) and (orientation: landscape) {
    padding: 20px 30px 10px;
  }
  @media (max-width: 767px) {
    padding: 20px 30px 10px;
    max-width: 300px;
  }
  @media (max-width: 375px) {
    padding: 20px 15px 10px;
    max-width: 260px;
  }
`
const Heading = styled.h1`
  margin: 0 0 15px;
  padding: 0;
  color: #222;
  line-height: 24px;
  font-size: 20px;
  text-align: center;
  font-family: 'Montserrat-Regular';
  font-weight: normal;
  @media (max-width: 767px) {
    font-size: 18px;
    line-height: normal;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    font-size: 18px;
    line-height: normal;
  }
`

const PublishBtn = styled.button`
  background: #222;
  font-style: normal;
  color: #fff;
  border: 0px;
  outline: 0px;
  padding: 5px 11px;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  font-family: Montserrat-Regular;
  :hover,
  :focus {
    outline: 0;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    padding: 5px 10px;
  }
`

const BottomDiv = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`
/**
 *
 * common confirm box for delete
 */
function ConfirmBox(props) {
  const { t } = useTranslation('groupsFeed')
  return (
    <>
      {' '}
      <ModalComponent isOpen={props.isOpen} closeModal={props.closeModal} closeOnOutsideClick={true}>
        <PageWrapper>
          <Wrapper>
            <Heading> {props.title}</Heading>
            <BottomDiv>
              <CancelButton onClick={props.closeModal} />
              <PublishBtn onClick={props.onSuccess}>{t(`listingPopup.remove`)}</PublishBtn>
            </BottomDiv>
          </Wrapper>
        </PageWrapper>
      </ModalComponent>
    </>
  )
}
ConfirmBox.propTypes = {
  isOpen: PropTypes.bool,
  closeModal: PropTypes.func,
  onSuccess: PropTypes.func,
  title: PropTypes.string,
}
export default ConfirmBox
