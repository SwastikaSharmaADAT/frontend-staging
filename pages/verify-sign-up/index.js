import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { toggleLoading, confirmSignup } from '../../modules/auth/authSlice'
import staticFilesArray from '../../utilities/staticFilesArray'
import publicRoute from '../../HOC/publicRoute'
import { isLoginToken } from '../../utilities/authUtils'
import Link from 'next/link'

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  // min-height: 100vh;
  justify-content: center;
  min-height: calc(100vh - 178px);
  @media (max-width: 500px) {
    padding: 20px;
  }
  @media (min-width: 1025px) {
    min-height: calc(100vh - 178px);
  }
`

const Wrapper = styled.div`
  padding: 35px 37px;
  position: relative;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  font-style: normal;
  font-weight: 400;
  @media (max-width: 767px) {
    padding: 20px 15px;
    margin: 30px auto;
  }
`

const LoginContainer = styled.div`
  width: 100%;
`
const Heading = styled.h1`
  margin: 0px;
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
`

const ErrorText = styled.span`
  color: #d62d1e;
  font-size: 20px;
  line-height: normal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 15px 0 0;
  padding: 0;
  text-align: center;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const ConfirmSignup = () => {
  const dispatch = useDispatch()
  const router = useRouter()

  const { t } = useTranslation('translation')
  const confirmSignupState = useSelector((state) => state.root.auth.confirmSignup)
  const confirmSignupError = useSelector((state) => state.root.auth.confirmSignupError)
  const userDataState = isLoginToken() ? JSON.parse(localStorage.getItem('user_info')) : {}
  const username = userDataState.username ? userDataState.username :  ''
  let query = router.query
  useEffect(() => {
    if (query.token) {
      dispatch(toggleLoading(true))
      dispatch(confirmSignup(query.token))
    }
  }, [query]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (confirmSignupState) {
      dispatch(toggleLoading(false))
    }
  }, [dispatch, router, confirmSignupState])
  // TODO redirect to user profile later on when it is ready

  return (
    <>
      <PageWrapper>
        <Wrapper>
          <LoginContainer>
            {confirmSignupError ? null : <Heading>{t(`confirmSignup`)}</Heading>}
            {confirmSignupError && !isLoginToken() ? (
              <ErrorText>{t(`auth.serverResponses.errors.${confirmSignupError}`)}</ErrorText>
            ) : null}
            {confirmSignupError && isLoginToken() ? (
              <ErrorText>
                {
                  !username && (
                    <span>{t(`auth.serverResponses.signUpExpire.userNameNotFound`)} {<Link href='/'>here</Link>} {t(`auth.serverResponses.signUpExpire.commonText`)}
                    </span> 
                  )
                }
                
                {
                  username && (
                    <span>{t(`auth.serverResponses.signUpExpire.userNameFound1`)} {username}, {t(`auth.serverResponses.signUpExpire.userNameFound2`)} {<Link href={'/user/'+username}>here</Link>} {t(`auth.serverResponses.signUpExpire.commonText`)}</span>
                  )
                }
              </ErrorText>
            ) : null}
          </LoginContainer>
        </Wrapper>
      </PageWrapper>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default publicRoute(ConfirmSignup)
