import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import ReactPlayer from 'react-player/lazy'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import CancelButton from '../../UI/CancelButton'
import { fetchCategories } from '../../../modules/newsFeed/newsFeedSlice'

const PopupWrap = styled.div`
  width: auto;
  position: relative;
  min-width: 400px;
  max-width: 560px;
  min-height: 190px;
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  margin: 15px auto;
  padding: 25px 25px 0 25px;
  @media (max-width: 767px) {
    min-width: inherit;
    margin: 15px;
    width: 80vw;
    max-height: 60vh;
    overflow-y: auto;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    max-height: 60vh;
    overflow-y: auto;
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

const AddImages = styled.div`
  width: 100%;
  position: relative;
  margin: 0 0 15px;
`

const AddComments = styled.div`
  display: flex;
  padding: 0;
  font-family: 'Montserrat-Regular';
  margin: 0;
  justify-content: flex-end;
  flex-wrap: wrap;
  input {
    padding: 0 15px;
    font-family: 'Montserrat-Regular';
    margin: 0 0 15px;
    width: 100%;
    border: 2px solid #eeeeee;
    height: 36px;
    overflow: auto;
    font-size: 14px;
    border-radius: 0;
    ::placeholder {
      color: #ccc;
    }
    :hover,
    :focus {
      outline: 0;
    }
  }
  textarea {
    padding: 15px;
    font-family: 'Montserrat-Regular';
    margin: 0 0 15px;
    width: 100%;
    resize: none;
    border: 2px solid #eeeeee;
    min-height: 73px;
    overflow: auto;
    font-size: 14px;
    border-radius: 0;
    ::placeholder {
      color: #ccc;
    }
    :hover,
    :focus {
      outline: 0;
    }
  }
`

const PublishBtn = styled.button`
  background: #222;
  font-style: normal;
  color: #fff;
  border: 0px;
  outline: 0px;
  padding: 5px 11px;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  font-family: Montserrat-Medium;
  :hover,
  :focus {
    outline: 0;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    padding: 5px 10px;
  }
  :disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`

const BottomDiv = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  .category-select {
    color: grey;
  }
  .category-select-option {
    color: black;
  }
`

const UploadLink = styled.div`
  width: 100%;
  display: flex;
  margin: 15px 0 15px;
  input {
    padding: 0 15px;
    font-family: 'Montserrat-Regular';
    width: 100%;
    border: 2px solid #eeeeee;
    height: 58px;
    overflow: auto;
    font-size: 18px;
    border-radius: 0;
    ::placeholder {
      color: #ccc;
    }
    :hover,
    :focus {
      outline: 0;
    }
  }
`

const VideoPostWrap = styled.div`
  width: 100%;
  max-height: 320px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0 0 10px;
  video {
    width: 100%;
    height: 320px;
    border: 0;
    outline: 0;
  }
  iframe {
    width: 100%;
    max-height: 320px;
    border: 0;
    outline: 0;
  }
`

const SelectStyled = styled.select`
  border: 2px solid #eee;
  color: #000;
  font-size: 16px;
  font-weight: 400;
  height: 33px;
  margin: 0;
  padding: 0 15px;
  width: 100%;
  background: url('/assets/select_arrow.png') no-repeat right 10px center;
  appearance: none;
  max-width: 193px;
  :focus {
    outline: none;
  }
  ::placeholder {
    color: #666;
    font-weight: 400;
  }
  @media (max-width: 767px) {
    max-width: 90%;
    font-size: 13px;
    padding: 0 10px;
  }
`
const SectionHead = styled.div`
  position: relative;
  margin: 0 0 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 0;
`
const ButtonWarp = styled.div`
  position: relative;
  margin: 0 0 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  button {
    font-family: 'Montserrat-Regular';
  }
`
const Footer = styled.div`
  position: relative;
  margin: 0 0 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  width: 100%;
  align-items: center;
`
const Error = styled.p`
  color: #d62d1e;
  font-size: 14px;
  margin: 0 0 5px;
  padding: 0;
`

