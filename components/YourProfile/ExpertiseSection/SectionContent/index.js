import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import ImagesSection from '../ImagesSection'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import Linkify from 'react-linkify'

const SectionContentWrap = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  .NoWrap {
    margin: 0 0 30px;
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
const SectionDescription = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 1.7;
  color: #666666;
  padding: 0;
  margin: 0 0 15px;
  font-family: 'Montserrat-Regular';
  @media (max-width: 767px) {
    margin: 0 0 10px;
  }
  white-space: break-spaces !important;
`

const SectionDespTextarea = styled.textarea`
  width: 100%;
  background: transparent;
  padding: 10px;
  //resize: none;
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

  const isEditingExpertise = useSelector((state) => state.root.myProfile.isEditingExpertise)
  const [description, translateDescription] =useTranslateContent('')

  useEffect(() => {
    if(!isEmptyObj(props.userData))
    translateDescription(props.userData && props.userData.description)
  }, [props.userData])

  return (
    <>
      <SectionContentWrap>
        {props.userData && props.userData.description && !isEditingExpertise ? (
          <SectionDescription><Linkify componentDecorator={(decoratedHref, decoratedText, key) => (<a target="blank" rel="nofollow noopener" href={decoratedHref} key={key}>{decoratedText}</a>)}>{description ? description : props.userData && props.userData.aboutMe}</Linkify></SectionDescription>
        ) : null}
        {isEditingExpertise ? (
          <DescriptionBox className={props.descCharCount > 1000 && "errorBoder"}>
            <SectionDespTextarea
              value={props.descValue}
              onChange={props.descOnChange}
              //maxLength={1000}
              placeholder={t(`expertise.placeholderDescription`)}
            ></SectionDespTextarea>
          </DescriptionBox>
        ) : null}
        {
          isEditingExpertise && (<CountDiv className={props.descCharCount > 1000 ? "errorRd countDiv" : "countDiv"}>
                              {props.descCharCount}
                              {t(`expertise.characterLimit`)}
                            </CountDiv>)
        }
        {
          isEditingExpertise && props.descCharCount > 1000 && <div className="errorRd errorDiv">{t(`about.errorAbout`)}</div>
        }
        <ImagesSection
          description={props.userData && props.userData.description}
          images={props.userData && props.userData.images}
          expertiseImages={props.expertiseImages}
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
  descValue: PropTypes.string,
  descOnChange: PropTypes.func,
  descCharCount: PropTypes.number,
  expertiseImages: PropTypes.array,
  deleteImg: PropTypes.func,
  openModal: PropTypes.func,
  openLightbox: PropTypes.func,
}

export default SectionContent
