import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { listHashtags } from '../../../modules/newsFeed/newsFeedSlice'
// import HashtagsImage from '../../../assets/hashtag-img.png'

const HashtagsWrap = styled.div`
  width: auto;
  position: relative;
  padding: 15px;
  margin: 0 auto 17px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  background: #fff;
  .defaultText {
    color: #666;
    font-style: normal;
    display: flex;
    justify-content: center;
  }
`

const SectionHead = styled.h1`
  margin: 10px 0 10px;
  padding: 0;
  color: #000;
  line-height: normal;
  font-size: 14px;
  text-align: left;
  font-family: 'Montserrat-Regular';
  font-weight: 100;
`

const HashtagsContent = styled.div`
  position: relative;
  margin: 0 0 10px;
  display: flex;
  color: #222;
  align-items: center;
  @media (min-width: 1025px) and (max-width: 1259px) {
    max-width: 100%;
  }
  @media (max-width: 767px) {
    margin: 0 0 20px;
    max-width: 100%;
  }
  @media (max-width: 479px) {
    max-width: 100%;
  }
`

const HashtagsText = styled.div`
  position: relative;
`

const HashtagsDesp = styled.div`
  font-size: 12px;
  line-height: normal;
  margin: 0;
  padding: 0;
  color: #666;
  word-break: break-word;
  @media (max-width: 767px) {
  }
`

const HashtagsName = styled.div`
  font-size: 18px;
  line-height: normal;
  margin: 0 0 5px 0;
  padding: 0;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  color: #000;
  word-break: break-word;
  @media (max-width: 767px) {
    font-size: 12px;
    margin: 0;
  }
`

const Hashtags = () => {
  const { t } = useTranslation('newsFeed')

  const dispatch = useDispatch()
  const hashtagsList = useSelector((state) => state.root.newsFeed.hashtagsList)

  useEffect(() => {
    dispatch(listHashtags())
  }, [dispatch])

  return (
    <>
      <HashtagsWrap>
        <SectionHead>{t(`hashtags.title`)}:</SectionHead>
        {hashtagsList && hashtagsList.length > 0 ? (
          <>
            {hashtagsList.map((hashtag, index) => (
              <HashtagsContent key={index}>
                <HashtagsText>
                  <HashtagsName>{hashtag.title}</HashtagsName>
                  <HashtagsDesp>
                    {hashtag.count}{' '}
                    {hashtag.count > 1 ? t(`hashtags.postPlural`) : t(`hashtags.post`)}
                  </HashtagsDesp>
                </HashtagsText>
              </HashtagsContent>
            ))}
          </>
        ) : (
          <span className="defaultText">{t(`hashtags.noHashtagsAdded`)}</span>
        )}
      </HashtagsWrap>
    </>
  )
}

export default Hashtags