const AddVideoPopup = (props) => {
  const { t } = useTranslation(['newsFeed','translation'])

  const dispatch = useDispatch()
  /**Destructure props */
  const { setModal, addVideoHandler } = props
  /**fetch categories list before component loads */
  useEffect(() => {
    dispatch(fetchCategories(t))
  }, [dispatch])
  /**Select categories from redux state */
  const categories = useSelector((state) => state.root.newsFeed.categoryList)

  const [error, setError] = useState('')
  const [details, setDetails] = useState({ url: '', description: '', categoryId: '' })
  const [showPlayer, setShowPlayer] = useState(false)
  const [validInput, setValidInput] = useState(true)

  /**Function to validate URL */
  const urlCheck = () => {
    if (
      ReactPlayer.canPlay(details.url) &&
      (details.url.toLowerCase().includes('youtube') ||
        details.url.toLowerCase().includes('vimeo') ||
        details.url.toLowerCase().includes('youtu.be'))
    ) {
      setError('')
      setShowPlayer(true)
      setValidInput(false)
    } else {
      setShowPlayer(false)
      setError(t(`addVideoPopup.validUrlError`))
    }
  }
  const onBlurHandle = () => {
    if (
      ReactPlayer.canPlay(details.url) &&
      (details.url.toLowerCase().includes('youtube') ||
        details.url.toLowerCase().includes('vimeo') ||
        details.url.toLowerCase().includes('youtu.be'))
    ) {
      setError('')
    } else {
      setError(t(`addVideoPopup.validUrlError`))
    }
  }
  
  useEffect(()=>{
    if(props.editData){
    setDetails({
    url: props.editData.url,
    description: props.editData.description,
    categoryId: props.editData.categoryId
  })
  setShowPlayer(true)
  setValidInput(false)
}
  },[props.editData])

  const closeAddVideo=()=>{
    setDetails({ url: '', description: '', categoryId: '' })
    setShowPlayer(false)
    setValidInput(true)
    props.setEditType('')
    props.setEditData('')
    props.setModal(false)
  }
  return (
    <>
      <PopupWrap>
        <SectionHead>
          <SectionHeading>{props.editType?t(`editVideoPopup.title`):t(`addVideoPopup.title`)}</SectionHeading>
        </SectionHead>
        {validInput && (
          <UploadLink>
            <input
              value={details.url}
              onBlur={onBlurHandle}
              placeholder={t(`addVideoPopup.placeholderEnterLink`)}
              onChange={(e) => {
                setDetails({ ...details, url: e.target.value })
              }}
            ></input>
          </UploadLink>
        )}

        <AddImages>
          <AddComments>
            {showPlayer && (
              <>
                <VideoPostWrap>
                  <ReactPlayer
                    controls={true}
                    url={details.url}
                    onError={() => {
                      setError(t(`addVideoPopup.validUrlError`))
                      setShowPlayer(false)
                      setValidInput(true)
                    }}
                    onReady={() => {
                      setError('')
                    }}
                  />
                </VideoPostWrap>
                <textarea
                  value={details.description}
                  placeholder={t(`addVideoPopup.placeholderWriteSomething`)}
                  onChange={(e) => {
                    setDetails({ ...details, description: e.target.value })
                  }}
                ></textarea>
              </>
            )}
            <Error> {error}</Error>
            <Footer>
              <BottomDiv>
                {showPlayer && (
                  <SelectStyled
                    className={!details.categoryId ? 'category-select' : ''}
                    value={details.categoryId}
                    onChange={(e) => {
                      setDetails({ ...details, categoryId: e.target.value })
                    }}
                  >
                    <option value="" selected disabled>
                      {t(`addVideoPopup.addCategory`)}
                    </option>
                    {categories &&
                      categories.map((category) => (
                        <option className="category-select-option" key={category._id} value={category._id}>
                          {category.title}
                        </option>
                      ))}
                  </SelectStyled>
                )}
              </BottomDiv>
              <ButtonWarp>
                <CancelButton
                  onClick={closeAddVideo}
                />
                {!showPlayer ? (
                  <PublishBtn onClick={() => urlCheck()}>{t(`addVideoPopup.next`)}</PublishBtn>
                ) : (
                  <PublishBtn
                    disabled={
                      details.url === '' || details.description === '' || details.categoryId === '' || error !== ''
                    }
                    onClick={() => {
                      details._id=props.editData&&props.editData._id
                      addVideoHandler(details,props.editType&&'edit')
                    }}
                  >
                    {props.editType?t(`editVideoPopup.updateButton`):t(`addVideoPopup.publish`)}
                  </PublishBtn>
                )}
              </ButtonWarp>
            </Footer>
          </AddComments>
        </AddImages>
      </PopupWrap>
    </>
  )
}
AddVideoPopup.propTypes = {
  setModal: PropTypes.func,
  addVideoHandler: PropTypes.func,
}
export default AddVideoPopup
