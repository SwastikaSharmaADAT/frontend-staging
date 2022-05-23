import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { stripNonTextTags } from '../../../../utilities/parseHtmlUtils'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useDispatch, useSelector } from 'react-redux'
import { Editor } from '@tinymce/tinymce-react'
import { useFormik } from 'formik'
import DateFnsUtils from '@date-io/date-fns'
import { ThemeProvider } from '@material-ui/styles'
import { useTranslation } from 'next-i18next'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { unwrapResult } from '@reduxjs/toolkit'
import * as Yup from 'yup'
import { useRouter } from 'next/router'
import ReactHtmlParser from 'react-html-parser'
import { default as ReactSelect } from 'react-select'
import { datePickerTheme } from '../../../../utilities/datePickerTheme'
import AlbumPostsPopup from '../../../../components/YourProfile/AlbumPostsPopup'
import MediaLibrary from '../../../../components/UI/MediaLibrary'
import ModalComponent from '../../../../components/UI/Modal'
import Input from '../../../../components/UI/Input'
import Select from '../../../../components/UI/Select'
import Button from '../../../../components/UI/Button'
import Checkbox from '../../../../components/UI/Checkbox'
import { countriesData } from '../../../../utilities/countriesList'
import { addArticle, getArticleDetails, editArticle } from '../../../../modules/articles/articleSlice'
import { toggleLoading } from '../../../../modules/auth/authSlice'
import { customMultiSelectStyles } from '../../../../components/UI/shared/styles'
import RightSection from '../../../../components/NewsFeed/RightSection'
import SectionContent from '../../../../components/Articles/SectionContent'
import UploadPhotoModal from '../../../../components/Articles/UploadPhotoModal'
import withUser from '../../../../HOC/auth'
import staticFilesArray from '../../../../utilities/staticFilesArray'
import AddArticleRightSec from '../../../../components/NewsFeed/AddArticleRightSec'
import {
  uploadImageToMediaLibrary
} from '../../../../utilities/imageUtils'
import Head from 'next/head'

const FeedWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
  .error {
    color: #d62d1e;
    font-size: 13px;
    margin-top: 5px;
    margin-bottom: 7px;
    visibility: hidden;
    height: 20px;
  }
`
const YourProfileContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1290px;
  padding: 0 15px;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  @media (max-width: 1280px) {
    width: auto;
  }
  @media (min-width: 600px) and (max-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (max-width: 599px) {
    flex-direction: column;
  }
`
const LeftContainer = styled.div`
  position: relative;
  max-width: 844px;
  margin-right: 15px;
  margin-bottom: 30px;
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  padding: 18px;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: 991px) and (max-width: 1024px) {
    max-width: 558px;
  }
  @media (max-width: 991px) {
    margin-right: 0;
    max-width: 100%;
  }
  @media (max-width: 767px) {
    width: auto;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    width: 100%;
  }
  @media (max-width: 599px) and (orientation: landscape) {
    width: auto;
  }
`
const TitleWarp = styled.div`
  width: 100%;
  display: flex;
  .title-input {
    width: 100%;
  }
  input {
    width: 100%;
  }
`
const RightContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 350px;
  width: 100% ;
  background: #fff ;
  border: 1px solid #ccc;
  margin-bottom: 30px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 1023px) {
    max-width: 100%;
    width: 100% ;
    margin: 0 auto 20px auto;
  }
