import React, { useEffect, useState } from 'react'
import { FaBook } from 'react-icons/fa'
import { GoPlus } from 'react-icons/go'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useDebouncedValue } from '../../../hooks'
import { getArtworklist } from '../../../modules/dashboard/dashboardSlice'
import { getUserData, notifyError } from '../../../modules/profile/myProfileSlice'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { isLoginToken } from '../../../utilities/authUtils'
import SearchSection from '../SearchSection'
import { CommonSection, HeadingSection, LearnMoreBtn, HeadingBtnWrap, AddNewBtn, CustomTabsWrapper } from '../styled.js'
import LeftTabsBar from '../LeftTabsBar'
import PaymentAlert from '../PaymentAlert/PaymentAlert'
import ArtworkListing from './ArtworkListing'
import Head from 'next/head'

const ArtworkListingSection = () => {
  const { t } = useTranslation(['dashboard','translation'])

  const dispatch = useDispatch()
  const router = useRouter()
  const [keyword, setKeyword] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [limit, setLimit] = useState(25)

  /**use debounce for search, triggers after 1 sec */
  const debouncedKeyword = useDebouncedValue(keyword, 1000)

  const artworks = useSelector((state) => state.root.dashboard.artworks)

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const hasActivePlan = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const userData = useSelector((state) => state.root.myProfile.userData)

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    if (!hasActivePlan && !isEmptyObj(userData)) {
      router.push('/subscriptions')
     // notifyError(t(`purchaseSubscriptionMessage`))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasActivePlan, router, userData])

  /**get artworks on page load */
  useEffect(() => {
    if (keyword.length > 1 || keyword.length === 0) {
      dispatch(
        getArtworklist({
          limit: JSON.parse(limit),
          offset: 0,
          search: keyword,
          t:t
        })
      )
      setHasMore(true)
    }
    // eslint-disable-next-line
  }, [debouncedKeyword, dispatch, limit])

  useEffect(() => {
    /**get user details on page render */
    if (loggedInUsername && (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) && isLoginToken())
      dispatch(getUserData(loggedInUsername, 'fetchData',t))
  }, [dispatch, loggedInUsername, userData])

  return (
    <>
     <Head>
        <title>My Artworks | ARTMO | The Art Network | Connecting The Art World</title>
      </Head>
      <CustomTabsWrapper>
        <LeftTabsBar />
        <CommonSection className="customPanelContent">
          <PaymentAlert />
          <HeadingSection>
            <HeadingBtnWrap>
              {t(`artworks.title`)}
              <AddNewBtn onClick={() => router.push('/artworks/add')}>
                {t(`artworks.addNew`)} <GoPlus />
              </AddNewBtn>
            </HeadingBtnWrap>
            <LearnMoreBtn onClick={() => router.push('/knowledgebase')}>
              {t(`artworks.learnMore`)} <FaBook />
            </LearnMoreBtn>
          </HeadingSection>
          <SearchSection
            setHasMore={setHasMore}
            limit={limit}
            setLimit={setLimit}
            keyword={keyword}
            setKeyword={setKeyword}
          />
          <ArtworkListing
            hasMore={hasMore}
            setHasMore={setHasMore}
            keyword={keyword}
            limit={limit}
            artworks={artworks}
          />
        </CommonSection>
      </CustomTabsWrapper>
    </>
  )
}

export default ArtworkListingSection
