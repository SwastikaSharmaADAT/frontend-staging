import React, { useEffect, useState } from 'react'
import { BsEnvelope } from 'react-icons/bs'
import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import Label from '../../UI/Label'
import Radio from '../../UI/Radio'
import Button from '../../UI/Button'
import { badgeSizes } from '../../../utilities/badgeSizes'
import { populateChatBox, setMessageState } from '../../../modules/messages/messagesSlice'
import ImageSection from './ImageSection'
import { ContentWrapper, RightFormSec, FormGroup, RadioWrap, RadioDiv, RadioText, IframeCodeInput } from './styled.js'

const ContentShown = ({ type }) => {
  const { t } = useTranslation('badges')
  const dispatch = useDispatch()
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)

  const [colorValue, setColorValue] = useState('black')
  const [sizeValue, setSizeValue] = useState('large')
  const [copySuccess, setCopySuccess] = useState('')

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  const handleColorChange = (e) => {
    setColorValue(e.target.value)
  }

  const handleSizeChange = (e) => {
    setSizeValue(e.target.value)
  }

  const getIframeCode = () =>
    `<iframe class='profile-embed' src='${
      window.location.origin
    }/profile-embed?username=${loggedInUsername}&color=${colorValue}&type=${type}&size=${sizeValue}' style='${`width: ${badgeSizes[type][sizeValue]['width']} height: ${badgeSizes[type][sizeValue]['height']}`}' scrolling='no'></iframe>`

  const copyToClipboard = () => {
    const textField = document.createElement('textarea')
    if (typeof window !== 'undefined') textField.innerText = getIframeCode()
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    setCopySuccess(t(`badgeSections.copiedButtonText`))
    setTimeout(() => {
      setCopySuccess('')
    }, 2000)
  }

  const helpClickHandler = async () => {
    dispatch(setMessageState({ key: 'chatPopup', value: true }))
    dispatch(populateChatBox({ senderUser: {}, receiverUser: userData.adminDetails }))
  }

  return (
    <>
      <ContentWrapper>
        <ImageSection loggedInUsername={loggedInUsername} colorValue={colorValue} type={type} sizeValue={sizeValue} />
        <RightFormSec>
          <FormGroup>
            <Label>{t(`badgeSections.step1`)}</Label>
            <RadioWrap>
              <RadioDiv>
                <Radio
                  name={`color${type}`}
                  value="white"
                  checked={colorValue === 'white'}
                  onChange={handleColorChange}
                />{' '}
                <RadioText>{t(`badgeSections.whiteRadioOption`)}</RadioText>
              </RadioDiv>
              <RadioDiv>
                <Radio
                  name={`color${type}`}
                  value="black"
                  checked={colorValue === 'black'}
                  onChange={handleColorChange}
                />{' '}
                <RadioText>{t(`badgeSections.blackRadioOption`)}</RadioText>
              </RadioDiv>
            </RadioWrap>
          </FormGroup>
          <FormGroup>
            <Label>{t(`badgeSections.step2`)}</Label>
            <RadioWrap>
              <RadioDiv>
                <Radio name={`size${type}`} value="small" checked={sizeValue === 'small'} onChange={handleSizeChange} />{' '}
                <RadioText>{t(`badgeSections.smallRadioOption`)}</RadioText>
              </RadioDiv>
              <RadioDiv>
                <Radio name={`size${type}`} value="large" checked={sizeValue === 'large'} onChange={handleSizeChange} />{' '}
                <RadioText>{t(`badgeSections.largeRadioOption`)}</RadioText>
              </RadioDiv>
            </RadioWrap>
          </FormGroup>
          <FormGroup>
            <Label>{t(`badgeSections.step3`)}</Label>
            {process.browser && <IframeCodeInput value={getIframeCode()} disabled />}
            <Button onClick={copyToClipboard}>{copySuccess ? copySuccess : t(`badgeSections.copyButtonText`)}</Button>
          </FormGroup>
          <FormGroup className="BottomSpan">
            <div className="BottomSpanDiv" onClick={helpClickHandler}>
              <BsEnvelope /> <span>{t(`badgeSections.helpText`)}</span>
            </div>
          </FormGroup>
        </RightFormSec>
      </ContentWrapper>
    </>
  )
}

ContentShown.propTypes = {
  type: PropTypes.string,
}

export default ContentShown