`

const ThreeCols = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (min-width: 991px) and (max-width: 1024px) {
    flex-direction: column;
  }
  @media (max-width: 767px) {
    flex-direction: column;
  }
`
const SelectCols = styled.div`
  max-width: 270px;
  width: 100%;
  display: flex;
  flex-direction: column;
  input {
    height: 32px;
  }
  select {
    height: 40px;
  }
  .permaExhi{
    p {
      margin-left: 30px ;
    }
  }
  .city-textbox {
    margin-bottom: 0;
  }
  @media (min-width: 991px) and (max-width: 1024px) {
    max-width: 100%;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    padding: 0 10px;
  }
  @media (max-width: 767px) {
    max-width: 100%;
  }
  .MuiOutlinedInput-root.MuiInputBase-formControl {
    border-radius: 0;
    border: 2px solid #eee;
    outline: 0;
    box-shadow: none;
    font-size: 14px;
    padding-right: 0 !important;
    color: #222;
    font-family: 'Montserrat-Regular';
    font-weight: 400;
    font-size: 16px;
    padding: 0;
    height: 40px;
    .MuiOutlinedInput-input {
      padding: 10px;
      font-family: 'Montserrat-Regular';
      font-weight: 400;
      font-size: 16px;
      color: #222;
      &::placeholder {
        color: #666;
        opacity: 1;
      }
    }
    :hover,
    :focus {
      border: 2px solid #eee;
    }
    :hover,
    :focus {
      .MuiOutlinedInput-notchedOutline {
        border-color: #eee;
      }
    }
    .MuiOutlinedInput-notchedOutline {
      border-color: transparent;
    }
  }
  input {
    height: 36px;
  }
  .CustomBoxSelect {
    min-height: 32px;
    input {
      height: 22px;
    }
    svg {
      display: none;
    }
  }
  .hidemePicker {
    display: none ;
  }
  .Datepicker {
    fieldset {
      border: 0;
    }
  }
`

const ButnsWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-top: 10px ;
  button {
    max-width: 130px;
    margin: 0px 0 10px;
    @media (max-width: 767px) {
      margin: 0 10px 10px 0;
    }
  }
  input {
    max-width: 130px;
    margin: 0 0 10px;
    @media (max-width: 767px) {
      margin: 0 10px 10px 0;
    }
  }
  @media (max-width: 767px) {
    justify-content: flex-start;
  }
  .draft-button {
    background: #eee;
    font-style: normal;
    color: #222;
    border: 0;
    outline: 0;
    height: 36px;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    font-family: 'Montserrat-Medium';
    font-weight: 100;
    margin-right: 10px;
  }
  .draft-button-diabled {
    background: #eee;
    font-style: normal;
    color: #bababa;
    border: 0;
    outline: 0;
    height: 36px;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    font-size: 16px;
    cursor: pointer;
    width: 100%;
    font-family: 'Montserrat-Medium';
    font-weight: 100;
    margin-right: 10px;
  }
`

const EditorWrap = styled.div`
  padding: 0px 0;
  border: 2px solid #eee;
  margin: 0px 0 12px;
  .tox .tox-statusbar {
    display: none;
  }
  .tox-tinymce {
    border: 0;
  }
  .tox .tox-menubar + .tox-toolbar-overlord .tox-toolbar__primary {
    border-color: #eee;
    border-width: 2px;
    background-image: none;
    border-bottom: 2px solid #eee;
  }
  .tox:not([dir='rtl']) .tox-toolbar__group:not(:last-of-type) {
    border-right: 0;
  }
  .tox .tox-menubar {
    @media (max-width: 767px) {
      background-image: none;
      border-bottom: 2px solid #eee;
    }
  }
`

const ArticleSectionWrap = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  padding: 0px 35px 0;
  justify-content: space-between;
  @media (max-width: 991px) {
    padding: 15px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 15px;
  }
`
/**
 *
 * @returns Add Article page
 */
