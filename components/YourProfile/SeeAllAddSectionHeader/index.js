import React from 'react'
import styled from 'styled-components'
import { GoPlus } from 'react-icons/go'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'

const SectionHead = styled.div`
  position: relative;
  margin: 0 0 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  border-bottom: 1px solid #eeeeee;
  align-items: center;
  padding: 0 0 24px;
  @media (max-width: 767px) {
    padding: 0 0 15px;
  }
`
const SectionHeading = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  color: #222222;
  padding: 0;
  margin: 0;
  font-family: 'Montserrat-Regular';
  text-transform: uppercase;
  @media (max-width: 767px) {
    font-size: 18px;
    line-height: normal;
    margin: 0;
  }
`

const SectionHeadButtons = styled.div`
  width: auto;
  position: relative;
  display: flex;
  @media (max-width: 767px) {
    margin-top: 0px;
  }
`

const TopButtons = styled.button`
  height: 36px;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #222222;
  background: #eeeeee;
  width: auto;
  border: 0;
  padding: 0 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 5px;
  svg {
    margin: 0 5px 0 0;
  }
  :hover {
    outline: 0;
    border: 0;
    color: #fff;
    background: #222;
  }
  :focus {
    outline: 0;
    border: 0;
  }
  @media (max-width: 767px) {
    margin-right: 5px;
    margin-left: 0px;
    height: 30px;
    font-weight: bold;
    font-size: 14px;
    padding: 0 10px;
  }
  &.AddBtn {
    svg {
      margin: 0 0 0 7px;
    }
  }
  :last-child {
    margin-right: 0px;
  }
  @media (max-width: 359px) {
    font-size: 12px;
    padding: 0 5px;
  }
`

const SectionHeader = (props) => {
  const { t } = useTranslation('profile')
  return (
    <>
      <SectionHead>
        <SectionHeading>{props.heading}</SectionHeading>
        <SectionHeadButtons>
          {!props.hideSeeAllBtn && (
            <TopButtons onClick={() => props.seeAllHandler()}>{t(`allSectionHeader.seeAll`)}</TopButtons>
          )}
          {props.userData.userIdentity === 'verifiedUser' && !props.hideAddBtn && (
            <TopButtons
              className="AddBtn"
              onClick={() => (props.type === 'artwork' ? props.addHandler() : props.setModal(true))}
            >
              {t(`allSectionHeader.add`)} <GoPlus />
            </TopButtons>
          )}
        </SectionHeadButtons>
      </SectionHead>
    </>
  )
}

SectionHeader.propTypes = {
  heading: PropTypes.string,
  seeAllHandler: PropTypes.func,
  addHandler: PropTypes.func,
  userData: PropTypes.object,
  setModal: PropTypes.func,
  hideSeeAllBtn: PropTypes.bool,
  type: PropTypes.string,
  hideAddBtn: PropTypes.bool,
}

export default SectionHeader
