import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { getUserData } from '../../modules/profile/myProfileSlice'
import { getContent } from '../../modules/staticContent/staticContentSlice'
import { isLoginToken } from '../../utilities/authUtils'
import HeadingSection from './HeadingSection'
import SectionContent from './SectionContent'
import { useTranslation } from 'next-i18next'

const FeedWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
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
`

const ArtworkUploadInstructions = () => {
  const dispatch = useDispatch()
  const {t} =useTranslation('translation')

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)

  const artworkContent = useSelector((state) => state.root.staticContent.artworkUploadContent)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    /**get user details on page render */
    if (loggedInUsername && (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) && isLoginToken())
      dispatch(getUserData(loggedInUsername, 'fetchData',t))
  }, [dispatch, loggedInUsername, userData])

  useEffect(() => {
    dispatch(getContent('Artwork_Upload_Inst_header', t, 'artworkUpload', 'header'))
    dispatch(getContent('Artwork_Upload_Inst_images', t, 'artworkUpload', 'images'))
    dispatch(getContent('Artwork_Upload_Inst_title', t, 'artworkUpload', 'title'))
    dispatch(getContent('Artwork_Upload_Inst_artMaterial', t, 'artworkUpload', 'artMaterial'))
    dispatch(getContent('Artwork_Upload_Inst_series', t, 'artworkUpload', 'series'))
    dispatch(getContent('Artwork_Upload_Inst_limitedEdition', t, 'artworkUpload', 'limitedEdition'))
    dispatch(getContent('Artwork_Upload_Inst_price', t, 'artworkUpload', 'price'))
    dispatch(getContent('Artwork_Upload_Inst_dimension', t, 'artworkUpload', 'dimension'))
    dispatch(getContent('Artwork_Upload_Inst_frame', t, 'artworkUpload', 'frame'))
    dispatch(getContent('Artwork_Upload_Inst_medium', t, 'artworkUpload', 'medium'))
    dispatch(getContent('Artwork_Upload_Inst_genre', t, 'artworkUpload', 'genre'))
    dispatch(getContent('Artwork_Upload_Inst_subjectTags', t, 'artworkUpload', 'subjectTags'))
    dispatch(getContent('Artwork_Upload_Inst_description', t, 'artworkUpload', 'description'))
    dispatch(getContent('Artwork_Upload_Inst_text', t, 'artworkUpload', 'text'))
    dispatch(getContent('Artwork_Upload_Inst_yourProfile', t, 'artworkUpload', 'yourProfile'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])

  return (
    <>
      <FeedWrapper>
        <YourProfileContainer>
          <HeadingSection artworkContent={artworkContent} />
          <SectionContent artworkContent={artworkContent} />
        </YourProfileContainer>
      </FeedWrapper>
    </>
  )
}

export default ArtworkUploadInstructions
