import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import ImagesSection from '../ImagesSection'
import Linkify from 'react-linkify'

const SectionContentWrap = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  .NoWrap {
    font-style: normal;
    color: #666;
    font-size: 16px;
  }
  .errorRd {
    color: red !important;
  }
  .errorDiv {
    margin-top: 10px;
  }
`
const SectionDespcription = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 1.7;
  color: #666666;
  padding: 0;
  margin: 0;
  font-family: 'Montserrat-Regular';
  white-space: break-spaces !important;
`
const SectionDespTextarea = styled.textarea`
  width: 100%;
  background: transparent;
  padding: 10px;
  // resize: none;
  border: 0;
  outline: 0;
  color: #222222;
  font-size: 16px;
  font-family: 'Montserrat-Regular';
  min-height: 100px;
  :hover,
  :focus {
    outline: 0;
  }
`
const DescriptionBox = styled.div`
  width: 100%;
  border: 2px solid #eee;
  position: relative;
  flex-wrap: wrap;
  justify-content: flex-end;
  display: flex;
  &.errorBoder {
    border: 2px solid red;
  }
`
const CountDiv = styled.span`
font-size: 13px;
color: #ccc;
align-items: flex-end;
padding: 10px 10px 5px;
float: right;
`;

const SectionContent = (props) => {
  const { t } = useTranslation('profile')

  const isEditingAbout = useSelector((state) => state.root.myProfile.isEditingAbout)

  const aboutText = props.userData && props.userData.aboutMe && props.userData.aboutMe.description
  const [about, translateAbout] =useTranslateContent('')

  useEffect(() => {
    if (props.userData) translateAbout(aboutText)
  }, [props.userData])
  return (
    <>
      <SectionContentWrap>
        {props.userData && props.userData.aboutMe && props.userData.aboutMe.description && !isEditingAbout ? (
          <SectionDespcription><Linkify componentDecorator={(decoratedHref, decoratedText, key) => (<a target="blank" rel="nofollow noopener" href={decoratedHref} key={key}>{decoratedText}</a>)}>{about ? about : aboutText}</Linkify></SectionDespcription>
        ) : null}
        {isEditingAbout ? (
          <DescriptionBox className={props.aboutCharCount > 1000 && "errorBoder"}>
            <SectionDespTextarea
              value={props.aboutValue}
              onChange={props.aboutOnChange}
              // maxLength={10000}
              placeholder={t(`about.placeholderAbout`)}
            ></SectionDespTextarea>
            
          </DescriptionBox>
        ) : null}
        {
          isEditingAbout && (<CountDiv className={props.aboutCharCount > 1000 ? "errorRd countDiv" : "countDiv"}>
                              {props.aboutCharCount}
                              {t(`about.characterLimit`)}
                            </CountDiv>)
        }
        {
          isEditingAbout && props.aboutCharCount > 1000 && <div className="errorRd errorDiv">{t(`about.errorAbout`)}</div>
        }
        
        <ImagesSection
          description={props.userData.aboutMe && props.userData.aboutMe.description}
          images={props && props.aboutImages ? props.aboutImages : []}
          aboutImages={props.aboutImages ? props.aboutImages : []}
          deleteImg={props.deleteImg}
          openModal={props.openModal}
          openLightbox={props.openLightbox}
        />
      </SectionContentWrap>
    </>
  )
}

SectionContent.propTypes = {
  userData: PropTypes.object,
  aboutValue: PropTypes.string,
  aboutOnChange: PropTypes.func,
  aboutCharCount: PropTypes.number,
  aboutImages: PropTypes.array,
  deleteImg: PropTypes.func,
  openModal: PropTypes.func,
  openLightbox: PropTypes.func,
}

export default SectionContent
