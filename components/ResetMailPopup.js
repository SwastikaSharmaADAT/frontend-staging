import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { IoMailUnreadOutline } from 'react-icons/io5'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { setResetEmailPopup } from '../modules/auth/authSlice'
import Modal from './UI/Modal'
import Button from './UI/Button'

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  padding: 35px 37px;
  position: relative;
  max-width: 274px;
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
  }
  @media (max-width: 375px) {
    padding: 20px 15px 10px;
  }
`

const LoginCon = styled.div`
  width: 100%;
  text-align: center;
  svg {
    font-size: 90px;
  }
  @media (max-width: 767px) {
    font-size: 62px;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    font-size: 62px;
  }
`
const Heading = styled.h1`
  margin: 0 0 15px;
  padding: 0;
  color: #222;
  line-height: normal;
  font-size: 24px;
  text-align: center;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  @media (max-width: 767px) {
    font-size: 18px;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    font-size: 18px;
  }
`
const Paragraph = styled.p`
  font-weight: 400;
  margin: 0 0 15px;
  padding: 0;
  color: #222;
  line-height: 20px;
  font-size: 14px;
  text-align: center;
`

const CommonForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const ResetEmailPopup = (props) => {
  const { t } = useTranslation('translation')
  const dispatch = useDispatch()

  const closeResetEmail = (event) => {
    event.preventDefault()
    dispatch(setResetEmailPopup(false))
  }

  return (
    <>
      <Modal closeOnOutsideClick={true} isOpen={props.open} closeModal={props.closeModal}>
        <PageWrapper>
          <Wrapper>
            <LoginCon>
              <IoMailUnreadOutline />
              <Heading>{t(`translation:changePassword.title`)}</Heading>
              <Paragraph>{t(`translation:changePassword.body`)}</Paragraph>
              <form>
                <CommonForm>
                  <Button type="submit" className="btn btn-primary" onClick={closeResetEmail}>
                    {t(`translation:changePassword.buttonGotIt`)}
                  </Button>
                </CommonForm>
              </form>
            </LoginCon>
          </Wrapper>
        </PageWrapper>
      </Modal>
    </>
  )
}

ResetEmailPopup.propTypes = {
  closeModal: PropTypes.func,
  open: PropTypes.bool,
}

export default ResetEmailPopup
