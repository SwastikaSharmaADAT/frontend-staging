import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'
import ContentSection from './ContentSection'

const Wrapper = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-left: 2.5%;
`
const SectionContent = ({ artworkContent }) => {
  const { t } = useTranslation('staticPages')

  return (
    <>
      <Wrapper>
        <ContentSection content={artworkContent['images']} title={t(`artworkUploadInst.images`)} />
        <ContentSection content={artworkContent['title']} title={t(`artworkUploadInst.title`)} />
        <ContentSection
          content={artworkContent['artMaterial']}
          title={t(`artworkUploadInst.artMaterial`)}
        />
        <ContentSection content={artworkContent['series']} title={t(`artworkUploadInst.series`)} />
        <ContentSection
          content={artworkContent['limitedEdition']}
          title={t(`artworkUploadInst.limitedEdition`)}
        />
        <ContentSection content={artworkContent['price']} title={t(`artworkUploadInst.price`)} />
        <ContentSection content={artworkContent['dimension']} title={t(`artworkUploadInst.dimension`)} />
        <ContentSection content={artworkContent['frame']} title={t(`artworkUploadInst.frame`)} />
        <ContentSection content={artworkContent['medium']} title={t(`artworkUploadInst.medium`)} />
        <ContentSection content={artworkContent['genre']} title={t(`artworkUploadInst.genre`)} />
        <ContentSection
          content={artworkContent['subjectTags']}
          title={t(`artworkUploadInst.subjectTags`)}
        />
        <ContentSection
          content={artworkContent['description']}
          title={t(`artworkUploadInst.description`)}
        />
        <ContentSection content={artworkContent['text']} title={t(`artworkUploadInst.text`)} />
        <ContentSection
          content={artworkContent['yourProfile']}
          title={t(`artworkUploadInst.yourProfile`)}
        />
      </Wrapper>
    </>
  )
}

SectionContent.propTypes = {
  artworkContent: PropTypes.any,
}

export default SectionContent
