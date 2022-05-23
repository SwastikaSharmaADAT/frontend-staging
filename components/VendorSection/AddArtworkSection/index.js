import React, { useState, useEffect } from 'react'
import { FaBook } from 'react-icons/fa'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { cloneDeep } from 'lodash'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { IoImageSharp } from 'react-icons/io5'
import { IoSquareOutline } from 'react-icons/io5'
import { IoCheckboxOutline } from 'react-icons/io5'
import { BsImage } from 'react-icons/bs'
import { VscChromeClose } from 'react-icons/vsc'
import { GrAdd } from 'react-icons/gr'
import { default as ReactSelect } from 'react-select'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import Input from '../../UI/Input'
import Textarea from '../../UI/Textarea'
import Radio from '../../UI/Radio'
import Checkbox from '../../UI/Checkbox'
import CustomCheckbox from '../../UI/CustomCheckbox'
import Label from '../../UI/Label'
import Button from '../../UI/Button'
import ButtonLight from '../../UI/ButtonLight'
import ModalComponent from '../../UI/Modal'
import MediaLibrary from '../../UI/MediaLibrary'
import { customMultiSelectStyles } from '../../UI/shared/styles'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { countriesData } from '../../../utilities/countriesList'
import { timePeriodsData } from '../../../utilities/timePeriodList'
import {
  getArtworkMediums,
  getArtworkGenres,
  addAnArtwork,
  getArtworkDetails,
  setArtworkDetail,
} from '../../../modules/subscription/subscriptionSlice'
import { getUserData, notifyError } from '../../../modules/profile/myProfileSlice'
import { isLoginToken } from '../../../utilities/authUtils'
import TagsInput from '../../InviteFriends/TagsInput/TagsInput'
import {
  CommonSection,
  HeadingSection,
  LearnMoreBtn,
  SectionRow,
  SectionHalfColumn,
  ImgMainContainer,
  SubSectionHeader,
  ImgSmContainer,
  AddImgContainer,
  FormGroup,
  UpgradeModal,
  MainSizer,
  RadioWrap,
  RadioLabelText,
  OrDivider,
  CheckboxContainerMain,
  CustomCheckBoxWrap,
  CustomCheckBoxLabel,
  FormSection,
  FormSectionWrap,
  BottomBtnsWrap,
  ErrorText,
  CustomTabsWrapper,
  DimensionsInput,
  SectionLabel,
  TimePeriodWrapper,
} from '../styled.js'
import LeftTabsBar from '../LeftTabsBar'
import { getSeriesName } from '../../../modules/dashboard/dashboardSlice'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../utilities/imageUtils'
import { useDebouncedValue } from '../../../hooks'
import useTranslateArray from '../../../hooks/useTranslateArray'
import SeriesAutoSuggest from './SeriesAutoSuggest/SeriesAutoSuggest'
import StepType from './StepType'
import RejectionInfoSection from './RejectionInfoSection'
import { useRouter } from 'next/router'
import Head from 'next/head'

const customStyles = {
  multiValue: (styles) => ({
    ...styles,
    background: '#FFFFFF',
    boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.1)',
    fontSize: '16px',
    color: '#222222',
    marginRight: '5px',
  }),
  valueContainer: () => ({
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '2px 14px',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
  }),
  control: () => ({
    border: '0',
    borderRadius: 0,
    boxShadow: 'none',
    display: 'flex',
    minHeight: '30px',
    width: '100%',
  }),
  placeholder: () => ({
    color: '#222',
    paddingLeft: '0',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: 'transparent',
    background: `url('/assets/language_cross.png') no-repeat right center`,
    borderRadius: 0,
    paddingLeft: '7px',
    width: '15px',
    marginRight: '5px',
    ':hover': {
      backgroundColor: 'transparent',
      color: 'transparent',
    },
  }),
  input: () => ({
    marginTop: '10px',
  }),
  indicatorsContainer: () => ({
    right: '0px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    svg: {
      display: 'none',
    },
  }),
  menu: (styles) => ({
    ...styles,
    width: '100%',
  }),
  option: (styles, { data }) => ({
    ...styles,
    paddingLeft: data.childOf ? '30px' : '15px',
  }),
}

const customStyles2 = {
  placeholder: () => ({
    fontSize: '16px',
    color: '#666',
    '@media only screen and (min-width: 1450px) and (max-width: 1677px)': {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      //maxWidth: '150px',
    },
    '@media (max-width: 767px)': {
      fontSize: '14px',
    },
  }),
  valueContainer: () => ({
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '2px 14px',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
  }),
  indicatorsContainer: () => ({
    right: '0px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    svg: {
      display: 'none',
    },
  }),
  menu: (styles) => ({
    ...styles,
    width: '100%',
  }),
}

const customStyles3 = {
  singleValue: () => ({
    background: '#fff',
    boxShadow: '1px 1px 5px rgba(0, 0, 0, 0.1)',
    fontSize: '13.6px',
    color: '#333',
    padding: '3px 3px 3px 6px',
  }),
  menu: (styles) => ({
    ...styles,
    width: '100%',
  }),
}

