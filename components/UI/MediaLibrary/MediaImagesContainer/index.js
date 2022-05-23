import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { Trans, useTranslation } from 'next-i18next'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { GoSearch } from 'react-icons/go'
import { FaRegSave, FaCheck } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import ConfirmBox from '../../../UI/ConfirmBox'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import { addNewTag } from '../../../../modules/mediaLibrary/mediaLibrarySlice'
import ImageDiv from './ImageDiv'

const TabsContainer = styled.div`
  width: 100%;
  position: relative;
  .TabsContentDiv {
    background: #fff;
  }
  .MuiAppBar-colorPrimary {
    box-shadow: none !important;
    background: transparent;
  }
  .MuiTabs-indicator {
    display: none !important;
  }
  .Mui-selected {
    background: #fff;
  }
  .MuiButtonBase-root.MuiTab-root {
    opacity: 1;
  }
`

const DivContent = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto;
  text-align: center;
  min-height: 500px;
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 15px;
  :focus {
    outline: none;
  }
  @media (max-width: 991px) {
    padding: 15px 15px 30px;
    min-height: inherit;
  }
  @media (max-width: 768px) and (max-width: 991px) {
    min-height: 500px;
  }
  @media (max-width: 479px) {
    min-height: 400px;
  }
  @media (min-width: 320px) and (max-width: 991px) and (orientation: landscape) {
    min-height: inherit;
  }
`

const LabelText = styled.label`
  position: relative;
  font-family: 'Montserrat-Regular';
  padding: 10px 0px 0;
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: normal;
  color: #222;
  @media (max-width: 767px) {
    font-size: 16px;
  }
`

const InfoText = styled.div`
  font-family: 'Montserrat-Regular';
  margin-top: 4px;
  font-style: normal;
  line-height: normal;
  color: #222;
  font-size: 14px;
`

const ErrorText = styled.div`
  font-family: 'Montserrat-Regular';
  margin-top: 6px;
  font-weight: bold;
  font-style: normal;
  line-height: normal;
  color: #d62d1e;
  font-size: 14px;
`

const OrDivider = styled.div`
  position: relative;
  font-family: 'Montserrat-Regular';
  padding: 10px 0px;
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: normal;
  color: #222;
  text-align: center;
`

const SelectFileBtn = styled.button`
  font-weight: bold;
  font-size: 15px;
  line-height: 22px;
  text-align: center;
  color: #fff;
  background: #222;
  width: auto;
  border: 0;
  padding: 5px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 0 auto 10px;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #fff;
    background: #222;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    padding: 4px 10px;
  }
`
const MediaWrap = styled.div`
  width: 100%;
  position: relative;
  margin: 0 auto;
  min-height: 500px;
  display: flex;
  flex-direction: column;
`

const SearchMediaWrap = styled.div`
  max-width: 311px;
  width: 100%;
  height: 36px;
  position: relative;
  display: flex;
  flex-direction: row;
  border: 2px solid #eee;
  @media (max-width: 991px) {
    margin: 0 0 10px;
    max-width: 100%;
  }
`
const SearchMediaIcon = styled.div`
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  svg {
    font-size: 22px;
    color: #666;
    display: flex;
    align-items: center;
    text-align: center;
    justify-content: center;
  }
`
const SearchInput = styled.input`
  width: calc(100% - 36px);
  height: 36px;
  border: 0;
  outline: 0;
  color: #666;
  padding: 0 10px 0 0;
  margin: 0;
  font-size: 16px;
  :placeholder {
    color: #666;
  }
  @media (max-width: 991px) {
    font-size: 14px;
  }
`
const MediaContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`
const TopBar = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 991px) {
    flex-direction: column;
  }
`

const LeftContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 75%;
  background: #ffffff;
  padding: 20px;
  @media (max-width: 1024px) {
    padding: 20px 10px;
  }
  @media (max-width: 767px) {
    padding: 15px;
    max-width: 100%;
    width: auto;
  }
`
const InputSelect = styled.select`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #666;
  padding: 0 10px;
  margin: 0 8px 0 0;
  font-family: 'Montserrat-Regular';
  height: 38px;
  border: 2px solid #eeeeee;
  outline: none;
  max-width: 210px;
  width: 100%;
  background: url('/assets/group_select_arrow.png') no-repeat right 10px center;
  &:hover,
  &:focus {
    outline: none;
  }
  @media (max-width: 991px) {
    max-width: 100%;
    margin: 0 0 10px 0;
    font-size: 14px;
  }
`
const ImagesSectionWrap = styled.div`
  width: 100%;
  position: relative;
  margin: 25px 0 16px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  @media (max-width: 991px) {
    margin: 20px 0 0;
  }
`

const RightContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 25%;
  background: #ecedf1;
  padding: 20px;
  @media (max-width: 767px) {
    padding: 15px;
    max-width: 100%;
    width: auto;
  }
  input {
    padding: 0 10px;
    width: 100%;
  }
  .AddTags {
    cursor: pointer;
  }
`
const ImageName = styled.div`
  width: 100%;
  font-size: 16px;
  color: #000;
  font-family: 'Montserrat-Medium';
  margin: 0 0 10px;
`
// const ImageSize = styled.div`
//   width: 100%;
//   font-size: 14px;
//   color: #000;
//   margin: 0 0 10px;
// `
const ImageWrap = styled.div`
  height: 181px;
  color: #000;
  width: 100%;
  margin: 0 0 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-height: 181px;
  }
`

const DescriptionDIV = styled.div`
  height: 70px;
  color: #000;
  font-size: 14px;
  margin: 0 0 15px;
  padding: 10px;
  background-color: #fff;
  @media (min-width: 768px) and (max-width: 1024px) {
    overflow: hidden;
  }
`

const TextareaDesp = styled.textarea`
  width: 100%;
  height: 100%;
  border: 0;
  outline: 0;
  resize: none;
  overflow: auto;
  overflow-x: hidden;
  color: #666;
  margin: 0;
  font-size: 16px;
  :placeholder {
    color: #666;
  }
  @media (min-width: 992px) and (max-width: 1024px) {
    font-size: 14px;
  }
`

const DeleteImage = styled.button`
  font-size: 14px;
  line-height: 22px;
  color: #d62d1e;
  background: none;
  width: auto;
  border: 0;
  padding: 0;
  cursor: pointer;
  margin: 50px 0 0;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #d62d1e;
    background: none;
  }
  @media (max-width: 767px) {
    margin-left: 0px;
    font-size: 14px;
    padding: 4px 10px;
  }
`

const ImageTags = styled.div`
  width: 100%;
  flex-wrap: wrap;
  display: flex;
`

const TagDiv = styled.div`
  width: auto;
  padding: 4px 8px;
  border: 1px solid #cccccc;
  color: #666;
  font-size: 14px;
  margin: 0 4px 4px 0;
  text-align: center;
`

const BottomBar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 20px;
  border-top: 1px solid #eee;
  @media (max-width: 991px) {
    flex-direction: column;
  }
  .LastBtn {
    @media (max-width: 991px) {
      margin: 10px 0 0;
    }
  }
`
const LoadMoreWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const SaveAll = styled.button`
  font-family: 'Montserrat-Medium';
  font-size: 15px;
  line-height: 22px;
  text-align: center;
  color: #fff;
  background: #222;
  width: auto;
  border: 0;
  padding: 5px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #fff;
    background: #222;
  }
  :disabled {
    opacity: 0.8;
    cursor: default;
  }
  svg {
    margin: 0 5px 0 0;
  }
  @media (max-width: 767px) {
    margin-left: 0px;
    font-size: 14px;
    padding: 4px 10px;
  }
