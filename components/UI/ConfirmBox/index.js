import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import { useTranslation } from 'next-i18next'
import Modal from '../Modal'
import CancelButton from '../CancelButton'

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

const WarningMessage = styled.div`
  font-style: normal;
  color: #d62d1e;
  font-size: 16px;
  margin: -10px 0 15px 0;
`

const NoteText = styled.div`
  color: #222;
  font-size: 14px;
  margin: -5px 0 15px 5px;
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

const ConfirmBox = (props) => {
  const { t } = useTranslation('translation')
  return (
    <>
      <Modal closeOnOutsideClick={true} isOpen={props.open} closeModal={props.closeModal}>
        <PageWrapper ref={props.deleteRef}>
          {/* ref={props.cartRef} */}
          <Wrapper>
            <Heading>{props.heading}</Heading>
            {props.showDeleteWarning && <WarningMessage>{t(`translation:confirmBox.warningText`)}</WarningMessage>}
            {props.showChangePaymentNote && <NoteText>{ReactHtmlParser(props.changePaymentNote)}</NoteText>}
            <BottomDiv>
              <CancelButton onClick={props.closeModal} />
              {props.deleteHandler ? (
                <PublishBtn onClick={props.deleteHandler}>{props.confirmButtonText || `Delete`}</PublishBtn>
              ) : (
                ''
              )}
              {props.hideHandler ? <PublishBtn onClick={props.hideHandler}>{props.buttonText}</PublishBtn> : ''}
            </BottomDiv>
          </Wrapper>
        </PageWrapper>
      </Modal>
    </>
  )
}

ConfirmBox.propTypes = {
  deleteRef: PropTypes.object,
  closeModal: PropTypes.func,
  open: PropTypes.bool,
  deleteHandler: PropTypes.func,
  hideHandler: PropTypes.func,
  heading: PropTypes.string,
  buttonText: PropTypes.string,
  confirmButtonText: PropTypes.string,
  showDeleteWarning: PropTypes.string,
  showChangePaymentNote: PropTypes.bool,
  changePaymentNote: PropTypes.any,
  cartRef: PropTypes.string,
}

export default ConfirmBox