const AddArtworkSection = ({ editType }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation(['translation', 'dashboard', 'artworks', 'countries', 'successResponses'])
  const { artworkSlug } = router.query
  const countries = countriesData(t)
  const timePeriods = timePeriodsData(t)
  const [artMediumError, setArtMediumError] = useState({
    showError: false,
    error: '',
  })

  const artMediumErrorValidation = (items, referenceArr) => {
    let result = false
    let errMsg = ''
    items.forEach((item) => {
      if (item.childOf) {
        if (items.filter((x) => x.childOf === item.childOf).length > 1) {
          result = true
          errMsg = 'childMaxRequired'
        }
      } else {
        if (items.filter((x) => !x.childOf).length > 2) {
          result = true
          errMsg = 'parentMaxRequired'
        }
        if (
          referenceArr.filter((x) => x.childOf === item.value).length &&
          !items.filter((x) => x.childOf === item.value).length
        ) {
          result = true
          errMsg = 'childRequired'
        }
      }
    })
    setArtMediumError({
      showError: result,
      error: errMsg,
    })
  }

  const draftValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required('titleRequired')
      .test('', 'titleMaxLength', function (value) {
        if (value && value.length <= 250) return true
      }),
    // year: Yup.string().test('', 'invalidYear', function (value) {
    //   if (value === undefined) return true
    //   if ((value.length === 4 || value.length === 0) && parseInt(value) > 1000) return true
    // }),
  })

  const publishValidationSchema = Yup.object().shape({
    title: Yup.string()
      .required('titleRequired')
      .test('', 'titleMaxLength', function (value) {
        if (value && value.length <= 250) return true
      }),
    year: Yup.string()
      .required('invalidYear')
      .test('', 'invalidYear', function (value) {
        if (value === undefined) return true
        if ((value.length === 4 || value.length === 0) && parseInt(value) > 1000) return true
      }),
    artPhotos: Yup.array()
      .test('', 'artworkPhotosRequired', function (value) {
        if (value && value.length > 0) {
          const filteredArr = value.filter((o) => o.pictureUrl !== 'default')
          if (filteredArr.length > 0) {
            return true
          } else {
            return false
          }
        }
      })
      .of(Yup.object())
      .nullable()
      .required('artworkPhotosRequired'),
    priceOnRequest: Yup.boolean(),
    price: Yup.string().when(['priceOnRequest'], {
      is: (priceOnRequest) => {
        if (!priceOnRequest) return true
        return false
      },
      then: Yup.string()
        .test('', 'minimumPrice', function (value) {
          const threshold = values && values.artworkType !== 'digital' ? 50 : 10
          if (values && parseInt(value && value.replace(',', '.')) >= threshold) return true
        })
        .required('priceRequired'),
    }),
    artMaterial: Yup.string().when(['artworkType'], {
      is: (artworkType) => {
        if (artworkType !== 'digital') return true
        return false
      },
      then: Yup.string().required('artMaterialRequired'),
    }),
    type: Yup.string().required('artworkTypeRequired'),
    isAdmin: Yup.boolean().required('artistRequired'),
    nameOfArtist: Yup.object().when(['isAdmin'], {
      is: (isAdmin) => {
        if (!isAdmin) return true
        return false
      },
      then: Yup.object().shape({
        firstName: Yup.string().required('artistFirstNameRequired'),
        lastName: Yup.string().required('artistLastNameRequired'),
      }),
    }),
    partOfSeries: Yup.boolean(),
    seriesDetails: Yup.string().when(['partOfSeries'], {
      is: (partOfSeries) => {
        if (partOfSeries) return true
        return false
      },
      then: Yup.string().required('seriesNameRequired'),
    }),
    freeShipping: Yup.boolean(),
    shippingPrice: Yup.object().when(['artworkType'], {
      is: (artworkType) => {
        if (artworkType !== 'digital') return true
        return false
      },
      then: Yup.object().when(['freeShipping'], {
        is: (freeShipping) => {
          if (!freeShipping) return true
          return false
        },
        then: Yup.object().shape({
          domesticPrice: Yup.string().required('domesticPriceRequired'),
          internationalPrice: Yup.string().required('internationalPriceRequired'),
        }),
      }),
    }),
    editionDetail: Yup.object().when(['type'], {
      is: (type) => {
        if (type === 'edition') return true
        return false
      },
      then: Yup.object().shape({
        version: Yup.string().required('editionNoRequired'),
        count: Yup.string().required('editionTotalRequired'),
      }),
    }),
    sizeType: Yup.string(),
    artDimensions: Yup.object().when(['artworkType'], {
      is: (artworkType) => {
        if (artworkType !== 'digital') return true
        return false
      },
      then: Yup.object()
      .shape({
        length: Yup.string().required('lengthRequired'),
        height: Yup.string().required('heightRequired'),
      })
      .when(['sizeType'], {
        is: (sizeType) => {
          if (sizeType === '3D') return true
          return false
        },
        then: Yup.object().shape({
          length: Yup.string().required('lengthRequired'),
          width: Yup.string().required('widthRequired'),
          height: Yup.string().required('heightRequired'),
        }),
      }),
    }),
    isFramed: Yup.boolean(),
    frameDimensions: Yup.object().when(['sizeType', 'isFramed'], {
      is: (sizeType, isFramed) => {
        if (sizeType === '2D' && isFramed) return true
        return false
      },
      then: Yup.object().shape({
        length: Yup.string().required('frameLengthRequired'),
        width: Yup.string().required('frameWidthRequired'),
      }),
    }),
    frameMaterial: Yup.string().when(['sizeType', 'isFramed'], {
      is: (sizeType, isFramed) => {
        if (sizeType === '2D' && isFramed) return true
        return false
      },
      then: Yup.string().required('frameMaterialRequired'),
    }),
    timePeriod: Yup.string().required('timePeriodRequired'),
    genreId: Yup.array()
      .min(1, 'genreRequired')
      .max(2, 'selectMaxRequired')
      .of(Yup.object().shape({ value: Yup.string().required('required'), label: Yup.string().required('required') }))
      .nullable()
      .required('genreRequired'),
    // artMediumId: Yup.array()
    // .min(1, 'mediumRequired')
    // .max(2, 'selectMaxRequired')
    // .of(Yup.object().shape({ value: Yup.string().required('required'), label: Yup.string().required('required') }))
    // .nullable()
    // .required('mediumRequired'),
  })
  const artworkDetail = useSelector((state) => state.root.subscription.artworkDetail)
  const [enlargedImage, setEnlargedImage] = useState(0)
  const [artworkImages, setArtworkImages] = useState([{ pictureUrl: 'default' }])
  const [openMediaLibrary, setOpenMediaLibrary] = useState(false)
  const [picSelectIndex, setPicSelectIndex] = useState(0)
  const [mediaExpanded, setMediaExpanded] = useState([])
  const [upgradeModal, setUpgradeModal] = useState(false)

  const [isPublishType, setIsPublishType] = useState(
    editType && artworkDetail && artworkDetail.isPublished ? artworkDetail.isPublished : false
  )
  const [btnClicked, setBtnClicked] = useState(false)
  const [addType, setAddType] = useState(true)

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const hasActivePlan = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const userData = useSelector((state) => state.root.myProfile.userData)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  useEffect(() => {
    if (!hasActivePlan && !isEmptyObj(userData)) {
      router.push('/subscriptions')
     // notifyError(t(`dashboard:purchaseSubscriptionMessage`))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasActivePlan, router, userData])

  useEffect(() => {
    /**get user details on page render */
    if (
      ((isEmptyObj(userData) && loggedInUsername) ||
        (userData && loggedInUsername && userData.username && userData.username !== loggedInUsername)) &&
      isLoginToken()
    ) {
      dispatch(getUserData(loggedInUsername, 'fetchData', t))
    }
  }, [dispatch, loggedInUsername, userData])

  useEffect(() => {
    dispatch(getArtworkMediums())
    dispatch(getArtworkGenres())
  }, [dispatch])

  useEffect(() => {
    if (editType && artworkSlug) {
      dispatch(getArtworkDetails(artworkSlug))
    }
  }, [artworkSlug, dispatch, editType])

  const artworkMediums = [
    {
      _id: '60fbf2164ba943497327ba8d',
      title: 'Photography',
    },
    {
      _id: '60fbf2164ba943497327baa7',
      title: 'Real-World Scene',
      childOf: '60fbf2164ba943497327ba8d',
    },
    {
      _id: '60fbf2164ba943497327baad',
      title: 'Photo Manipulation',
      childOf: '60fbf2164ba943497327ba8d',
    },
    {
      _id: '60fbf2164ba943497327ba8e',
      title: 'New Media',
    },
    {
      _id: '60fbf2164ba943497327ba8f',
      title: 'Sculpture',
    },
    {
      _id: '60fbf2164ba943497327ba97',
      title: 'Ceramic',
      childOf: '60fbf2164ba943497327ba8f',
    },
    {
      _id: '60fbf2164ba943497327bab6',
      title: 'Marble',
      childOf: '60fbf2164ba943497327ba8f',
    },
    {
      _id: '60fbf2164ba943497327ba9c',
      title: 'Stone',
      childOf: '60fbf2164ba943497327ba8f',
    },
    {
      _id: '60fbf2164ba943497327baa2',
      title: 'Composite',
      childOf: '60fbf2164ba943497327ba8f',
    },
    {
      _id: '60fbf2164ba943497327baa4',
      title: 'Tribal',
      childOf: '60fbf2164ba943497327ba8f',
    },
    {
      _id: '60fbf2164ba943497327baa6',
      title: 'Ceramic',
      childOf: '60fbf2164ba943497327ba8f',
    },
    {
      _id: '60fbf2164ba943497327baa8',
      title: 'Metal',
      childOf: '60fbf2164ba943497327ba8f',
    },
    {
      _id: '60fbf2164ba943497327baa9',
      title: 'Wood',
      childOf: '60fbf2164ba943497327ba8f',
    },
    {
      _id: '60fbf2164ba943497327baab',
      title: 'Installation',
      childOf: '60fbf2164ba943497327ba8f',
    },
    {
      _id: '60fbf2164ba943497327baae',
      title: 'Plaster',
      childOf: '60fbf2164ba943497327ba8f',
    },
    {
      _id: '60fbf2164ba943497327bab4',
      title: 'Porcelain',
      childOf: '60fbf2164ba943497327ba8f',
    },
    {
      _id: '60fbf2164ba943497327ba90',
      title: 'Painting',
    },
    {
      _id: '60fbf2164ba943497327ba91',
      title: 'Mixed Media',
    },
    {
      _id: '60fbf2164ba943497327ba92',
      title: 'Drawing',
    },
    {
      _id: '60fbf2164ba943497327ba93',
      title: 'Collage',
    },
    {
      _id: '60fbf2164ba943497327ba94',
      title: 'Digital Art',
    },
    {
      _id: '60fbf2164ba943497327baaf',
      title: 'Fumage',
    },
    {
      _id: '60fbf2164ba943497327bab0',
      title: 'Design',
    },
    {
      _id: '60fbf2164ba943497327baa0',
      title: 'Lighting',
      childOf: '60fbf2164ba943497327bab0',
    },
    {
      _id: '60fbf2164ba943497327baac',
      title: 'Textile',
      childOf: '60fbf2164ba943497327bab0',
    },
    {
      _id: '60fbf2164ba943497327bab1',
      title: 'Textile',
      childOf: '60fbf2164ba943497327bab0',
    },
    {
      _id: '60fbf2164ba943497327bab2',
      title: 'Furniture',
      childOf: '60fbf2164ba943497327bab0',
    },
    {
      _id: '60fbf2164ba943497327bab3',
      title: 'Glass',
      childOf: '60fbf2164ba943497327bab0',
    },
    {
      _id: '60fbf2164ba943497327baaa',
      title: 'Printmaking',
    },
    {
      _id: '60fbf2164ba943497327ba95',
      title: 'Woodcut',
      childOf: '60fbf2164ba943497327baaa',
    },
    {
      _id: '60fbf2164ba943497327ba96',
      title: 'Collagraph',
      childOf: '60fbf2164ba943497327baaa',
    },
    {
      _id: '60fbf2164ba943497327ba98',
      title: 'Etching',
      childOf: '60fbf2164ba943497327baaa',
    },
    {
      _id: '60fbf2164ba943497327ba9a',
      title: 'Giclée (inkjet)',
      childOf: '60fbf2164ba943497327baaa',
    },
    {
      _id: '60fbf2164ba943497327ba9d',
      title: 'Screenprint',
      childOf: '60fbf2164ba943497327baaa',
    },
    {
      _id: '60fbf2164ba943497327ba9e',
      title: 'Monoprint',
      childOf: '60fbf2164ba943497327baaa',
    },
    {
      _id: '60fbf2164ba943497327ba9f',
      title: 'Linocut',
      childOf: '60fbf2164ba943497327baaa',
    },
    {
      _id: '60fbf2164ba943497327baa1',
      title: 'Paper Marbling (suminagashi)',
      childOf: '60fbf2164ba943497327baaa',
    },
    {
      _id: '60fbf2164ba943497327baa3',
      title: 'C-Type (photo print)',
      childOf: '60fbf2164ba943497327baaa',
    },
    {
      _id: '60fbf2164ba943497327baa5',
      title: 'Lithograph',
      childOf: '60fbf2164ba943497327baaa',
    },
    {
      _id: '60fbf2164ba943497327bab5',
      title: 'Cyanotype',
      childOf: '60fbf2164ba943497327baaa',
    },
    {
      _id: '60fbf2164ba943497327ba99',
      title: 'Multimedia',
    },
    {
      _id: '60fbf2164ba943497327ba9b',
      title: 'Book',
    },
  ]
  const artworkGenres = useSelector((state) => state.root.subscription.artworkGenres)

  const addDefaultImage = () => {
    if (artworkImages && artworkImages.length < 5) {
      const newImages = [...artworkImages, { pictureUrl: 'default' }]
      setArtworkImages(newImages)
      setFieldValue('artPhotos', [...values.artPhotos, { pictureUrl: 'default' }])
    }
  }

  const getSelectedImage = (imgsData) => {
    if (imgsData.length === 1 && !isEmptyObj(imgsData[0])) {
      const newImages = [...artworkImages]
      newImages[picSelectIndex] = { ...imgsData[0] }
      setArtworkImages(newImages)
      const newImagesState = [...values.artPhotos]
      newImagesState[picSelectIndex] = { ...imgsData[0] }
      setFieldValue('artPhotos', newImagesState)
      if (values.artworkType === 'digital' ) setFieldValue('digiArtPath', newImagesState[0].pictureUrl)
    }
  }

  const onImgLoad = async ({ target: img }) => {
    const { naturalWidth, naturalHeight, width, height, src} = img;
    console.log(naturalWidth, naturalHeight, width, height, src)
    if (!src.includes('fallback')) {
      setFieldValue('imageDetails', { imageWidth: naturalWidth, imageHeight: naturalHeight })
    }
  };

  const deleteImage = (e, id) => {
    e.stopPropagation()
    const imagesCount = artworkImages.length
    const imagesState = [...artworkImages]
    const imagesValue = [...values.artPhotos]
    const filteredImagesState = imagesState.filter((imgObj, index) => index !== id)
    const filteredImagesValue = imagesValue.filter((imgObj, index) => index !== id)
    if (filteredImagesState.length === 0) {
      setArtworkImages([...filteredImagesState, { pictureUrl: 'default' }])
      setFieldValue('artPhotos', [...filteredImagesValue, { pictureUrl: 'default' }])
    } else {
      setArtworkImages(filteredImagesState)
      setFieldValue('artPhotos', filteredImagesValue)
    }
    if (imagesCount - 1 === id && enlargedImage === id) {
      setEnlargedImage(parseInt(id - 1) > -1 ? parseInt(id - 1) : 0)
    } else if (id < enlargedImage) {
      setEnlargedImage(enlargedImage - 1)
    }
  }

  const uploadImageHandler = (index) => {
    setOpenMediaLibrary(true)
    setPicSelectIndex(index)
  }
  const initialValues = {
    artPhotos:
      editType && artworkDetail && artworkDetail.artPhotos ? artworkDetail.artPhotos : [{ pictureUrl: 'default' }],
    digiArtPath:  editType && artworkDetail && artworkDetail.artPhotos && artworkDetail.artPhotos[0] ? artworkDetail.artPhotos[0].pictureUrl : '',
    artworkType: editType && artworkDetail && artworkDetail.artworkType ? artworkDetail.artworkType : '',
    imageDetails: {
      imageHeight: editType && artworkDetail && artworkDetail.imageDetails && artworkDetail.imageDetails.imageHeight ? artworkDetail.imageDetails.imageHeight + 'px' : '',
      imageWidth: editType && artworkDetail && artworkDetail.imageDetails && artworkDetail.imageDetails.imageWidth ? artworkDetail.imageDetails.imageWidth + 'px' : '',
      size: editType && artworkDetail && artworkDetail.imageDetails && artworkDetail.imageDetails.size ? artworkDetail.imageDetails.size + 'MB' : '',
    },
    title: editType && artworkDetail && artworkDetail.title ? artworkDetail.title : '',
    country: editType && artworkDetail && artworkDetail.country ? artworkDetail.country : '',
    year: editType && artworkDetail && artworkDetail.year ? artworkDetail.year : '',
    price: editType && artworkDetail && artworkDetail.price ? artworkDetail.price.toString().replace('.', ',') : '',
    priceOnRequest: editType && artworkDetail && artworkDetail.priceOnRequest ? artworkDetail.priceOnRequest : false,
    artMaterial: editType && artworkDetail && artworkDetail.artMaterial ? artworkDetail.artMaterial : '',
    description: editType && artworkDetail && artworkDetail.description ? artworkDetail.description : '',
    sizeType: editType && artworkDetail && artworkDetail.sizeType ? artworkDetail.sizeType : '2D',
    artDimensions: {
      height:
        editType && artworkDetail && artworkDetail.artDimensions && artworkDetail.artDimensions.height
          ? artworkDetail.artDimensions.height
          : '',
      length:
        editType && artworkDetail && artworkDetail.artDimensions && artworkDetail.artDimensions.length
          ? artworkDetail.artDimensions.length
          : '',
      width:
        editType && artworkDetail && artworkDetail.artDimensions && artworkDetail.artDimensions.width
          ? artworkDetail.artDimensions.width
          : '',
    },
    isFramed: editType && artworkDetail && artworkDetail.isFramed ? artworkDetail.isFramed : false,
    frameDimensions: {
      length:
        editType && artworkDetail && artworkDetail.frameDimensions && artworkDetail.frameDimensions.length
          ? artworkDetail.frameDimensions.length
          : '',
      width:
        editType && artworkDetail && artworkDetail.frameDimensions && artworkDetail.frameDimensions.width
          ? artworkDetail.frameDimensions.width
          : '',
    },
    frameMaterial: editType && artworkDetail && artworkDetail.frameMaterial ? artworkDetail.frameMaterial : '',
    artMediumId:
      editType &&
      artworkDetail &&
      artworkDetail.artMediumId &&
      Array.isArray(artworkDetail.artMediumId) &&
      artworkDetail.artMediumId.length > 0
        ? artworkDetail.artMediumId.map((artMedium) => ({
            value: artMedium._id,
            label: artMedium.title,
          }))
        : [],
    genreId:
      editType &&
      artworkDetail &&
      artworkDetail.genreId &&
      Array.isArray(artworkDetail.genreId) &&
      artworkDetail.genreId.length > 0
        ? artworkDetail.genreId.map((artGenre) => ({
            value: artGenre._id,
            label: artGenre.title,
          }))
        : [],
    subjects: editType && artworkDetail && artworkDetail.subjects ? artworkDetail.subjects : [],
    selfNote: editType && artworkDetail && artworkDetail.selfNote ? artworkDetail.selfNote : '',
    isDrafted: editType && artworkDetail && artworkDetail.isDrafted ? artworkDetail.isDrafted : false,
    isPublished: editType && artworkDetail && artworkDetail.isPublished ? artworkDetail.isPublished : false,
    type: editType && artworkDetail && artworkDetail.type ? artworkDetail.type : '', 
    editionDetail: {
      version:
        editType && artworkDetail && artworkDetail.editionDetail && artworkDetail.editionDetail.version
          ? artworkDetail.editionDetail.version
          : '',
      count:
        editType && artworkDetail && artworkDetail.editionDetail && artworkDetail.editionDetail.count
          ? artworkDetail.editionDetail.count
          : '',
    },
    timePeriod:
      userData && userData.userRole === 'artist'
        ? 'contemporary'
        : userData && userData.userRole === 'member'
        ? editType && artworkDetail && artworkDetail.timePeriod
          ? artworkDetail.timePeriod
          : ''
        : '',
    isAdmin: userData && userData.userRole === 'artist' ? true : false,
    nameOfArtist: {
      firstName:
        editType && artworkDetail && artworkDetail.nameOfArtist && artworkDetail.nameOfArtist.firstName
          ? artworkDetail.nameOfArtist.firstName
          : '',
      lastName:
        editType && artworkDetail && artworkDetail.nameOfArtist && artworkDetail.nameOfArtist.lastName
          ? artworkDetail.nameOfArtist.lastName
          : '',
    },
    partOfSeries: editType && artworkDetail && artworkDetail.partOfSeries ? artworkDetail.partOfSeries : false,
    seriesDetails: editType && artworkDetail && artworkDetail.seriesDetails ? artworkDetail.seriesDetails : '',
    freeShipping: editType && artworkDetail && artworkDetail.freeShipping ? artworkDetail.freeShipping : false,
    shippingPrice: {
      domesticPrice:
        editType && artworkDetail && artworkDetail.shippingPrice && artworkDetail.shippingPrice.domesticPrice
          ? artworkDetail.shippingPrice.domesticPrice.toString().replace('.', ',')
          : '',
      internationalPrice:
        editType && artworkDetail && artworkDetail.shippingPrice && artworkDetail.shippingPrice.internationalPrice
          ? artworkDetail.shippingPrice.internationalPrice.toString().replace('.', ',')
          : '',
    },
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { handleSubmit, handleChange, handleBlur, values, errors, touched, setFieldValue } = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: () => {
      if (isPublishType) {
        return publishValidationSchema
      }
      return draftValidationSchema
    },
    onSubmit(values) {
      const reqData = cloneDeep(values)
      if (reqData.artworkType === 'digital') {
        delete reqData.artDimensions
        delete reqData.frameDimensions
      } else {
        reqData.artworkType = 'physical'
        delete reqData.imageDetails
        delete reqData.digiArtPath
        reqData.artDimensions.length = parseInt(reqData.artDimensions.length)
        reqData.artDimensions.width = parseInt(reqData.artDimensions.width)
        reqData.artDimensions.height = parseInt(reqData.artDimensions.height)
        reqData.frameDimensions.length = parseInt(reqData.frameDimensions.length)
        reqData.frameDimensions.width = parseInt(reqData.frameDimensions.width)
        reqData.shippingPrice.domesticPrice = reqData.shippingPrice.domesticPrice
        ? parseFloat(reqData.shippingPrice.domesticPrice.toString().replace(',', '.'))
        : 0
        reqData.shippingPrice.internationalPrice = reqData.shippingPrice.internationalPrice
          ? parseFloat(reqData.shippingPrice.internationalPrice.toString().replace(',', '.'))
          : 0
      }
      reqData.artMediumId = reqData.artMediumId.map((o) => o.value)
      reqData.genreId = reqData.genreId.map((o) => o.value)

      reqData.editionDetail.count = parseInt(reqData.editionDetail.count)
      reqData.price = reqData.price ? parseFloat(reqData.price.toString().replace(',', '.')) : 0
      if (values.priceOnRequest) reqData.price = 0
      reqData.artPhotos = reqData.artPhotos.filter((o) => o.pictureUrl !== 'default').map((img) => img._id)
      if (editType) {
        reqData._id = artworkDetail._id
        reqData.artworkId = artworkDetail && artworkDetail.productSlug
      }

      dispatch(addAnArtwork(reqData, userData.isTrustedSeller, t)).then((result) => {
        if (result.messageCode && result.messageCode === 'addArtworkLimitExceed') {
          setUpgradeModal(true)
          setFieldValue('isDrafted', true)
          setFieldValue('isPublished', false)
          setIsPublishType(false)
          handleSubmit()
        }
      })
    },
  })
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (btnClicked) {
      handleSubmit()
      setBtnClicked(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPublishType, btnClicked])

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (!isEmptyObj(artworkDetail) && editType) {
      setIsPublishType(artworkDetail && artworkDetail.isPublished ? artworkDetail.isPublished : false)
      setArtworkImages(
        artworkDetail && artworkDetail.artPhotos && artworkDetail.artPhotos.length > 0
          ? artworkDetail.artPhotos
          : [{ pictureUrl: 'default' }]
      )
    } else if (!editType && addType) {
      setArtworkImages([{ pictureUrl: 'default' }])
      setAddType(false)
      dispatch(setArtworkDetail({}))
    }
  }, [artworkDetail, editType, dispatch, addType, setFieldValue])

  const preventMinusInInput = (event) => {
    if (event.charCode && (event.charCode === 101 || event.charCode === 45 || event.charCode === 43)) {
      event.preventDefault()
    }
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [suggest, setSuggest] = useState(true)
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const debouncedKeyword = useDebouncedValue(values.seriesDetails, 1000)
  /**get artworks on page load */
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    if (values.seriesDetails.length > 1 && suggest) {
      dispatch(getSeriesName({ search: values.seriesDetails, t: t }))
    }
    // eslint-disable-next-line
  }, [debouncedKeyword, dispatch])
  // const genres = artworkGenres.map((o) => ({ value: o._id, label: o.title }))
  // const mediums = artworkMediums.map((o) => ({ value: o._id, label: o.title }))

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [genreArr, translateGenreArr] = useTranslateArray(artworkGenres, 'title')
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [mediumArr, translateMediumArr] = useTranslateArray(artworkMediums, 'title')

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    translateGenreArr(artworkGenres, 'title')
    translateMediumArr(artworkMediums, 'title')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [artworkGenres.length, artworkMediums.length, translateGenreArr, translateMediumArr])

  const threshold = values && values.artworkType !== 'digital' ? 50 : 10
  return (
    <>
     <Head>
        <title>Add Artwork | ARTMO | The Art Network | Connecting The Art World</title>
      </Head>
      {openMediaLibrary && (
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={openMediaLibrary}
          closeModal={() => setOpenMediaLibrary(false)}
        >
          <MediaLibrary
            closeModal={() => setOpenMediaLibrary(false)}
            getUploadedImages={getSelectedImage}
            limit={1}
            fixedLimit={true}
            singleSelection={true}
          />
        </ModalComponent>
      )}
      {upgradeModal && (
        <ModalComponent closeOnOutsideClick={false} isOpen={upgradeModal}>
          <UpgradeModal>
            <img src="/assets/upgrade.svg" />
            <h1>{t(`artworks:addArtwork.upgradeModal.header`)}</h1>
            <p>{t(`artworks:addArtwork.upgradeModal.content`)}</p>
            <Button
              className="SubmitBtn"
              type="button"
              onClick={() => {
                router.push('/subscriptions')
              }}
            >
              {t(`artworks:addArtwork.buttons.upgrade`)}
            </Button>
          </UpgradeModal>
        </ModalComponent>
      )}
      <CustomTabsWrapper>
        <LeftTabsBar />
        <CommonSection className="customPanelContent">
          <HeadingSection>
            {!editType ? t(`artworks:addArtwork.addArtwork`) : t(`artworks:addArtwork.editArtwork`)}
            <LearnMoreBtn onClick={() => router.push('/knowledgebase')}>
              {t(`artworks:addArtwork.learnMore`)} <FaBook />
            </LearnMoreBtn>
          </HeadingSection>
          {editType && artworkDetail && artworkDetail.moderated === -1 && (
            <RejectionInfoSection
              title={t(`artworks:addArtwork.rejectionSection.title`)}
              reasonsHeading={t(`artworks:addArtwork.rejectionSection.reasonsHeading`)}
              artworkDetail={artworkDetail}
            />
          )}
          <SectionRow>
            <SectionHalfColumn>
              <ImgMainContainer onClick={() => uploadImageHandler(0)}>
                {artworkImages &&
                artworkImages[enlargedImage] &&
                artworkImages[enlargedImage].pictureUrl === 'default' ? (
                  <BsImage onClick={() => uploadImageHandler(0)} />
                ) : artworkImages &&
                  artworkImages[enlargedImage] &&
                  artworkImages[enlargedImage].pictureUrl !== 'default' ? (
                  <img
                    onLoad={onImgLoad}
                    src={createResizeImageUrl(artworkImages[enlargedImage].pictureUrl, 'auto', 720, 'mediaLibrary')}
                    onError={(e) => {
                      imageErrorHandler(
                        e,
                        createImageUrl(artworkImages[enlargedImage].pictureUrl),
                        '/assets/mo-fallback-image.png',
                        'mediaLibrary',
                        ''
                      )
                    }}
                    alt="artworkEnlargedImage"
                  />
                ) : null}
              </ImgMainContainer>
              <SectionRow className="InnerSecRow">
                {artworkImages &&
                  artworkImages.map((image, index) => {
                    if (image && !isEmptyObj(image) && image.pictureUrl === 'default') {
                      return (
                        <ImgSmContainer key={index} onClick={() => uploadImageHandler(index)}>
                          <BsImage />
                        </ImgSmContainer>
                      )
                    } else if (image && !isEmptyObj(image) && image.pictureUrl && image.pictureUrl !== 'default') {
                      return (
                        <ImgSmContainer key={index} onClick={() => setEnlargedImage(index)}>
                          <img
                            src={createResizeImageUrl(image.pictureUrl, 400, 'auto', 'mediaLibrary')}
                            onError={(e) => {
                              imageErrorHandler(
                                e,
                                createImageUrl(image.pictureUrl),
                                '/assets/mo-fallback-image.png',
                                'mediaLibrary',
                                ''
                              )
                            }}
                            alt="artworkImage"
                          />
                          <VscChromeClose className="delete-img" onClick={(e) => deleteImage(e, index)} />
                        </ImgSmContainer>
                      )
                    } else {
                      return ''
                    }
                  })}
                {artworkImages && artworkImages.length < 5 && (
                  <AddImgContainer onClick={() => addDefaultImage()}>
                    <GrAdd />
                  </AddImgContainer>
                )}
              </SectionRow>
              {errors.artPhotos && touched.artPhotos ? (
                <ErrorText>{t(`artworks:addArtwork.validationErrors.${errors.artPhotos}`)}</ErrorText>
              ) : null}
            </SectionHalfColumn>
            <SectionHalfColumn className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
              
              <div>
              <StepType
                values={values}
                errors={errors}
                touched={touched}
                setFieldValue={setFieldValue}
              />
              </div>
              {
                values.artworkType &&
              <>
              <FormSection>
                <SectionLabel>{t(`artworks:addArtwork.sectionLabels.overview`)}</SectionLabel>
                <FormGroup className="Mdwidth WithErr">
                  <Input
                    name="title"
                    type="text"
                    className={!errors.title && values.title ? '' : 'reqInp'}
                    placeholder={t(`artworks:addArtwork.placeholders.title`)}
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength="250"
                  />
                  {errors.title && touched.title ? (
                    <ErrorText>{t(`artworks:addArtwork.validationErrors.${errors.title}`)}</ErrorText>
                  ) : null}
                </FormGroup>
                {userData && userData.userRole === 'member' && (
                  <>
                    <FormGroup className="Mdwidth artistDetails">
                      <SectionHalfColumn className="InnerSectionHalfColumn">
                        <Input
                          name="firstNameOfArtist"
                          type="text"
                          placeholder={t(`artworks:addArtwork.placeholders.firstNameArtist`)}
                          value={values.nameOfArtist.firstName}
                          onChange={(e) =>
                            setFieldValue('nameOfArtist', { ...values.nameOfArtist, firstName: e.target.value })
                          }
                          onBlur={handleBlur}
                          className={values.nameOfArtist.firstName ? '' : 'reqInp'}
                        />
                        {errors.nameOfArtist && touched.nameOfArtist && errors.nameOfArtist.firstName ? (
                          <ErrorText>
                            {t(`artworks:addArtwork.validationErrors.${errors.nameOfArtist.firstName}`)}
                          </ErrorText>
                        ) : null}
                      </SectionHalfColumn>
                      <SectionHalfColumn className="InnerSectionHalfColumn">
                        <Input
                          name="lastNameOfArtist"
                          type="text"
                          placeholder={t(`artworks:addArtwork.placeholders.lastNameArtist`)}
                          value={values.nameOfArtist.lastName}
                          onChange={(e) =>
                            setFieldValue('nameOfArtist', { ...values.nameOfArtist, lastName: e.target.value })
                          }
                          onBlur={handleBlur}
                          className={values.nameOfArtist.lastName ? '' : 'reqInp'}
                        />
                        {errors.nameOfArtist && touched.nameOfArtist && errors.nameOfArtist.lastName ? (
                          <ErrorText>
                            {t(`artworks:addArtwork.validationErrors.${errors.nameOfArtist.lastName}`)}
                          </ErrorText>
                        ) : null}
                      </SectionHalfColumn>
                    </FormGroup>
                  </>
                )}
                <FormGroup className="Mdwidth margin-b-15">
                  <ReactSelect
                    className="CustomBoxSelect "
                    styles={{ ...customMultiSelectStyles, ...customStyles2 }}
                    name="country"
                    options={countries}
                    components={{
                      IndicatorSeparator: () => null,
                    }}
                    placeholder={t(`artworks:addArtwork.placeholders.country`)}
                    onBlur={handleBlur}
                    value={countries ? countries.find((item) => item.value === values.country) || '' : ''}
                    onChange={(item) => setFieldValue('country', item.value)}
                  />
                </FormGroup>

                <FormGroup className="Mdwidth YearWrap">
                  <Input
                    name="year"
                    type="text"
                    placeholder={t(`artworks:addArtwork.placeholders.year`)}
                    value={values.year}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxLength="4"
                    className={!errors.year && values.year ? '' : ' reqInp'}
                  />
                  {errors.year && touched.year ? (
                    <ErrorText>{t(`artworks:addArtwork.validationErrors.${errors.year}`)}</ErrorText>
                  ) : null}
                </FormGroup>
                { values && values.artworkType !== 'digital' &&
                  <FormGroup className="WithErr">
                    <Textarea
                      placeholder={t(`artworks:addArtwork.placeholders.artMaterial`)}
                      maxLength={500}
                      name="artMaterial"
                      value={values.artMaterial}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={!errors.artMaterial && values.artMaterial ? '' : 'reqInp'}
                    ></Textarea>
                    {errors.artMaterial && touched.artMaterial ? (
                      <ErrorText>{t(`artworks:addArtwork.validationErrors.${errors.artMaterial}`)}</ErrorText>
                    ) : null}
                  </FormGroup>
                }
                <FormGroup>
                  <Textarea
                    className="w100"
                    placeholder={t(`artworks:addArtwork.placeholders.description`)}
                    maxLength={500}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                  ></Textarea>
                </FormGroup>
                <FormGroup>
                  <Textarea
                    className="w100"
                    placeholder={t(`artworks:addArtwork.placeholders.selfNote`)}
                    maxLength={500}
                    name="selfNote"
                    value={values.selfNote}
                    onChange={handleChange}
                  ></Textarea>
                </FormGroup>
                <FormGroup className="IpadHalf">
                  <SectionHalfColumn className="InnerSectionHalfColumn">
                    <RadioWrap>
                      <Radio
                        classText={values.type ? "removeClass" : "removeClass hasErAy"}
                        name="type"
                        value={'unique'}
                        checked={values.type === 'unique'}
                        onChange={handleChange}
                      />
                      <RadioLabelText className="InnerText">
                        {t(`artworks:addArtwork.labels.unique`)}
                        {/* <BsFillQuestionCircleFill /> */}
                      </RadioLabelText>
                    </RadioWrap>
                  </SectionHalfColumn>
                  <SectionHalfColumn className="InnerSectionHalfColumn">
                    <RadioWrap>
                      <Radio
                        classText={values.type ? "removeClass" : "removeClass hasErAy"}
                        name="type"
                        value={'edition'}
                        checked={values.type === 'edition'}
                        onChange={handleChange}
                      />
                      <RadioLabelText className="InnerText">
                        {t(`artworks:addArtwork.labels.edition`)}
                        {/* <BsFillQuestionCircleFill /> */}
                      </RadioLabelText>
                    </RadioWrap>
                  </SectionHalfColumn>
                  
                </FormGroup>
                {errors.type && touched.type ? (
                    <ErrorText>{t(`artworks:addArtwork.validationErrors.${errors.type}`)}</ErrorText>
                  ) : null}
                {values.type === 'edition' && (
                  <>
                    <FormGroup className="Mdwidth MarginTop">
                      <SectionHalfColumn className="InnerSectionHalfColumn hdFieldsSpc">
                        <Input
                          name="editionVersion"
                          type="text"
                          placeholder={t(`artworks:addArtwork.placeholders.editionNo`)}
                          value={values.editionDetail.version}
                          onChange={(e) =>
                            setFieldValue('editionDetail', { ...values.editionDetail, version: e.target.value })
                          }
                          onBlur={handleBlur}
                          className={values.editionDetail.version ? '' : 'reqInp'}
                        />
                        {errors.editionDetail && touched.editionDetail && errors.editionDetail.version ? (
                          <ErrorText>
                            {t(`artworks:addArtwork.validationErrors.${errors.editionDetail.version}`)}
                          </ErrorText>
                        ) : null}
                      </SectionHalfColumn>
                      <SectionHalfColumn className="InnerSectionHalfColumn">
                        <Input
                          name="editionCount"
                          type="number"
                          min="1"
                          placeholder={t(`artworks:addArtwork.placeholders.editionTotal`)}
                          value={values.editionDetail.count}
                          onKeyPress={(e) => preventMinusInInput(e)}
                          onChange={(e) =>
                            setFieldValue('editionDetail', { ...values.editionDetail, count: parseInt(e.target.value) })
                          }
                          onBlur={handleBlur}
                          className={values.editionDetail.count ? '' : 'reqInp'}
                        />
                        {errors.editionDetail && touched.editionDetail && errors.editionDetail.count ? (
                          <ErrorText>
                            {t(`artworks:addArtwork.validationErrors.${errors.editionDetail.count}`)}
                          </ErrorText>
                        ) : null}
                      </SectionHalfColumn>
                    </FormGroup>
                  </>
                )}
                {userData && userData.userRole === 'artist' && (
                  <>
                    <FormGroup className="FlexStart SmFlexStart MarginTop">
                      <Checkbox name="isAdmin" onChange={handleChange} className="reqCheckArtist" checked={ editType && values.isAdmin} />
                      <RadioLabelText className="CheckboxText">
                        {t(`artworks:addArtwork.labels.creatorOfArtwork`)}
                        {/* <BsFillQuestionCircleFill /> */}
                      </RadioLabelText>
                    </FormGroup>
                    {!values.isAdmin && touched.isAdmin ? (
                      <ErrorText className="checkBoxError">
                        {t(`artworks:addArtwork.validationErrors.${errors.isAdmin}`)}
                      </ErrorText>
                    ) : null}
                  </>
                )}
                {userData && userData.userRole === 'member' && (
                  <>
                    <FormGroup className="FlexStart SmFlexStart MarginTop">
                      <Checkbox name="isAdmin" onChange={handleChange} className="reqCheckArtist" checked={ editType && values.isAdmin} />
                      <RadioLabelText className="CheckboxText">
                        I am the the owner of the artwork
                        {/* <BsFillQuestionCircleFill /> */}
                      </RadioLabelText>
                    </FormGroup>
                    {!values.isAdmin && touched.isAdmin ? (
                      <ErrorText className="checkBoxError">
                        {t(`artworks:addArtwork.validationErrors.artistRequired`)}
                      </ErrorText>
                    ) : null}
                  </>
                )}
                {/* {userData && userData.userRole === 'member' && (
                <>
                  <FormGroup className="Mdwidth MarginTop artistDetails">
                    <SectionHalfColumn className="InnerSectionHalfColumn">
                      <Input
                        name="firstNameOfArtist"
                        type="text"
                        placeholder={t(`artworks:addArtwork.placeholders.firstNameArtist`)}
                        value={values.nameOfArtist.firstName}
                        onChange={(e) =>
                          setFieldValue('nameOfArtist', { ...values.nameOfArtist, firstName: e.target.value })
                        }
                        onBlur={handleBlur}
                        className={values.nameOfArtist.firstName ? "" : "reqInp"}
                      />
                      {errors.nameOfArtist && touched.nameOfArtist && errors.nameOfArtist.firstName ? (
                        <ErrorText>
                          {t(`artworks:addArtwork.validationErrors.${errors.nameOfArtist.firstName}`)}
                        </ErrorText>
                      ) : null}
                    </SectionHalfColumn>
                    <SectionHalfColumn className="InnerSectionHalfColumn">
                      <Input
                        name="lastNameOfArtist"
                        type="text"
                        placeholder={t(`artworks:addArtwork.placeholders.lastNameArtist`)}
                        value={values.nameOfArtist.lastName}
                        onChange={(e) =>
                          setFieldValue('nameOfArtist', { ...values.nameOfArtist, lastName: e.target.value })
                        }
                        onBlur={handleBlur}
                        className={values.nameOfArtist.lastName ? "" : "reqInp"}
                      />
                      {errors.nameOfArtist && touched.nameOfArtist && errors.nameOfArtist.lastName ? (
                        <ErrorText>
                          {t(`artworks:addArtwork.validationErrors.${errors.nameOfArtist.lastName}`)}
                        </ErrorText>
                      ) : null}
                    </SectionHalfColumn>
                  </FormGroup>
                </>
              )} */}
                <FormGroup className="FlexStart SmFlexStart MarginTop">
                  <Checkbox name="partOfSeries" checked={values.partOfSeries} onChange={handleChange} />
                  <RadioLabelText className="CheckboxText">
                    {t(`artworks:addArtwork.labels.partOfSeries`)}
                    {/* <BsFillQuestionCircleFill /> */}
                  </RadioLabelText>
                </FormGroup>
                {values.partOfSeries && (
                  <FormGroup className="MarginTop WithErr">
                    <SeriesAutoSuggest
                      setSuggest={setSuggest}
                      setFieldValue={setFieldValue}
                      name="seriesDetails"
                      type="text"
                      placeholder={t(`artworks:addArtwork.placeholders.seriesName`)}
                      value={values.seriesDetails}
                      className={!errors.seriesDetails && values.seriesDetails ? '' : 'reqInp'}
                    />
                    {errors.seriesDetails && touched.seriesDetails ? (
                      <ErrorText>{t(`artworks:addArtwork.validationErrors.${errors.seriesDetails}`)}</ErrorText>
                    ) : null}
                  </FormGroup>
                )}
              </FormSection>
              <FormSection>
                <SectionLabel className="margin-t-15">{t(`artworks:addArtwork.sectionLabels.price`)}</SectionLabel>
                <FormGroup className="FlexStart Smallwidth">
                  <div className={!values.priceOnRequest ? 'PriceErrorDiv' : 'PriceErrorDiv fade'}>
                    <Input
                      type="text"
                      placeholder={t(`artworks:addArtwork.placeholders.price`)}
                      name="price"
                      value={values.price}
                      onChange={(e) => {
                        const regex = /^(\d*){0,1}(\d){0,2}$/
                        const value = e.target.value
                        if (value === '' || regex.test(value)) setFieldValue('price', e.target.value)
                      }}
                      onBlur={handleBlur}
                      className={!errors.price && values.price ? '' : 'reqInp'}
                    />
                    {errors.price && touched.price ? (
                      <ErrorText>{values.artworkType === 'digital' ? t(`artworks:addArtwork.validationErrors.minimumPriceDigital`) : t(`artworks:addArtwork.validationErrors.minimumPrice`)}</ErrorText>
                    ) : null}
                    {!errors.price &&
                    touched.price &&
                    values.price !== '' &&
                    values.price < threshold &&
                    !values.priceOnRequest ? (
                      <ErrorText>{values.artworkType === 'digital' ? t(`artworks:addArtwork.validationErrors.minimumPriceDigital`) : t(`artworks:addArtwork.validationErrors.minimumPrice`)}</ErrorText>
                    ) : null}
                  </div>
                  <OrDivider className={!values.priceOnRequest ? '' : ' fade'}>
                    {t(`artworks:addArtwork.labels.or`)}
                  </OrDivider>
                  <CheckboxContainerMain>
                    <Checkbox name="priceOnRequest" checked={values.priceOnRequest} onChange={handleChange} />
                    <RadioLabelText className="CheckboxText">
                      {t(`artworks:addArtwork.labels.priceOnRequest`)}
                      {/* <BsFillQuestionCircleFill /> */}
                    </RadioLabelText>
                  </CheckboxContainerMain>
                </FormGroup>
                {values.artworkType !== 'digital' && (
                <FormGroup className="FlexStart SmFlexStart">
                  <Checkbox name="freeShipping" checked={values.freeShipping} onChange={handleChange} />
                  <RadioLabelText className="CheckboxText">
                    {t(`artworks:addArtwork.labels.freeShipping`)}
                    {/* <BsFillQuestionCircleFill /> */}
                  </RadioLabelText>
                </FormGroup>
                )}
                {values.artworkType !== 'digital' && !values.freeShipping && (
                  <>
                    <FormGroup className="Mdwidth shippingPrice">
                      <SectionHalfColumn className="InnerSectionHalfColumn">
                        <Input
                          name="internationalPrice"
                          type="text"
                          placeholder={t(`artworks:addArtwork.placeholders.internationalPrice`)}
                          value={values.shippingPrice.internationalPrice}
                          onChange={(e) => {
                            const regex = /^(\d*),{0,1}(\d){0,2}$/
                            const value = e.target.value
                            if (value === '' || regex.test(value))
                              setFieldValue('shippingPrice', {
                                ...values.shippingPrice,
                                internationalPrice: e.target.value,
                              })
                          }}
                          onBlur={handleBlur}
                          className={values.shippingPrice.internationalPrice ? '' : 'reqInp'}
                        />
                        {errors.shippingPrice && touched.shippingPrice && errors.shippingPrice.internationalPrice ? (
                          <ErrorText>
                            {t(`artworks:addArtwork.validationErrors.${errors.shippingPrice.internationalPrice}`)}
                          </ErrorText>
                        ) : null}
                      </SectionHalfColumn>
                      <SectionHalfColumn className="InnerSectionHalfColumn">
                        <Input
                          name="domesticPrice"
                          type="text"
                          placeholder={t(`artworks:addArtwork.placeholders.domesticPrice`)}
                          value={values.shippingPrice.domesticPrice}
                          onChange={(e) => {
                            const regex = /^(\d*),{0,1}(\d){0,2}$/
                            const value = e.target.value
                            if (value === '' || regex.test(value))
                              setFieldValue('shippingPrice', { ...values.shippingPrice, domesticPrice: e.target.value })
                          }}
                          onBlur={handleBlur}
                          className={values.shippingPrice.domesticPrice ? '' : 'reqInp'}
                        />
                        {errors.shippingPrice && touched.shippingPrice && errors.shippingPrice.domesticPrice ? (
                          <ErrorText>
                            {t(`artworks:addArtwork.validationErrors.${errors.shippingPrice.domesticPrice}`)}
                          </ErrorText>
                        ) : null}
                      </SectionHalfColumn>
                    </FormGroup>
                  </>
                )}
              </FormSection>
              {values.artworkType === 'digital' ? 
                <FormSection>
                <SectionLabel className="margin-t-15">{t(`artworks:addArtwork.sectionLabels.size`)}</SectionLabel>
                <FormGroup className="InputFormGroup">
                <DimensionsInput className={'digital'}>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Input
                    placeholder={t(`artworks:addArtwork.placeholders.imageHeight`)}
                    type="number"
                    name="imageHeight"
                    min="1"
                    value={values.imageDetails.imageHeight}
                    onKeyPress={(e) => preventMinusInInput(e)}
                    onChange={(e) =>
                        setFieldValue('imageDetails', { ...values.imageDetails, height: e.target.value })
                    }
                    onBlur={handleBlur}
                    className={values.imageDetails.imageHeight ? '' : 'reqInp'}
                    />
                    <span style={{marginLeft: 5}}>px</span>
                    {errors.imageDetails && touched.imageDetails && errors.imageDetails.imageHeight ? (
                    <ErrorText>
                        {t(`artworks:addArtwork.validationErrors.${errors.imageDetails.imageHeight}`)}
                    </ErrorText>
                    ) : null}
                </div>
                <div style={{display: "flex", alignItems: "center"}}>
                    <Input
                    placeholder={t(`artworks:addArtwork.placeholders.imageWidth`)}
                    type="number"
                    name="imageWidth"
                    min="1"
                    value={values.imageDetails.imageWidth}
                    onKeyPress={(e) => preventMinusInInput(e)}
                    onChange={(e) =>
                        setFieldValue('imageDetails', { ...values.imageDetails, imageWidth: e.target.value })
                    }
                    onBlur={handleBlur}
                    className={values.imageDetails.imageWidth ? '' : 'reqInp'}
                    />
                    <span style={{marginLeft: 5}}>px</span>
                    {errors.imageDetails && touched.imageDetails && errors.imageDetails.imageWidth ? (
                    <ErrorText>
                        {t(`artworks:addArtwork.validationErrors.${errors.imageDetails.imageWidth}`)}
                    </ErrorText>
                    ) : null}
                  </div>
                    <div style={{display: "flex", alignItems: "center"}}>
                    <Input
                        placeholder={t(`artworks:addArtwork.placeholders.size`)}
                        type="number"
                        name="imageSize"
                        min="1"
                        value={values.imageDetails.size}
                        onKeyPress={(e) => preventMinusInInput(e)}
                        onChange={(e) =>
                        setFieldValue('imageDetails', { ...values.imageDetails, size: e.target.value })
                        }
                        onBlur={handleBlur}
                        className={values.imageDetails.size ? '' : 'reqInp'}
                    />
                    <span style={{marginLeft: 5}}>MB</span>
                    {errors.imageDetails && touched.imageDetails && errors.imageDetails.size ? (
                        <ErrorText>
                        {t(`artworks:addArtwork.validationErrors.${errors.imageDetails.size}`)}
                        </ErrorText>
                    ) : null}
                    </div>
                </DimensionsInput>
                </FormGroup>
              </FormSection>
              : 
                <FormSection>
                <SectionLabel className="margin-t-15">{t(`artworks:addArtwork.sectionLabels.size`)}</SectionLabel>
                <FormGroup className="InputFormGroup">
                  <CustomCheckBoxWrap className="InputFormGroupDiv">
                    <CustomCheckBoxLabel>{t(`artworks:addArtwork.labels.2D`)}</CustomCheckBoxLabel>
                    <CustomCheckbox
                      name="sizeType"
                      checked={values.sizeType === '3D'}
                      onChange={(e) => setFieldValue('sizeType', e.target.checked ? '3D' : '2D')}
                    />
                    <CustomCheckBoxLabel>{t(`artworks:addArtwork.labels.3D`)}</CustomCheckBoxLabel>
                  </CustomCheckBoxWrap>
                  <DimensionsInput className={values.sizeType === '3D' && 'threeFieldDimen'}>
                    <div>
                      <Input
                        placeholder={t(`artworks:addArtwork.placeholders.height`)}
                        type="number"
                        name="artworkHeigth"
                        min="1"
                        value={values.artDimensions.height}
                        onKeyPress={(e) => preventMinusInInput(e)}
                        onChange={(e) =>
                          setFieldValue('artDimensions', { ...values.artDimensions, height: e.target.value })
                        }
                        onBlur={handleBlur}
                        className={values.artDimensions.height ? '' : 'reqInp'}
                      />
                      {errors.artDimensions && touched.artDimensions && errors.artDimensions.height ? (
                        <ErrorText>
                          {t(`artworks:addArtwork.validationErrors.${errors.artDimensions.height}`)}
                        </ErrorText>
                      ) : null}
                    </div>
                    <div>
                      <Input
                        placeholder={t(`artworks:addArtwork.placeholders.length`)}
                        type="number"
                        name="artworkLength"
                        min="1"
                        value={values.artDimensions.length}
                        onKeyPress={(e) => preventMinusInInput(e)}
                        onChange={(e) =>
                          setFieldValue('artDimensions', { ...values.artDimensions, length: e.target.value })
                        }
                        onBlur={handleBlur}
                        className={values.artDimensions.length ? '' : 'reqInp'}
                      />
                      {errors.artDimensions && touched.artDimensions && errors.artDimensions.length ? (
                        <ErrorText>
                          {t(`artworks:addArtwork.validationErrors.${errors.artDimensions.length}`)}
                        </ErrorText>
                      ) : null}
                    </div>
                    {values.sizeType === '3D' && (
                      <div>
                        <Input
                          placeholder={t(`artworks:addArtwork.placeholders.width`)}
                          type="number"
                          name="artworkWidth"
                          min="1"
                          value={values.artDimensions.width}
                          onKeyPress={(e) => preventMinusInInput(e)}
                          onChange={(e) =>
                            setFieldValue('artDimensions', { ...values.artDimensions, width: e.target.value })
                          }
                          onBlur={handleBlur}
                          className={values.artDimensions.width ? '' : 'reqInp'}
                        />
                        {errors.artDimensions && touched.artDimensions && errors.artDimensions.width ? (
                          <ErrorText>
                            {t(`artworks:addArtwork.validationErrors.${errors.artDimensions.width}`)}
                          </ErrorText>
                        ) : null}
                      </div>
                    )}
                  </DimensionsInput>
                </FormGroup>
                {values.sizeType === '2D' && (
                  <>
                    <FormGroup className="FlexStart SmFlexStart AddFrame">
                      <Checkbox name="isFramed" checked={values.isFramed} onChange={handleChange} />
                      <RadioLabelText className="CheckboxText">
                        {t(`artworks:addArtwork.labels.addFrame`)}
                      </RadioLabelText>
                    </FormGroup>
                    {values.isFramed && (
                      <>
                        <FormGroup className="Mdwidth SmMdWidth FrameDimension">
                          <SectionHalfColumn className="InnerSectionHalfColumn">
                            <Input
                              name="frameWidth"
                              type="number"
                              placeholder={t(`artworks:addArtwork.placeholders.frameHeight`)}
                              min="1"
                              onKeyPress={(e) => preventMinusInInput(e)}
                              value={values.frameDimensions.width}
                              onChange={(e) =>
                                setFieldValue('frameDimensions', { ...values.frameDimensions, width: e.target.value })
                              }
                              onBlur={handleBlur}
                              className={values.frameDimensions.width ? '' : 'reqInp'}
                            />
                            {errors.frameDimensions && touched.frameDimensions && errors.frameDimensions.width ? (
                              <ErrorText>
                                {t(`artworks:addArtwork.validationErrors.${errors.frameDimensions.width}`)}
                              </ErrorText>
                            ) : null}
                          </SectionHalfColumn>
                          <SectionHalfColumn className="InnerSectionHalfColumn">
                            <Input
                              name="frameLength"
                              type="number"
                              placeholder={t(`artworks:addArtwork.placeholders.frameLength`)}
                              min="1"
                              onKeyPress={(e) => preventMinusInInput(e)}
                              value={values.frameDimensions.length}
                              onChange={(e) =>
                                setFieldValue('frameDimensions', { ...values.frameDimensions, length: e.target.value })
                              }
                              onBlur={handleBlur}
                              className={values.frameDimensions.length ? '' : 'reqInp'}
                            />
                            {errors.frameDimensions && touched.frameDimensions && errors.frameDimensions.length ? (
                              <ErrorText>
                                {t(`artworks:addArtwork.validationErrors.${errors.frameDimensions.length}`)}
                              </ErrorText>
                            ) : null}
                          </SectionHalfColumn>
                        </FormGroup>
                        <FormGroup className="WithErr">
                          <Textarea
                            placeholder={t(`artworks:addArtwork.placeholders.frameMaterial`)}
                            maxLength={500}
                            name="frameMaterial"
                            value={values.frameMaterial}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={!errors.frameMaterial && values.frameMaterial ? '' : 'reqInp'}
                          ></Textarea>
                          {errors.frameMaterial && touched.frameMaterial ? (
                            <ErrorText>{t(`artworks:addArtwork.validationErrors.${errors.frameMaterial}`)}</ErrorText>
                          ) : null}
                        </FormGroup>
                      </>
                    )}
                  </>
                )}
              </FormSection>
              }
              {userData && userData.userRole === 'member' && (
                <FormSectionWrap>
                  <Label>{t(`artworks:addArtwork.labels.timePeriod`)}</Label>
                  <TimePeriodWrapper>
                    <ReactSelect
                      className="CustomBoxSelect"
                      styles={{ ...customMultiSelectStyles, ...customStyles, ...customStyles3 }}
                      name="timePeriod"
                      placeholder={t(`artworks:addArtwork.placeholders.timePeriod`)}
                      options={timePeriods}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      value={timePeriods ? timePeriods.find((item) => item.value === values.timePeriod) || '' : ''}
                      onChange={(item) => setFieldValue('timePeriod', item.value)}
                      onBlur={handleBlur}
                    />
                    {errors.timePeriod && touched.timePeriod ? (
                      <ErrorText>{t(`artworks:addArtwork.validationErrors.${errors.timePeriod}`)}</ErrorText>
                    ) : null}
                  </TimePeriodWrapper>
                </FormSectionWrap>
              )}
              {
                values && values.artworkType !== 'digital' &&
                <FormSectionWrap>
                <Label>{t(`artworks:addArtwork.labels.medium`)}</Label>
                <div className="Mdwidth mkWid-100">
                  <ReactSelect
                    className="CustomBoxSelect"
                    styles={{ ...customMultiSelectStyles, ...customStyles }}
                    name="artMediumId"
                    placeholder={t(`artworks:addArtwork.placeholders.medium`)}
                    options={mediumArr.map((o) => ({ value: o._id, label: o.title, childOf: o.childOf }))}
                    components={{
                      IndicatorSeparator: () => null,
                      ClearIndicator: null,
                    }}
                    isMulti={true}
                    hideSelectedOptions={false}
                    value={
                      mediumArr && mediumArr.length > 0 && values.artMediumId.length > 0
                        ? mediumArr
                            .filter((el) => values.artMediumId.some((f) => f.value === el._id))
                            .map((o) => ({
                              value: o._id,
                              label: o.title,
                              childOf: o.childOf,
                            }))
                        : []
                    }
                    onChange={(item) => {
                      const newValues = item.reduce((acc, cur) => {
                        if (cur.childOf) {
                          var result = mediumArr.filter((obj) => {
                            if (item.filter((e) => e.value === obj._id).length > 0) {
                              return false
                            }
                            return obj._id === cur.childOf
                          })
                          if (result[0] && !item.includes(result[0]))
                            return acc.concat([
                              cur,
                              result.map((o) => ({
                                value: o._id,
                                label: o.title,
                                childOf: o.childOf,
                              }))[0],
                            ])
                        }
                        return acc.concat([cur])
                        // or acc.push([cur*cur , cur*cur*cur, cur+1]); return acc;
                      }, [])
                      artMediumErrorValidation(newValues, mediumArr)
                      setFieldValue('artMediumId', newValues || [])
                    }}
                    blur={handleBlur}
                  />
                  {/* <CheckboxTree
                  name="artMediumId"
                  iconsClass="fa5"
                  nodes={mediumArr}
                  expanded={mediaExpanded}
                  checked={values.artMediumId}
                  onCheck={(checked) => {
                    setFieldValue('artMediumId', checked)
                  }}
                  onExpand={expanded => setMediaExpanded( expanded )}
                  icons={{
                    check: <IoCheckboxOutlineIoSquareOutline/>,
                    uncheck: </>,
                }}
                /> */}
                  {/* {errors.artMediumId && touched.artMediumId && (
                   <ErrorText>{t(`artworks:addArtwork.validationErrors.${errors.artMediumId}`)}</ErrorText>
                )   } */}
                  {!errors.artMediumId && mediumArr && mediumArr.length > 0 && artMediumError.showError && (
                    <ErrorText>{t(`artworks:addArtwork.validationErrors.${artMediumError.error}`)}</ErrorText>
                  )}
                </div>
              </FormSectionWrap>
              }
              <FormSectionWrap>
                <Label>{t(`artworks:addArtwork.labels.genre`)}</Label>
                <div className="Mdwidth mkWid-100">
                  <ReactSelect
                    className="CustomBoxSelect"
                    styles={{ ...customMultiSelectStyles, ...customStyles }}
                    name="genreId"
                    placeholder={t(`artworks:addArtwork.placeholders.genre`)}
                    options={genreArr.map((o) => ({ value: o._id, label: o.title }))}
                    components={{
                      IndicatorSeparator: () => null,
                      ClearIndicator: null,
                    }}
                    isMulti={true}
                    value={
                      genreArr && genreArr.length > 0 && values.genreId && values.genreId.length > 0
                        ? genreArr
                            .filter((el) => values.genreId.some((f) => f.value === el._id))
                            .map((o) => ({ value: o._id, label: o.title }))
                        : []
                    }
                    onChange={(item) => setFieldValue('genreId', item || [])}
                    blur={handleBlur}
                    //searchable={true}
                  />
                  {errors.genreId && touched.genreId && (
                    <ErrorText>{t(`artworks:addArtwork.validationErrors.${errors.genreId}`)}</ErrorText>
                  )}
                  {!errors.genreId &&
                    genreArr &&
                    genreArr.length > 0 &&
                    values.genreId &&
                    values.genreId.length > 2 && (
                      <ErrorText>{t(`artworks:addArtwork.validationErrors.selectMaxRequired`)}</ErrorText>
                    )}
                </div>
              </FormSectionWrap>
              <FormSectionWrap>
                <Label>{t(`artworks:addArtwork.labels.subject`)}</Label>
                <TagsInput
                  selectedTags={(tags) => setFieldValue('subjects', tags)}
                  tags={values.subjects}
                  type="text"
                  max="3"
                  placeholder={t(`artworks:addArtwork.placeholders.subject`)}
                />
              </FormSectionWrap>
              <BottomBtnsWrap>
                {editType && artworkDetail && artworkDetail.isPublished ? null : (
                  <ButtonLight
                    className="DraftBtn"
                    type="button"
                    label={t(`artworks:addArtwork.buttons.saveDraft`)}
                    disabled={values.title ? false : true}
                    onClick={() => {
                      setFieldValue('isDrafted', true)
                      setFieldValue('isPublished', false)
                      setIsPublishType(false)
                      setBtnClicked(true)
                    }}
                  />
                )}
                <Button
                  className="SubmitBtn"
                  type="button"
                  disabled={(values.artworkType !== 'digital' && !values.artMediumId.length) || artMediumError.showError || errors.length}
                  onClick={() => {
                    setFieldValue('isDrafted', false)
                    setFieldValue('isPublished', true)
                    setIsPublishType(true)
                    setBtnClicked(true)
                  }}
                >
                  {t(`artworks:addArtwork.buttons.submitForReview`)}
                </Button>
              </BottomBtnsWrap>
              </>
              }
            </SectionHalfColumn>
          </SectionRow>
        </CommonSection>
      </CustomTabsWrapper>
    </>
  )
}

AddArtworkSection.propTypes = {
  editType: PropTypes.bool,
}

export default AddArtworkSection
