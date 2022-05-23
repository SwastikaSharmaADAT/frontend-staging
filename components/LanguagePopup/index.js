import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { getLanguages, setLanguage } from '../../modules/staticContent/staticContentSlice'
import { unwrapResult } from '@reduxjs/toolkit'
import styled from 'styled-components'
import ModalComponent from '../UI/Modal'

const PopupWrapper = styled.div`
    width: 100%;
`

const WrapperContainer = styled.div`
width: 65%;
margin: 0 auto;
background: #fff;
z-index: 999999;
@media( min-width: 1100px ){
    height: 60vh;
}
& .contiiner{
    @media( max-width: 350px ) {
        overflow-y: auto;
        height: calc(100vh - 90px);
    }
}
& *{
    box-sizing: border-box;
}
& .langText {
    text-align: center;
    font-size: 22px ;
    width: 100%;
    margin-bottom: 20px;
}
& .langText::after {
	content: "";
	width: 100px;
	height: 3px;
	display: block;
	background: #222;
	text-align: center;
	box-sizing: border-box;
	margin: 0 auto;
    margin-top: 20px;
}
@media( max-width: 1024px ) {
    width: auto ;
    max-width: 90vw ;
}
`

const ClosePopUp = styled.div`
    font-size: 40px ;
    width: 100% ;
    position: relative;
    right: 0;
    left: 96%;
    cursor: pointer;
    @media( max-width: 767px ) {
        left: 90%;
    }
`
const PopupUl = styled.ul`
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-content: center;
    flex-wrap: wrap;
    list-style: none ;
    
    @media( min-width: 1100px ) {
        padding-left:130px ;
    }
    @media( max-width: 767px ){
        padding-left: 10px;
    }
    & li {
        flex: 0 0 22% ;
        padding: 8px;
        margin: 2px;
        cursor: pointer ;
        @media( max-width: 767px ) {
            flex: 1 0 35% ;
            margin: 7px;
            padding: 5px;
            font-size: 16px;
        }
        & img {
            margin-right: 5px ;
        }
    }
`

const LanguageDivSection = styled.div`
    margin-top: 25px;
    padding: 3px;
    display: block;
    border: 1px solid #fff;
    color: #fff;
    font-size: 1.45em;
    padding: 0.5em 0.9em;
    font-family: 'Montserrat-Regular';
    font-weight: 400;
    border-radius: 0;
    line-height: 1;
    text-align: center;
    -webkit-text-decoration: none;
    text-decoration: none;
    cursor: pointer;
    &.NewHomepage {
        border: 0;
        margin: 0;
        width: 150px;
        padding: 5px 0;
        @media( max-width: 769px ) {
            
        }
        .langDivAs {
            color: #fff;
        }
    }
    &.bBannerSec {
        border: 1px solid #000;
        width: 40%;
        margin: 10px auto;
        box-sizing: border-box;
        @media( max-width: 1200px ) {
            padding: 5px;
        }
        & .langDivAs {
            color: #222 ;
        }
        @media( max-width: 850px ){
            background: #fff;
            font-size: 16px ;
        }
    }
    &.footeLanguagePop{
        border: none;
        background: #000 ;
        margin: 0 ;
        padding: 8px 0 8px 5px;
        &:hover {
            background-color: #0a0a0a;
            border-color: #0a0a0a;          
        }
        & div {
            font-size: 16px ;
            & img {
                margin-right: 10px ;
            }
        }
    }
    &.sidebarLangSwitch{
        border: none;
        width: 100%;
        margin: 0 ;
        padding: 0 ;
        & div {
            font-size: 14px ;
            & img {
                margin-right: 15px ;
            }
        }
    }
    & div {
        display: flex ;
        justify-content: flex-start;
        align-content: center;
        align-items: center;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-align: left;
        & img {
            margin-right: 5px ;
        }
        @media( max-width: 767px ) {
            font-size: 16px;
        }
    }
    & .langDivAs {
        font-size:16px ;
        padding: 2px ;
    }
`

const LanguagePopup = (props) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const { i18n } = useTranslation()
    const { t } = useTranslation('translation')
    const { languagesData, appLanguage } = useSelector((state) => state.root.staticContent)
    const [selectedLanguage, setSelectedLanguage] = useState({ title: '', flagurl: ''})
    const [openModal, setOpenModal] = useState(false)

    useEffect(() => {
        const langFunc = async () => {
          if (languagesData && languagesData.length === 0) {
            const resultAction = await dispatch(getLanguages({ t }))
            const result = await unwrapResult(resultAction)
            let _id = localStorage.getItem('appLanguage')
            let languageCode = localStorage.getItem('appLanguageCode')
            if (_id && languageCode) {
              await dispatch(setLanguage({ _id, languageCode }))
              // i18n.changeLanguage(languageCode)
            } else {
              const englishObj = result.data.languagesData.find((data) => data.languageCode === 'en')
              await dispatch(
                setLanguage({
                  _id: englishObj._id,
                  languageCode: englishObj.languageCode,
                })
              )
              // i18n.changeLanguage(englishObj.languageCode)
              router.replace({path:router.pathname,query:router.query},'',{locale:englishObj.languageCode})
            }
          }
        }
        langFunc()
        let languageCode = localStorage.getItem('appLanguageCode')
        let lang = languagesData.find((data) => data.languageCode === languageCode )
        if ( lang ) {
            setSelectedLanguage({ title: lang.title , flagurl: lang.flagUrl})
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [languagesData])

    const switchToLang = async ( title ) => {
        let lang = languagesData.find((data) => data.title === title )
        await dispatch(setLanguage(lang))
        setOpenModal(false)
        //setSelectedLanguage('hey')
        router.replace({path:router.pathname,query:router.query},'',{locale:lang.languageCode})
    }

    const options = languagesData.map((o) => (
        <li onClick={()=>switchToLang( o.title )}><img src={o.flagUrl} width="20px" height="15px" />{o.title}</li>
    ))

    const closeModal = () => {
        setOpenModal(false)
    }
    const popUpClickHandler = () => {
        setOpenModal(true)
    }
    return (
        <PopupWrapper className={props.className}>
        <ModalComponent overlayClassName={props.sidebar && 'sidebarLangPoup'} closeOnOutsideClick={true} isOpen={openModal} closeModal={() => setOpenModal(false)}>
            <WrapperContainer>
                <div className='contiiner'>
                <ClosePopUp onClick={closeModal} className='topright'>x</ClosePopUp>
                    <div className='langText'> Select your language</div>
                    <PopupUl>
                        {options}
                    </PopupUl>
                    <div className='margDiv'></div>
                </div>
            </WrapperContainer>
        </ModalComponent>
        <LanguageDivSection className={props.className} onClick={popUpClickHandler}>
            {
                selectedLanguage && ( <div className='langDivAs'><img src={selectedLanguage.flagurl} width="20px" height="15px" />{selectedLanguage.title}</div> )
            }
            
        </LanguageDivSection>
        </PopupWrapper>
    )
}



export default LanguagePopup