`

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    boxShadow: 'none',
  },
  test: {
    color: 'red',
  },
  HeaderTabs: {
    flexGrow: 1,
    backgroundColor: '#f3f4f8',
    boxShadow: 'none',
    fontSize: '15px',
    fontFamily: 'Montserrat-Medium',
    color: '#222',
    margin: '0 0 0 15px',
  },
  TabsContentDiv: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TabsContentDivUpload: {
    backgroundColor: '#fff',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  UploadDivDragging: {
    backgroundColor: '#eee',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}))

const MediaImagesContainer = ({
  userMedia,
  userMediaTags,
  uploadImages,
  setPage,
  value,
  setValue,
  limit,
  fixedLimit,
  selectedMedia,
  onDeleteClick,
  selectMedia,
  onParamsChange,
  onSelectedMediaUpdate,
  toBeUpdatedItemsCount,
  onSaveAllClick,
  onMediaInsert,
  chosenMedia,
  singleSelection,
  params,
  viewOnly,
}) => {
  const classes = useStyles()
  const dispatch = useDispatch()

  const [showErr, setShowErr] = React.useState(false)
  const [errCode, setErrCode] = React.useState(null)
  const [errData, setErrData] = React.useState(null)
  const [showTagInput, setShowTagInput] = React.useState(false)
  const [showConfirm, setShowConfirm] = React.useState(false)
  const [checkedLength, setCheckedLength] = React.useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  const { t } = useTranslation(['mediaLibrary', 'translation'])

  const onDrop = useCallback(
    (acceptedFiles, fileRejections) => {
      if (fileRejections.length === 0 && acceptedFiles.length > 0) {
        uploadImages(acceptedFiles)
        setShowErr(false)
        setErrCode(null)
        setErrData(null)
      } else if (fileRejections.length > 0) {
        const hasLengthError = fileRejections.some(({ errors }) => errors[0].code === 'too-many-files')
        const hasBatchError = fileRejections.some(({ errors }) => errors[0].code === 'batch-limit-exceed')
        if (hasLengthError) {
          setShowErr(true)
          setErrCode('too-many-files')
          setErrData(null)
        }
        else if (hasBatchError) {
          setShowErr(true)
          setErrCode('batch-limit-exceed')
          setErrData(null)
        }
        else {
          setShowErr(true)
          setErrCode(null)
          setErrData(fileRejections)
        }
      }
    },
    [uploadImages]
  )
  let sizeCal=0
  const sizeValidate=(file)=>{
    sizeCal = sizeCal + file.size
    if(sizeCal>10485759){
      
      return {
        code: "batch-limit-exceed",
        message: ''
      }
    }
    return null
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    validator : sizeValidate,
    accept: 'image/jpeg, image/png, image/jpg',
    maxFiles: limit,
    multiple: true,
    maxSize: process.env.NEXT_PUBLIC_REACT_APP_MAX_IMAGE_SIZE,
    minSize: process.env.NEXT_PUBLIC_REACT_APP_MIN_IMAGE_SIZE,
  })

  const renderErrors = () => {
    if (errCode && !errData) {
      return (
        <ErrorText>
          {t(`translation:auth.imageUploadErrs.${errCode}`)} {errCode === 'batch-limit-exceed' ? '' : limit}
        </ErrorText>
      )
    } else if (!errCode && errData) {
      return errData.map(({ file, errors }) => (
        <ErrorText key={file.path}>
          {file.path} {t(`translation:auth.imageUploadErrs.${errors[0].code}`)}
        </ErrorText>
      ))
    }
  }
  /**function to remove format extension */
  const removeFormat = (str) => str.substring(0, str.lastIndexOf('.'))

  return (
    <>
      {showConfirm && (
        <ConfirmBox
          open={showConfirm}
          closeModal={() => setShowConfirm(false)}
          deleteHandler={() => {
            onDeleteClick(selectedMedia)
            setPage(1)
            setShowConfirm(false)
          }}
          heading="Are you sure you want to delete image?"
          showDeleteWarning={true}
        />
      )}
      <TabsContainer>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs className={classes.HeaderTabs} value={value} onChange={handleChange} aria-label="">
              <Tab label={t(`uploadTab.title`)} {...a11yProps(0)} />
              <Tab label={t(`mediaTab.title`)} {...a11yProps(1)} />
            </Tabs>
          </AppBar>
          <TabPanel
            className={!isDragActive ? classes.TabsContentDivUpload : classes.UploadDivDragging}
            value={value}
            index={0}
          >
            <DivContent {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <LabelText>{t(`uploadTab.dragDropHere`)}</LabelText>
              ) : (
                <>
                  <LabelText>{t(`uploadTab.dragDropHere`)}</LabelText>
                  <OrDivider>{t(`uploadTab.or`)}</OrDivider>
                  <SelectFileBtn>{t(`uploadTab.selectFiles`)}</SelectFileBtn>
                  <InfoText>{t(`uploadTab.supportedFormatsText`)}</InfoText>

                  {fixedLimit && (
                    <InfoText>
                      {t(`uploadTab.maxLimitPrefix`)} {limit} {t(`uploadTab.maxLimitSuffix`)}
                    </InfoText>
                  )}
                  {!fixedLimit && (
                    <InfoText>
                      {limit} {t(`uploadTab.moreImagesText`)}
                    </InfoText>
                  )}

                  <InfoText>{t(`uploadTab.maxFileSize`)}</InfoText>
                  <InfoText>{t(`uploadTab.minFileSize`)}</InfoText>
                  {showErr ? renderErrors() : null}
                </>
              )}
            </DivContent>
          </TabPanel>
          <TabPanel className={classes.TabsContentDiv} value={value} index={1}>
            <MediaContainer>
              <LeftContainer>
                <MediaWrap>
                  <TopBar>
                    <SearchMediaWrap>
                      <SearchMediaIcon>
                        <GoSearch />
                      </SearchMediaIcon>
                      <SearchInput
                        placeholder={t(`mediaTab.placeholderSearch`)}
                        value={params.keyword}
                        onChange={(e) => {
                          onParamsChange('keyword', e.target.value.trim())
                        }}
                      ></SearchInput>
                    </SearchMediaWrap>
                    <InputSelect value={params.tag} onChange={(e) => onParamsChange('tag', e.target.value)}>
                      <option value="">{t(`mediaTab.pickATag`)}</option>
                      {userMediaTags.map((tag, index) => (
                        <option value={tag} key={`${tag}-${index}`}>
                          {tag}
                        </option>
                      ))}
                    </InputSelect>
                  </TopBar>
                  <ImagesSectionWrap>
                    {userMedia &&
                      userMedia.photos.map((photo) => (
                        <ImageDiv
                          checkedLength={checkedLength}
                          setCheckedLength={setCheckedLength}
                          limit={limit}
                          selectMedia={selectMedia}
                          chosenMedia={chosenMedia}
                          key={photo._id}
                          photo={photo}
                        />
                      ))}
                  </ImagesSectionWrap>
                  {userMedia && userMedia.count > userMedia.photos.length && (
                    <LoadMoreWrapper>
                      <SaveAll onClick={() => onParamsChange('page', params.page + 1)}>
                        {t(`mediaTab.loadMore`)}
                      </SaveAll>
                    </LoadMoreWrapper>
                  )}
                </MediaWrap>
              </LeftContainer>
              <RightContainer>
                {selectedMedia && (
                  <>
                    <ImageName>{removeFormat(selectedMedia.pictureName)}</ImageName>
                    {/* <ImageSize>259 x 181 px</ImageSize> */}
                    <ImageWrap>
                      <img
                        src={createResizeImageUrl(selectedMedia.pictureUrl, 'auto', 720, 'mediaLibrary')}
                        onError={(e) => {
                          imageErrorHandler(
                            e,
                            createImageUrl(selectedMedia.pictureUrl),
                            '/assets/mo-fallback-image.png',
                            'mediaLibrary',
                            ''
                          )
                        }}
                        alt=""
                      />
                    </ImageWrap>
                    <DescriptionDIV>
                      <TextareaDesp
                        placeholder={t(`mediaTab.placeholderDescription`)}
                        value={selectedMedia.description}
                        onChange={(e) => onSelectedMediaUpdate('description', e.target.value)}
                      ></TextareaDesp>
                    </DescriptionDIV>
                    <ImageTags>
                      {selectedMedia.tags.map((tag, index) => (
                        <TagDiv key={`${index}-${tag}`}>{tag}</TagDiv>
                      ))}
                      {!showTagInput && (
                        <TagDiv className="AddTags" onClick={() => setShowTagInput(true)}>
                          +
                        </TagDiv>
                      )}
                      {showTagInput && (
                        <SearchInput
                          placeholder={t(`mediaTab.placeholderEnterTag`)}
                          type="text"
                          onKeyDown={(e) => {
                            const tagValue = e.target.value.trim()
                            if (e.key === 'Enter' && tagValue) {
                              setShowTagInput(false)
                              onSelectedMediaUpdate('tags', tagValue)
                              dispatch(addNewTag(tagValue))
                            }
                          }}
                        />
                      )}
                    </ImageTags>
                    {chosenMedia.length < 2 && (
                      <DeleteImage onClick={() => setShowConfirm(true)}>{t(`mediaTab.deleteImage`)}</DeleteImage>
                    )}
                  </>
                )}
              </RightContainer>
            </MediaContainer>
            <BottomBar>
              <div className="LastBtn" style={{ display: 'flex' }}>
                {!viewOnly && (
                  <SaveAll onClick={onMediaInsert} disabled={chosenMedia.length === 0}>
                    <FaCheck /> {t(`mediaTab.choose`)}
                  </SaveAll>
                )}
                &nbsp;
                <SaveAll onClick={onSaveAllClick} disabled={toBeUpdatedItemsCount === 0}>
                  <FaRegSave /> {t(`mediaTab.saveAll`)}
                </SaveAll>
              </div>
            </BottomBar>
          </TabPanel>
        </div>
      </TabsContainer>
    </>
  )
}

MediaImagesContainer.propTypes = {
  userMedia: PropTypes.any,
  userMediaTags: PropTypes.array,
  onParamsChange: PropTypes.func.isRequired,
  selectedMedia: PropTypes.object,
  uploadImages: PropTypes.func,
  onDeleteClick: PropTypes.func,
  selectMedia: PropTypes.func,
  chosenMedia: PropTypes.array,
  onMediaInsert: PropTypes.func,
  toBeUpdatedItemsCount: PropTypes.number,
  onSaveAllClick: PropTypes.func,
  onSelectedMediaUpdate: PropTypes.func,
  limit: PropTypes.number.isRequired,
  fixedLimit: PropTypes.bool,
  singleSelection: PropTypes.bool,
  params: PropTypes.object,
  setPage: PropTypes.func,
  viewOnly: PropTypes.bool,
  value: PropTypes.bool,
  setValue: PropTypes.func,
}

export default MediaImagesContainer
