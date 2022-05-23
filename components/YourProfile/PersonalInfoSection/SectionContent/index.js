import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { convertDate } from '../../../../utilities/convertDate'
import { capitalizeFirstChar } from '../../../../utilities/capitalizeFirstChar'
import {
  getValuesToShow,
  checkPersonalSectionVal,
  checkPersonalSectionEmpty,
  checkVisibility,
  checkPersonalSectionVisibility,
  mapLangauge,
} from '../../../../utilities/getProfileValues'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { checkPageUser } from '../../../../utilities/otherProfile'

const SectionContentWrap = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  .DefaultMsg {
    line-height: 1.7;
    color: #666;
    font-size: 16px;
  }
`

const ContactTopWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  margin: 20px 0;
  @media (max-width: 767px) {
    flex-direction: column;
  }
  &.BottomSocialDiv {
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 20px 0 0;
    flex-direction: row;
  }
  .LanguagelastBox {
    max-width: 100%;
  }
`
const CommonContent = styled.div`
  display: flex;
  max-width: 238px;
  width: 100%;
  margin-bottom: 10px;
  @media (max-width: 991px) {
    margin: 0 0 15px;
    max-width: 48%;
  }
  @media (max-width: 767px) {
    margin: 0 0 15px;
    max-width: 100%;
  }
  label {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #222222;
    padding: 0;
    margin: 0;
    font-family: 'Montserrat-Regular';
    @media (max-width: 767px) {
      font-size: 14px;
      line-height: normal;
      margin: 0;
    }
  }
  &.BottomSocialCont {
    max-width: fit-content;
    margin: 0 15px 15px 0;
    svg,
    img {
      font-size: 21px;
      margin: 0 11px 0 0;
    }
  }
`