const ArticleSection = () => {
  const { t } = useTranslation(['articles', 'errorResponses', 'successResponses'])
  const countries = countriesData(t)

  const dispatch = useDispatch()
  const router = useRouter()
  const { articleSlug, articleType } = router.query

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const accountType = userInfo && JSON.parse(userInfo).accountType

  const [articleImage, setArticleImage] = useState([])
  const [openUploadModal, setOpenUploadModal] = useState(false)
  const [openLightboxModal, setOpenLightboxModal] = useState(false)
  const [activeImage, setActiveImage] = useState(0)
  const [plainText, setPlainText] = useState(false)
  const articleToBeEdited = useSelector((state) => state.root.article.articleToBeEdited)

  const [ permanentExhibition, setPermanentExhibition ] = useState( false )

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  useEffect(() => {
    /**If this is edit article page, fetch the existing data */
    const getDataFunc = async () => {
      if (articleType && articleSlug) {
        dispatch(toggleLoading(true))
        const resultAction = await dispatch(getArticleDetails({ articleId: articleSlug, articleType, t }))
        const result = await unwrapResult(resultAction)
        if (result.data.success && result.data.data.article.picUrl) {
          setArticleImage([result.data.data.article.picUrl])
          delete errors.picUrl
          values.picUrl = result.data.data.article.picUrl._id
          setFieldValue('picUrl', result.data.data.article.picUrl._id)
        }
        dispatch(toggleLoading(false))
      }
    }
    getDataFunc()
    // eslint-disable-next-line
  }, [dispatch])

  /**delete article image handler */
  const deleteImg = (imgId) => {
    const imagesArr = [...articleImage]
    const filteredArr = imagesArr.filter((imgObj, index) => index !== imgId)
    setArticleImage(filteredArr)
    values.picUrl = ''
    setFieldError('picUrl', true)
    setFieldTouched('picUrl', true)
  }
  /**method to fetch Image from media library */
  const getUploadedImages = (imgsData) => {
    const imagesArr = [...articleImage]
    const existingImagesCount = imagesArr.length
    const requiredCount = 5 - existingImagesCount
    const uploadedImagesLength = imgsData.length
    if (requiredCount > 0 && uploadedImagesLength > 0) {
      if (uploadedImagesLength < requiredCount || uploadedImagesLength === requiredCount) {
        const newImages = [...imagesArr, ...imgsData]
        setArticleImage(newImages)
        setFieldError('picUrl', false)
        setFieldValue('picUrl', newImages[0]._id)
        values.picUrl = newImages[0]._id
      } else if (uploadedImagesLength > requiredCount) {
        let uploadedImagesReq = []
        for (let item = 0; item < requiredCount; item++) {
          uploadedImagesReq.push(imgsData[item])
        }
        const newImages = [...imagesArr, ...uploadedImagesReq]
        setArticleImage(newImages)
        setFieldError('picUrl', false)
        values.picUrl = newImages[0]._id
      }
    }
  }
  const handleOnImageChange = (data) => {
    setArticleImage(data)
  }
  /**method to toggle lightbox */
  const openLightboxHandler = (index) => {
    setActiveImage(index)
    setOpenLightboxModal(true)
  }
  /**category onChange handler */
  const categoryChangeHandler = (e) => {
    setFieldValue('category', e.target.value)
    setFieldError('category', '')
    /*
     *  clear errors if exhibition is selected
     * (required incase form is submitted before switching to exhibition)
     */
    if (e.target.value === 'exhibition') {
      setFieldError('country', '')
      setFieldError('city', '')
      setFieldError('startDate', '')
      setFieldError('endDate', '')
      setFieldTouched('country', false)
      setFieldTouched('city', false)
      setFieldTouched('startDate', false)
      setFieldTouched('endDate', false)
    }
  }
  /**Validation schema for formik */
  const validationSchema = Yup.object().shape({
    picUrl: Yup.string().required(t(`validationErrors.image`)),
    title: Yup.string()
      .required(t(`validationErrors.title`))
      .test('', t(`validationErrors.titleLength`), function (value) {
        if (value && value.length <= 200) return true
      }),
    description: Yup.string()
      .required(t(`validationErrors.description`))
      .test('', t(`validationErrors.descriptionLength`), function (value) {
        if (value && value.replaceAll(new RegExp('<[^>]*>', 'g'), '').replaceAll('&nbsp;', ' ').length <= 50000 && value.replaceAll(new RegExp('<[^>]*>', 'g'), '').replaceAll('&nbsp;', ' ').length >= 200)
          return true
      }),
    category: Yup.string().required(t(`validationErrors.category`)),
    country: Yup.string().when(['category'], {
      is: (category) => {
        if (category === 'exhibition') return true
        return false
      },
      then: Yup.string().required(t(`validationErrors.country`)),
    }),
    city: Yup.string().when(['category'], {
      is: (category) => {
        if (category === 'exhibition') return true
        return false
      },
      then: Yup.string().required(t(`validationErrors.city`)),
    }),
    isPermanent: Yup.boolean(),
    startDate: Yup.string('')
      .nullable()
      .when('isPermanent', {
        is: false,

        // is: (category) => {
        //   if (category === 'exhibition') return true
        //   return false
        // },
        then: Yup.string('').nullable().required(t(`validationErrors.startDate`)),
      }),
      
    endDate: Yup.string('')
      .nullable()
      .when('isPermanent', {
        is: false,
        // is: (category) => {
        //   if (category === 'exhibition') return true
        //   return false
        // },
        then: Yup.string('').nullable().required(t(`validationErrors.endDate`)),
      }),
  })
  const {
    handleSubmit,
    handleChange,
    setFieldValue,
    values,
    errors,
    handleBlur,
    touched,
    setFieldTouched,
    setFieldError,
    setErrors,
  } = useFormik({
    enableReinitialize: articleSlug && articleType ? true : false,
    initialValues: {
      status: '',
      title: articleToBeEdited && articleToBeEdited.title && articleSlug ? articleToBeEdited.title : '',
      picUrl: articleImage && articleImage.length > 0 && articleImage[0]._id ? articleImage[0]._id : '',
      description:
        articleToBeEdited && articleToBeEdited.description && articleSlug ? articleToBeEdited.description : '',
      category: articleType ? articleType : '',
      country: articleToBeEdited && articleToBeEdited.country && articleSlug ? articleToBeEdited.country : '',
      city: articleToBeEdited && articleToBeEdited.city && articleSlug ? articleToBeEdited.city : '',
      startDate:
        articleToBeEdited && articleToBeEdited.startDate && articleSlug ? new Date(articleToBeEdited.startDate) : '',
      endDate: articleToBeEdited && articleToBeEdited.endDate && articleSlug ? new Date(articleToBeEdited.endDate) : '',
    },
    validateOnChange: false,
    validationSchema,
    async onSubmit() {
      /**post validations, status flag will be 'publish' */
      dispatch(toggleLoading(true))
      values.status = 'publish'
      const reqObject = { ...values }
      reqObject.startDate = JSON.stringify(reqObject.startDate)
      reqObject.endDate = JSON.stringify(reqObject.endDate)
      reqObject.startDate = permanentExhibition ? "2022-01-01T10:32:00.000Z" : reqObject.startDate.substring(1, reqObject.startDate.length - 1)
      reqObject.endDate = permanentExhibition ? "2098-01-01T10:32:00.000Z" : reqObject.endDate.substring(1, reqObject.endDate.length - 1)

      if (articleType && articleSlug) {
        const resultAction = await dispatch(editArticle({ reqObject, articleId: articleSlug, t }))
        const response = unwrapResult(resultAction)
        if (response && response.data && response.data.success) {
          router.push(`/user/${loggedInUsername}/activity`)
        }
      } else {
        const resultAction = await dispatch(addArticle({ data: reqObject, t }))
        const response = unwrapResult(resultAction)
        if (response && response.data && response.data.success) {
          router.push(`/user/${loggedInUsername}/activity`)
        }
      }
      dispatch(toggleLoading(false))
    },
  })
  const draftHandler = async () => {
    /**validations are not required in case of draft */
    dispatch(toggleLoading(true))
    setErrors({})
    values.status = 'draft'
    const reqObject = { ...values }
    if (reqObject.startDate) {
      reqObject.startDate = JSON.stringify(reqObject.startDate)
      reqObject.startDate = reqObject.startDate.substring(1, reqObject.startDate.length - 1)
    }
    if (reqObject.endDate) {
      reqObject.endDate = JSON.stringify(reqObject.endDate)
      reqObject.endDate = reqObject.endDate.substring(1, reqObject.endDate.length - 1)
    }
    const resultAction = await dispatch(addArticle({ data: reqObject, t }))
    const response = unwrapResult(resultAction)
    if (response && response.data && response.data.success) {
      router.push(`/user/${loggedInUsername}/activity`)
    }
    dispatch(toggleLoading(false))
  }

  const applyHandler = async () => {
    if (articleImage) {
      let image = articleImage.result
      fetch(image)
        .then((res) => res.blob())
        .then(async (blob) => {
          const response = await uploadImageToMediaLibrary(blob, articleImage.filename)
          if (response && response.data && response.data.data) {
            const imgId = response.data.data.images[0]._id;
            setArticleImage(response.data.data.images)
            setFieldError('picUrl', false)
            setFieldValue('picUrl', imgId)
            values.picUrl = imgId
          } else {
            setFieldError('picUrl', true)
          }
          setOpenUploadModal(false)
        })
    }
  }
  const permanentChangeHandler = ( e ) => {
    
    let ifChecked = e.target.checked
    setPermanentExhibition( ifChecked )
   
  }
  return (
    <div>
      <Head>
        <title>Add Article | ARTMO | The Art Network | Connecting The Art World</title>
      </Head>
      <>
        <FeedWrapper>
          <YourProfileContainer>
            <LeftContainer>
              <form onSubmit={handleSubmit}>
                <>
                  {openUploadModal && (
                    <UploadPhotoModal
                    open={openUploadModal}
                    closeModal={() => setOpenUploadModal(false)}
                    type="article"
                    action="Upload"
                    value={articleImage}
                    onChange={handleOnImageChange}
                    isCover={true}
                    applyHandler={applyHandler}
                  />
                  )}
                  {openLightboxModal && (
                    <ModalComponent
                      closeOnOutsideClick={true}
                      isOpen={openLightboxModal}
                      closeModal={() => setOpenLightboxModal(false)}
                    >
                      <AlbumPostsPopup activeIndex={activeImage} imagesData={articleImage} />
                    </ModalComponent>
                  )}
                  <ArticleSectionWrap>
                    <SectionContent
                      deleteImg={deleteImg}
                      articleImage={articleImage}
                      openModal={() => setOpenUploadModal(true)}
                      openLightbox={openLightboxHandler}
                    />
                  </ArticleSectionWrap>
                  <div style={{ visibility: errors.picUrl && touched.picUrl ? 'visible' : 'hidden' }} className="error">
                    {errors.picUrl && touched.picUrl ? errors.picUrl : null}{' '}
                  </div>
                </>
                <TitleWarp>
                  <Input
                    className="title-input"
                    placeholder={t(`placeholderTitle`)}
                    type="text"
                    name="title"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.title}
                  />
                </TitleWarp>
                <div className="error" style={{ visibility: errors.title && touched.title ? 'visible' : 'hidden' }}>
                  {' '}
                  {errors.title && touched.title ? errors.title : null}{' '}
                </div>
                <EditorWrap>
                  <Editor
                    apiKey={process.env.NEXT_PUBLIC_REACT_APP_TINY_MCE}
                    value={values.description}
                    init={{
                      height: 500,
                      target: false,
                      placeholder: t(`articles:placeholderDescription`),
                      plugins:
                        'advlist autolink quickbars lists link image charmap print preview anchor searchreplace code fullscreen media paste code placeholder mediaembed imagetools',
                      menubar: false,
                      mobile: {
                        toolbar_mode: 'wrap',
                      },
                      media_live_embeds: true,
                      toolbar:
                        'bold italic underline h2 h3 removeformat alignleft aligncenter alignright alignjustify numlist blockquote media quickimage link',
                      quickbars_insert_toolbar: false,
                      quickbars_selection_toolbar: 'bold italic underline h2 h3',
                      quickbars_image_toolbar: 'alignleft aligncenter alignright | remove',
                      image_title: true,
                      automatic_uploads: true,
                      file_picker_types: 'image',
                      file_picker_callback: function (cb, value, meta) {
                        var input = document.createElement('input')
                        input.setAttribute('type', 'file')
                        input.setAttribute('accept', 'image/*')
                        input.onchange = function () {
                          var file = this.files[0]
                          var reader = new FileReader()
                          reader.onload = function () {
                            var id = 'blobid' + new Date().getTime()
                            var blobCache = tinymce.activeEditor.editorUpload.blobCache
                            var base64 = reader.result.split(',')[1]
                            var blobInfo = blobCache.create(id, file, base64)
                            blobCache.add(blobInfo)
                            cb(blobInfo.blobUri(), { title: file.name })
                          }
                          reader.readAsDataURL(file)
                        }
                        input.click()
                      },
                    }}
                    onEditorChange={(content) => {
                      setFieldValue('description', content)
                    }}
                    onBlur={() => setFieldTouched('description', true)}
                  ></Editor>
                </EditorWrap>
                <div
                  style={{ visibility: errors.description && touched.description ? 'visible' : 'hidden' }}
                  className="error"
                >
                  {' '}
                  {errors.description && touched.description ? errors.description : null}{' '}
                </div>
                <ThreeCols>
                  <SelectCols>
                    <Select
                      disabled={articleType && articleSlug}
                      onChange={categoryChangeHandler}
                      onBlur={() => setFieldTouched('category', true)}
                      value={values.category}
                      name="category"
                    >
                      <option value="" selected disabled>
                        {t(`category`)}
                      </option>
                      <option value="buzz">{t(`categoryOptions.option1`)}</option>
                      <option value="potd">{t(`categoryOptions.option2`)}</option>
                      {accountType === 'page' && <option value="exhibition">{t(`categoryOptions.option3`)}</option>}
                    </Select>
                    <div
                      style={{ display: errors.category && touched.category ? 'block' : 'none' }}
                      className="error"
                    >
                      {' '}
                      {errors.category && touched.category ? errors.category : null}{' '}
                    </div>
                    {values.category === 'exhibition' ? (
                      <>
                      <div className='permaExhi'> 
                        <Checkbox name="isPermanent" className="permanectCheck" onChange={( e ) => permanentChangeHandler(e)} checked={values.isPermanent} />
                        <p>Permanent Exhibition</p>
                      </div>
                      </>
                    ) : null}
                  </SelectCols>
                  <SelectCols>
                    {values.category === 'exhibition' ? (
                      <>
                        <ReactSelect
                          className="CustomBoxSelect"
                          styles={customMultiSelectStyles}
                          name="country"
                          options={countries}
                          components={{
                            IndicatorSeparator: () => null,
                          }}
                          placeholder={t(`placeholderCountry`)}
                          onBlur={handleBlur}
                          value={countries ? countries.find((item) => item.value === values.country) : ''}
                          onChange={(item) => {
                            setFieldValue('country', item.value)
                          }}
                        />
                        <div
                          style={{ visibility: errors.country && touched.country ? 'visible' : 'hidden' }}
                          className="error"
                        >
                          {errors.country && touched.country ? errors.country : null}
                        </div>
                          {
                          !permanentExhibition && (
                            <>
                        <ThemeProvider theme={datePickerTheme}>
                          <MuiPickersUtilsProvider utils={DateFnsUtils}>
                            <KeyboardDatePicker
                              className="Datepicker"
                              autoComplete="off"
                              id="date-picker-dialog"
                              format="MM/dd/yyyy"
                              clearable
                              placeholder={t(`placeholderStartDate`)}
                              value={values.startDate}
                              InputProps={{ readOnly: true }}
                              invalidDateMessage=""
                              invalidLabel=""
                              emptyLabel={null}
                              onError={() => <></>}
                              name="startDate"
                              onChange={(content) => {
                                setFieldValue('startDate', content)
                              }}
                              onClose={() => {
                                setTimeout(() => {
                                  if (values.startDate) {
                                    delete errors.startDate
                                  } else setFieldTouched('startDate', true)
                                }, 0)
                              }}
                              KeyboardButtonProps={{
                                'aria-label': 'change date',
                              }}
                              inputVariant="outlined"
                            />
                          </MuiPickersUtilsProvider>
                        </ThemeProvider>
                        <div
                          style={{ visibility: errors.startDate && touched.startDate ? 'visible' : 'hidden' }}
                          className="error"
                        >
                          {errors.startDate && touched.startDate ? errors.startDate : ''}
                        </div>
                        </>)
                        }
                      </>
                    ) : null}
                  </SelectCols>
                  <SelectCols>
                    {values.category === 'exhibition' ? (
                      <>
                        
                        <Input
                          className="city-textbox"
                          placeholder={t(`placeholderCity`)}
                          type="text"
                          name="city"
                          onBlur={handleBlur}
                          onChange={handleChange}
                          value={values.city}
                        />
                        <div
                          style={{ visibility: errors.city && touched.city ? 'visible' : 'hidden' }}
                          className="error"
                        >
                          {errors.city && touched.city ? errors.city : null}
                        </div>
                        {
                          !permanentExhibition && (
                            <>
                              <ThemeProvider theme={datePickerTheme}>
                              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                <KeyboardDatePicker
                                  className={permanentExhibition ? 'hidemePicker' : "Datepicker"}
                                  id="date-picker-dialog"
                                  format="MM/dd/yyyy"
                                  placeholder={t(`placeholderEndDate`)}
                                  name="endDate"
                                  clearable
                                  InputProps={{ readOnly: true }}
                                  invalidLabel=""
                                  minDate={values.startDate}
                                  minDateMessage={t(`validationErrors.endDateLarge`)}
                                  onClose={() => {
                                    setTimeout(() => {
                                      if (values.endDate) {
                                        delete errors.endDate
                                      } else setFieldTouched('endDate', true)
                                    }, 0)
                                  }}
                                  value={values.endDate}
                                  invalidDateMessage=""
                                  onChange={(content) => {
                                    setFieldValue('endDate', content)
                                  }}
                                  KeyboardButtonProps={{
                                    'aria-label': 'change date',
                                  }}
                                  inputVariant="outlined"
                                />
                              </MuiPickersUtilsProvider>
                            </ThemeProvider>
                            <div
                              style={{ display: errors.endDate && touched.endDate ? 'block' : 'none' }}
                              className="error"
                            >
                              {errors.endDate && touched.endDate ? errors.endDate : ''}
                            </div>{' '}
                            </>
                          ) 
                        }
                        
                        
                      </>
                    ) : null}
                    
                    {articleSlug && articleType ? (
                      <ButnsWrap>
                        {' '}
                        <Button type="submit">{t(`update`)}</Button>
                      </ButnsWrap>
                    ) : (
                      <ButnsWrap>
                        {values.category &&
                        (values.picUrl ||
                          values.title ||
                          values.description ||
                          values.country ||
                          values.city ||
                          values.startDate ||
                          values.endDate) ? (
                          <input className="draft-button" type="button" onClick={draftHandler} value="Save Draft" />
                        ) : (
                          <input className="draft-button-diabled" value="Save Draft" type="button" />
                        )}
                        <Button type="submit">{t(`submit`)}</Button>
                      </ButnsWrap>
                    )}
                  </SelectCols>
                </ThreeCols>
              </form>
            </LeftContainer>

            <RightContainer>
              {/* <RightSection /> */}
              <AddArticleRightSec/>
            </RightContainer>
          </YourProfileContainer>
        </FeedWrapper>
      </>
    </div>
  )
}

export async function getStaticPaths() {
  return {
    paths: ['/user/*/activity/add-article'],
    fallback: true,
  }
}
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default withUser(ArticleSection)
