import React from 'react'
import styled from 'styled-components'
import { GoPlus } from 'react-icons/go'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'

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
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #fff;
    background: #222;
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

  const router = useRouter()

  const createClickHandler = () => {
    router.push('/groups/create')
  }
  const browseClickHandler = () => {
    if (props.userData.userIdentity === 'verifiedUser') {
      router.push('/groups?ownGroups=true')
    } else {
      router.push('/groups')
    }
  }

  return (
    <>
      <SectionHead>
        <SectionHeading>{t(`group.title`)}</SectionHeading>
        <SectionHeadButtons>
          <TopButtons onClick={browseClickHandler}>{t(`group.browseGroups`)}</TopButtons>
          {props.userData.userIdentity === 'verifiedUser' && (
            <TopButtons onClick={createClickHandler} className="AddBtn">
              {t(`group.create`)} <GoPlus />
            </TopButtons>
          )}
        </SectionHeadButtons>
      </SectionHead>
    </>
  )
}

SectionHeader.propTypes = {
  userData: PropTypes.object,
}

export default SectionHeader
