import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { openInNewTab } from '../../../utilities/newTabUtils'
import SingleExhibition from './SingleExhibition'
import { useRouter } from 'next/router'
import { getArray, getString } from '../../../utilities/getTranslatedContent'
import useTranslateContent from '../../../hooks/useTranslateContent'
import ReactTooltip from "react-tooltip";
import MapChart from "./MapChart";
import { default as ReactSelect } from 'react-select'
import { customMultiSelectStyles } from '../../UI/shared/styles'
import { exhibitionCountriesList } from '../../../utilities/exhibitionCountriesList'

const FeatureWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 90px 0 60px;
  width: 100%;
  background: linear-gradient( 270deg,rgba(0,0,0,0) 0%,rgba(10,10,10,0) 60%,rgba(60,60,60,1) 100%);
  display: flex;
  flex-wrap: wrap;
  .CustomBoxSelect {
    width: 180px;
    margin: auto;
  }
  svg {
    //-webkit-mask: radial-gradient(1.5px,#fff 97%,transparent 100%) 0 0/7px 7px;
    // filter: blur(3px);
  }
  @media ( max-width: 1250px ){
    padding: 65px 0;
    .mobile-wrap {
      padding: 0 15px ;
    }
  }
`

const MainHeading = styled.h1`
  font-family: 'Montserrat-Regular';
  padding: 0;
  margin: 0.7em 0;
  font-style: normal;
  font-weight: normal;
  margin: 0 auto 50px;
  max-width: 1270px;
  color: #fff;
  flex: 0 0 100%;
  font-size: 28px;
  line-height: 34px;
  @media (max-width: 767px) {
    font-size: 24px;
    margin: 0 auto 20px;
  }
  @media (max-width: 1270px) {
    max-width: 90%;
  }
`

const MapContainer = styled.div`
  flex: 0 0 50%;
  @media (max-width: 767px) {
    flex: 0 0 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .my-react-select-country {
      order: 2;
      margin: 15px;
      display: flex;
      align-content: center;
    }
    svg {
      width: 100%;
      transform: scale(1.1) translateX(-5%);
    }
  }
`
const VideosWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 50%;
  max-width: 1290px;
  padding: 0 10% 0 80px;
  flex: 1;
  @media (max-width: 767px) {
    padding: 40px 5%;
  }
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    @media (max-width: 767px) {
      flex-direction: row;
      flex-wrap: wrap;
    }
    li {
      text-align: center;
      margin: 0 0 15px;
      padding: 0;
      max-width: 418px;
      background: #222222;
      //border: 1px solid #ffffff;
      width: 100%;
      display: inline-block;
      overflow: hidden;
      position: relative;
      flex: 0 0 33.3%;
      box-sizing: border-box;
      &:nth-child(3) { 
        @media (max-width: 767px) {
          display: none
        }
      }
      @media (max-width: 767px) {
        flex: 0 0 48%;
      }
      a {
        color: #fff;
        font-size: 14px;
        line-height: 17px;
        cursor: pointer;
        text-transform: uppercase;
        img {
          width: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.3s ease-in-out;
          max-height: 190px;
          overflow: hidden;
        }
        :hover {
          img {
            transform: scale(1.05);
          }
          h1 {
            //background: #666;
            background: #000;
            transition: all 0.2s ease-in-out;
          }
        }
      }
    }
  }
`

const SubHead = styled.h4`
  color: #fff;
  font-size: 20px;
  margin-top: 5px;
  @media (max-width: 767px) {
    font-size: 16px;
  }
`

const SubSubHead = styled.h4`
  color: #ccc;
  font-size: 14px;
  text-align: center;
  transform: translateY(60px);
`

