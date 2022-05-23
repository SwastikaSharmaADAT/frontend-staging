import React from 'react'
import styled from 'styled-components'
import { IoPencil } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { setEditingAbout } from '../../../../modules/profile/myProfileSlice'

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
  :disabled {
    background: #ccc !important;
    cursor: not-allowed! important;
  }
  @media (max-width: 767px) {
    margin-right: 5px;
    margin-left: 0px;
    height: 30px;
    font-weight: bold;
    font-size: 14px;
    padding: 0 10px;
  }
  :last-child {
    margin-right: 0px;
  }
  @media (max-width: 359px) {
    font-size: 12px;
    padding: 0 5px;
  }
  &.primary {
    background: #222 ;
    color: #fff ;
  }
`

const SectionHeader = (props) => {
  const { t } = useTranslation('profile')

  const dispatch = useDispatch()
  const isEditingAbout = useSelector((state) => state.root.myProfile.isEditingAbout)

  const startEditing = () => {
    dispatch(setEditingAbout(true))
  }

  const stopEditing = () => {
    // dispatch(setEditingAbout(false))
    props.updateData()
  }

  const cancelEditing = () => {
    props.handleCancelClick()
    dispatch(setEditingAbout(false))
  }
  return (
    <>
      <SectionHead>
        <SectionHeading>{t(`about.title`)}</SectionHeading>
        <SectionHeadButtons>
          {props.userData.userIdentity === 'verifiedUser' &&
            (!isEditingAbout ? (
              <TopButtons onClick={() => startEditing()}>
                <IoPencil /> {t(`about.edit`)}
              </TopButtons>
            ) : (
              <>
                <TopButtons onClick={() => cancelEditing()}>{t(`about.cancel`)}</TopButtons>
                <TopButtons disabled={ props.aboutCharCount > 1000 } className="primary" onClick={() => stopEditing()}>{t(`about.save`)}</TopButtons>
              </>
            ))}
        </SectionHeadButtons>
      </SectionHead>
    </>
  )
}

SectionHeader.propTypes = {
  updateData: PropTypes.func,
  userData: PropTypes.object,
  handleCancelClick: PropTypes.func,
  aboutCharCount: PropTypes.number,
}

export default SectionHeader
