import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { VscChromeClose } from 'react-icons/vsc'
import { useTranslation } from 'next-i18next'

const SectionHead = styled.div`
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  svg {
    font-size: 18px;
    cursor: pointer;
  }
`
const HeadingSec = styled.div`
  font-family: 'Montserrat-Regular';
  font-style: normal;
  font-size: 20px;
  line-height: normal;
  margin: 0 0 0 0;
  color: #222;
  @media (max-width: 767px) {
    font-size: 16px;
  }
`

const SectionHeader = ({ setLikesPopup }) => {
  const { t } = useTranslation('newsFeed')

  return (
    <>
      <SectionHead>
        <HeadingSec>{t(`singlePost.likedBy`)}:</HeadingSec>
        <a>
          <VscChromeClose onClick={() => setLikesPopup(false)} />
        </a>
      </SectionHead>
    </>
  )
}

SectionHeader.propTypes = {
  setLikesPopup: PropTypes.func.isRequired,
}

export default SectionHeader
