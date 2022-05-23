import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import publicRoute from '../../HOC/publicRoute'
import staticFilesArray from '../../utilities/staticFilesArray'
import Loader from '../../components/UI/BackdropLoader'
import SignupModal from '../../components/SignupModal'


const FeedWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
  min-height: 100vh;
  background: transparent;
`

const VendorMembership = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation(['staticPages','translation'])


  return (
    <>
      <Head>
        <title>Sign Up | ARTMO Social Network</title>
        <meta name="description" content="Log in | ARTMO" />
      </Head>
      <FeedWrapper>
        <SignupModal open={true} closeModal={() => {router.push('/')}} />
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