const InputSelected = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #222222;
  padding: 0;
  margin: 0 0 0 5px;
  font-family: 'Montserrat-Regular';
  word-break: break-word;
  .text-capitalise {
    text-transform: capitalize !important;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`

const HeadingDivider = styled.div`
  color: #aaa;
  width: 100%;
  position: relative;
  padding: 0px;
  line-height: normal;
  font-size: 14px;
  margin: 30px 0 30px;
  text-align: center;
  ::before {
    display: inline-block;
    content: '';
    border-top: 1px solid #eee;
    width: 100%;
    margin: 0;
    -webkit-transform: translateY(-1rem);
    -ms-transform: translateY(-1rem);
    transform: translateY(-1rem);
    position: absolute;
    top: 25px;
    left: 0;
  }
  @media (max-width: 767px) {
    margin: 15px 0;
  }
  span {
    background: #fff;
    position: relative;
    padding: 0 5px;
    &.empty {
      padding: 0;
      visibility: hidden;
    }
  }
`

const SectionContent = (props) => {
  const { t } = useTranslation('profile')

  const [gender, translateGender] = useTranslateContent('')
  const [status, translateStatus] = useTranslateContent('')
  const [city, translateCity] = useTranslateContent('')
  const [country, translateCountry] = useTranslateContent('')

  useEffect(() => {
    if (!isEmptyObj(props.userData)) {
      translateGender(getValuesToShow(props.userData, 'gender', 'value'))
      translateStatus(getValuesToShow(props.userData, 'maritalStatus', 'value'))
      translateCity(getValuesToShow(props.userData, 'city', 'value'))
      translateCountry(getValuesToShow(props.userData, 'country', 'value'))
    }
  }, [props.userData])

  const languagesArr = mapLangauge(getValuesToShow(props.userData, 'languages', 'value'))
  return (
    <>
      <SectionContentWrap>
        {props.userData ? (
          <>
            {checkPersonalSectionEmpty(props.userData) || !checkPersonalSectionVisibility(props.userData) ? (
              <span className="DefaultMsg">{t(`personalInfo.noInfoFound`)}</span>
            ) : (
              <>
                <ContactTopWrap>
                  {getValuesToShow(props.userData, 'city', 'condition') ? (
                    <CommonContent>
                      <label>{t(`personalInfo.city`)}:</label>
                      <InputSelected>
                        {city ? city : props.userData && getValuesToShow(props.userData, 'city', 'value')}
                      </InputSelected>
                    </CommonContent>
                  ) : null}
                  {getValuesToShow(props.userData, 'country', 'condition') ? (
                    <CommonContent>
                      <label>{t(`personalInfo.country`)}:</label>
                      <InputSelected>
                        {country ? country : props.userData && getValuesToShow(props.userData, 'country', 'value')}
                      </InputSelected>
                    </CommonContent>
                  ) : null}
                  {/* eslint-disable-next-lined */}
                  {getValuesToShow(props.userData, 'profession', 'condition') &&
                  props.userData.userRole === 'member' &&
                  checkVisibility(props.userData, 'profession') ? (
                    <CommonContent>
                      <label>{t(`personalInfo.profession`)}:</label>
                      <InputSelected>{getValuesToShow(props.userData, 'profession', 'value')}</InputSelected>
                    </CommonContent>
                  ) : null}
                  {getValuesToShow(props.userData, 'company', 'condition') &&
                  checkVisibility(props.userData, 'company') ? (
                    <CommonContent>
                      <label>{t(`personalInfo.company`)}:</label>
                      <InputSelected>{getValuesToShow(props.userData, 'company', 'value')}</InputSelected>
                    </CommonContent>
                  ) : null}
                  {getValuesToShow(props.userData, 'industry', 'condition') &&
                  checkVisibility(props.userData, 'industry') ? (
                    <CommonContent>
                      <label>{t(`personalInfo.industry`)}:</label>
                      <InputSelected>{getValuesToShow(props.userData, 'industry', 'value')}</InputSelected>
                    </CommonContent>
                  ) : null}
                  {getValuesToShow(props.userData, 'website', 'condition') &&
                  checkVisibility(props.userData, 'website') ? (
                    <CommonContent>
                      <label>{t(`personalInfo.website`)}:</label>
                      <InputSelected>{getValuesToShow(props.userData, 'website', 'value')}</InputSelected>
                    </CommonContent>
                  ) : null}
                  {languagesArr && languagesArr.length &&
                  checkVisibility(props.userData, 'languages') ? (
                    // <CommonContent className="LanguagelastBox">
                    <CommonContent>
                      <label>{t(`personalInfo.languages`)}:</label>
                      <InputSelected>
                      {languagesArr.map((lang, index)=>{
                        if (index + 1 === languagesArr.length) {
                          return lang
                        } else {
                          return <>{lang}, </>
                        }
                      })}
                      </InputSelected>
                    </CommonContent>
                  ) : null}
                </ContactTopWrap>

                {!checkPageUser(props.userData.userRole) && (
                  <>
                    {checkPersonalSectionVal(props.userData) ? null : (
                      <>
                        {props.userData.userIdentity === 'verifiedUser' ? (
                          <HeadingDivider>
                            <span>{t(`personalInfo.visibleInfo`)}</span>
                          </HeadingDivider>
                        ) : (
                          <HeadingDivider>
                            <span className="empty">Divider</span>
                          </HeadingDivider>
                        )}
                      </>
                    )}

                    <ContactTopWrap>
                      {getValuesToShow(props.userData, 'dob', 'condition') && checkVisibility(props.userData, 'dob') ? (
                        <CommonContent>
                          <label>{t(`personalInfo.dateOfBirth`)}:</label>
                          <InputSelected>{convertDate(getValuesToShow(props.userData, 'dob', 'value'))}</InputSelected>
                        </CommonContent>
                      ) : null}
                      {getValuesToShow(props.userData, 'gender', 'condition') &&
                      checkVisibility(props.userData, 'gender') ? (
                        <CommonContent>
                          <label>{t(`personalInfo.gender`)}:</label>
                          <InputSelected className="text-capitalise">
                            {gender
                              ? capitalizeFirstChar(gender)
                              : props.userData &&
                                capitalizeFirstChar(getValuesToShow(props.userData, 'gender', 'value'))}
                          </InputSelected>
                        </CommonContent>
                      ) : null}
                      {getValuesToShow(props.userData, 'maritalStatus', 'condition') &&
                      checkVisibility(props.userData, 'maritalStatus') ? (
                        <CommonContent>
                          <label>{t(`personalInfo.relationshipStatus`)}:</label>
                          <InputSelected className="text-capitalise">
                            {status
                              ? capitalizeFirstChar(status)
                              : props.userData &&
                                capitalizeFirstChar(getValuesToShow(props.userData, 'maritalStatus', 'value'))}
                          </InputSelected>
                        </CommonContent>
                      ) : null}
                    </ContactTopWrap>
                  </>
                )}
              </>
            )}
          </>
        ) : null}
      </SectionContentWrap>
    </>
  )
}

SectionContent.propTypes = {
  userData: PropTypes.object,
}

export default SectionContent