const ButtonText = styled.button`
  background: #000;
  border-top: 1px solid #4c4c4c;
  border-right: 0;
  border-left: 0;
  border-bottom: 0;
  width: 100%;
  font-style: normal;
  color: #fff;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  font-family: 'Montserrat-Regular';
  font-weight: 100;
  padding: 7px 15px;
  margin: 30px auto 0;
  :hover,
  :focus {
    background: #666666 ;
    outline: none;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const Exbitions = () => {
  const { t } = useTranslation('landingPageB')
  const router = useRouter()
  const lang = useSelector((state) => state.root.staticContent.appLanguageCode)
  const countries = exhibitionCountriesList(t)

  const exhibitionArticles = useSelector((state) => state.root.landingPage.exhibitionArticles)
  const [content, setContent] = useState("");

  const [description, translateDescription] = useTranslateContent('')

  let descriptionString = ''
  if(exhibitionArticles.length && lang !== 'en')    
  descriptionString = getString(lang,exhibitionArticles,'title')

  const dropdownIndicatorStyles = (base) => {
    let changes = {
      background: `url(${
        '/assets/select_arrow.png'
      }) no-repeat center center`,
      width: '30px',
      color: '#fff',
    }
    return Object.assign(base, changes)
  }

  const customStyles = {
    singleValue: () => ({
      paddingLeft: '5px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      width: '85px',
      background: '#000',
      color: '#fff',
      cursor: 'pointer',
      '@media only screen and (min-width: 992px) and (max-width: 1024px)': {
        paddingLeft: '5px',
      },
      '@media only screen and (max-width: 767px)': {
        paddingLeft: '0px',
      },
    }),
    placeholder: () => ({
      color: '#fff',
      cursor: 'pointer',
    }),
    input: () => ({
      caretColor: 'transparent',
      margin: '3px 0 0',
      cursor: 'pointer',
      color: '#fff'
    }),
    valueContainer: () => ({
      flexWrap: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '10px',
      width: '230px',
      position: 'relative',
      zIndex: '0',
      cursor: 'pointer',
      '@media only screen and (max-width: 767px)': {
        paddingLeft: '0px',
        width: '140px',
      },
    }),
    indicatorsContainer: () => ({
      right: '0px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    control: () => ({
      justifyContent: 'space-between',
      display: 'flex',
      minHeight: '36px',
      alignItems: 'center',
      cursor: 'pointer',
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: 'black',
      cursor: 'pointer',
    }),
    dropdownIndicator: dropdownIndicatorStyles,
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      color: '#fff',
      cursor: 'pointer',
      backgroundColor: isSelected ? '#666' : isFocused ? '#222' : 'black',
      ':active': {
        ...styles[':active'],
        backgroundColor: isSelected ? '#666' : '#222',
      },
    }),
  }

  useEffect(()=>{
    if(descriptionString && lang !== 'en')
      translateDescription(descriptionString)
  },[descriptionString, translateDescription])

  return (
    <>
      {exhibitionArticles && exhibitionArticles.length > 0 && (
        <FeatureWrapper>
          <MainHeading>{t(`exhibitionsSection.title`)}</MainHeading>
          <MapContainer>
            <ReactSelect
              className="CustomBoxSelect my-react-select-country"
              name="country"
              options={countries}
              styles={{ ...customMultiSelectStyles, ...customStyles }}
              components={{
                IndicatorSeparator: () => null,
              }}
              placeholder="Select a location"
              onChange={(val) => router.push({ pathname: '/exhibition', query: { country: val.value } })}
            />
            <MapChart setTooltipContent={setContent} />
            <ReactTooltip>{content}</ReactTooltip>
          </MapContainer>
          <VideosWrap>
            <SubHead>{t(`exhibitionsSection.latest`)}</SubHead>
            {exhibitionArticles.map((article,ind) => (
              <SingleExhibition names={getArray(description)} ind={ind} article={article} key={article._id} openInNewTab={openInNewTab} />
            ))}
          </VideosWrap>
        </FeatureWrapper>
      )}
    </>
  )
}

export default Exbitions
