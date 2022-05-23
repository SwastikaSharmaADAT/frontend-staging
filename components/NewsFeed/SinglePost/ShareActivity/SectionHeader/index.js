import React from 'react'
import styled from 'styled-components'
import { VscChromeClose } from 'react-icons/vsc'
import PropTypes from 'prop-types'
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

const SectionHeader = (props) => {
  const { t } = useTranslation('newsFeed')
  return (
    <>
      <SectionHead>
        <HeadingSec>{t(`singlePost.share`)} </HeadingSec>
        <a>
          <VscChromeClose
            onClick={() => {
              props.props.setShareActivityPopup(false)
            }}
          />
        </a>
      </SectionHead>
    </>
  )
}
SectionHeader.propTypes = {
  props: PropTypes.any,
}
export default SectionHeader
