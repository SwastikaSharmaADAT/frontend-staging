import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { getUserData } from '../../modules/profile/myProfileSlice'
import { getContent } from '../../modules/staticContent/staticContentSlice'
import { isLoginToken } from '../../utilities/authUtils'
import Button from '../../components/UI/Button'
import HeadingSection from '../../components/user-terms-conditions/HeadingSection'
import SectionContent from '../../components/user-terms-conditions/SectionContent'
import publicRoute from '../../HOC/publicRoute'
import staticFilesArray from '../../utilities/staticFilesArray'
import Loader from '../../components/UI/BackdropLoader'


const FeedWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
  min-height: 100vh;
  background: transparent;
`
const YourProfileContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1290px;
  padding: 0 15px;
  margin: 0 auto;
  flex-direction: column;
  justify-content: space-between;
  display: flex;
  @media (max-width: 1280px) {
    width: auto;
  }
  @media (min-width: 600px) and (max-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (max-width: 599px) {
    flex-direction: column;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 50px;
  @media (max-width: 767px) {
    flex-direction: column;
  }
  button {
    width: auto;
    min-width: 200px;
    padding-left: 10px;
    padding-right: 10px;
  }
`

const VendorMembership = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation(['staticPages','translation'])

  const [userInfo, setUserInfo] = useState(null)

  useEffect(()=>{
    router.push('/')
  },[])

  return (
    <>
      <Head>
        <title>Log in | ARTMO Social Network</title>
        <meta name="description" content="Log in | ARTMO" />
      </Head>
      <FeedWrapper>
        <Loader open={true} />
      </FeedWrapper>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ,staticFilesArray)),
  },
})

export default publicRoute(VendorMembership)
