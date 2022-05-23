import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import ReactHtmlParser from 'react-html-parser'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import Modal from './UI/Modal'
import Button from './UI/Button'
import { getContent } from '../modules/staticContent/staticContentSlice'
import {
  closeAllModals,
  setSignupPopup,
  setUsernameValidFormError,
  setEmailValidFormError,
  setSignupError,
  setSocialUserError,
} from '../modules/auth/authSlice'

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
`

const Paragraph = styled.p`
  h3 {
    font-size: 20px;
  }
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

const BreakingNewsPopup = (props) => {
  const { t } = useTranslation('translation')
  const dispatch = useDispatch()

  const message = useSelector((state) => state.root.staticContent.legacyUserWelcomeMessage)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

  useEffect(() => {
    dispatch(getContent('Legacy_User_Welcome_Message', t, 'legacyUserWelcomeMessage'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])

  const closeLegacyWelcomePopup = (event) => {
    event.preventDefault()
    props.closeModal()
  }

  const openSignUpModalHandler = () => {
    props.closeModal()
    dispatch(closeAllModals())
    dispatch(setSignupPopup(true))
    dispatch(setUsernameValidFormError(null))
    dispatch(setEmailValidFormError(null))
    dispatch(setSignupError(null))
    dispatch(setSocialUserError(null))
  }

  return (
    <>
    { message ? <Modal closeOnOutsideClick={true} isOpen={props.open} closeModal={props.closeModal}>
        <PageWrapper>
          <Wrapper>
            <LoginCon>
              <Paragraph>{ReactHtmlParser(message)}</Paragraph>
              <form>
                <CommonForm>
                  <Button type="submit" className="btn btn-primary" onClick={openSignUpModalHandler}>
                    Get a free account
                  </Button>
                </CommonForm>
              </form>
            </LoginCon>
          </Wrapper>
        </PageWrapper>
      </Modal> : <></>}
    </>
  )
}

BreakingNewsPopup.propTypes = {
  closeModal: PropTypes.func,
  open: PropTypes.bool,
}

export default BreakingNewsPopup
