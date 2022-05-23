import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import ReactHtmlParser from 'react-html-parser'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { getContent } from '../../../modules/staticContent/staticContentSlice'
import Modal from '../../UI/Modal'

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

const Wrapper = styled.div`
  padding: 35px 37px;
  position: relative;
  max-width: 386px;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  font-style: normal;
  font-weight: 400;
  text-align: center;
  font-size: 14px;
  color: #666;
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
  @media (max-width: 767px) and (orientation: landscape) {
    max-height: 80vh;
    overflow-y: auto;
  }
`

const Heading = styled.h1`
  margin: 0 0 15px;
  padding: 0;
  color: #222;
  line-height: 29px;
  font-size: 24px;
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
  width: 100%;
  background: #222;
  font-style: normal;
  color: #fff;
  border: 0px;
  outline: 0px;
  padding: 9px 11px;
  align-items: center;
  font-size: 16px;
  line-height: 19px;
  cursor: pointer;
  max-width: 270px;
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

const ConfirmBox = ({ open, closeModal, userData, username }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation(['subscriptions','translation'])

  const underagePopupContent = useSelector((state) => state.root.staticContent.underagePopupContent)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

  useEffect(() => {
    dispatch(getContent('Underage_popup_content', t, 'underagePopup'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])
  return (
    <>
      <Modal closeOnOutsideClick={false} isOpen={open} closeModal={closeModal}>
        <PageWrapper>
          <Wrapper>
            <Heading>
              {t(`underagePopup.hi`)}{' '}
              {userData.firstName && userData.lastName
                ? `${userData.firstName} ${userData.lastName}`
                : userData.firstName
                  ? userData.firstName
                  : userData.username}
              !
            </Heading>
            <p>{ReactHtmlParser(underagePopupContent)}</p>
            <PublishBtn onClick={() => router.push(`/user/${username}`)}>
              {t(`underagePopup.backToProfile`)}
            </PublishBtn>
          </Wrapper>
        </PageWrapper>
      </Modal>
    </>
  )
}

ConfirmBox.propTypes = {
  closeModal: PropTypes.func,
  open: PropTypes.bool,
  userData: PropTypes.object,
  username: PropTypes.string,
}

export default ConfirmBox
