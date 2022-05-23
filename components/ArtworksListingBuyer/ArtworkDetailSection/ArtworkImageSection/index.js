import React, { useEffect, useState, useRef } from 'react'
import { RiEditBoxFill, RiDeleteBin6Line } from 'react-icons/ri'
import { IoPricetagSharp } from 'react-icons/io5'
import { BiSearch } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { unwrapResult } from '@reduxjs/toolkit'
import { useRouter } from 'next/router'
import { SRLWrapper, useLightbox } from 'simple-react-lightbox'
import { SideBySideMagnifier, MOUSE_ACTIVATION, TOUCH_ACTIVATION } from 'react-image-magnifiers'
import moment from 'moment'
import {
  ArtworkImageSectionWrap,
  ArtworkImageLeftIcons,
  MagnifierDiv,
  SectionRow,
  ImgSmContainer,
  ImgWrapper,
  IconWrap,
  ImageOverlay
} from '../../styled.js'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject.js'
import ModalComponent from '../../../UI/Modal'
import QuickEditModal from '../../../VendorSection/ArtworkListingSection/QuickEditModal'
import ConfirmBox from '../../../UI/ConfirmBox'
import { deleteDetailArtwork } from '../../../../modules/subscription/subscriptionSlice.js'
import { createImageUrl, imageErrorHandler, createNsfwImageUrl, checkIfImageExists } from '../../../../utilities/imageUtils'
import { isLoginToken } from '../../../../utilities/authUtils.js'

const ArtworkImageSection = () => {
  const { t } = useTranslation(['dashboard', 'artworks', 'successResponses', 'translation'])

  const magRef = useRef();
  const dispatch = useDispatch()
  const router = useRouter()

  const canvasRef = useRef(null)
  const [
    canvasUrl,
    setCanvasUrl,
  ] = useState(null)

  /**get artwork details from store */
  const artworkDetail = useSelector((state) => state.root.subscription.artworkDetail)

  const myProfile = useSelector((state) => state.root.myProfile)
  const dob =
    myProfile && myProfile.userData && myProfile.userData.dob && myProfile.userData.dob.value
      ? myProfile.userData.dob.value
      : ''
  let age = 0
  if (dob) age = moment().diff(moment(dob), 'years', false)

  /**get username from local storage */
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

  const [openModal, setOpenModal] = useState(false)
  const [largeSrc,setLargeSrc]=useState('')
  const [mainImageSrc,setMainImageSrc]=useState('')
  const [modal, setModal] = useState('')
  const [enlargedImage, setEnlargedImage] = useState(0)

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  /**oepn quick edit modal */
  const quickEditHandler = () => {
    setModal('quickEdit')
    setOpenModal(true)
  }
  /**open delete confirmation modal */
  const deleteHandler = () => {
    setModal('delete')
    setOpenModal(true)
  }

  /**delete artwork after confirmation */
  const confirmDelete = async () => {
    const resultAction = await dispatch(
      deleteDetailArtwork({ data: { artworkId: artworkDetail._id, type: 'artworkDetail' }, t })
    )
    const result = await unwrapResult(resultAction)
    if (result.success) {
      setOpenModal(false)
      router.push('/artworks')
    }
  }

  const { openLightbox } = useLightbox()

  let imagesArr = []
  if (artworkDetail.artPhotos) {
    artworkDetail.artPhotos.map((img) => {
      let obj = {src: createImageUrl(img.pictureUrl)}
      imagesArr.push(obj)
      return ''
    })
  }

  const lightboxOptions = {
    settings: {
      disableWheelControls: true,
      downloadedFileName: 'index'
    },
    buttons: {
      showAutoplayButton: false,
      showDownloadButton: false,
      showThumbnailsButton: false,
    },
  }

  const largeImageSrc=createNsfwImageUrl(
    {
      path: artworkDetail.artPhotos[enlargedImage].pictureUrl,
      login: isLoginToken(),
      age,
      genreList: artworkDetail && artworkDetail.genreId ? artworkDetail.genreId : null,
    },
    artworkDetail.artworkType === 'digital' ? 400 : 1600,
    artworkDetail.artworkType === 'digital' ? 'auto' : 'auto',
    'mediaLibrary',
    false
  )
  const imageSrc=createNsfwImageUrl(
    {
      path: artworkDetail.artPhotos[enlargedImage].pictureUrl,
      login: isLoginToken(),
      age,
      genreList: artworkDetail && artworkDetail.genreId ? artworkDetail.genreId : null,
    },
    artworkDetail.artworkType === 'digital' ? 400 : 1600,
    artworkDetail.artworkType === 'digital' ? 'auto' : 'auto',
    'mediaLibrary',
    false
  )

  

useEffect(()=>{
  checkIfImageExists(largeImageSrc,(exists)=>{
    if(exists && largeImageSrc!==imageSrc) return setLargeSrc(largeImageSrc)
    else return setLargeSrc(undefined)
  })
},[largeImageSrc])  

useEffect(()=>{
  checkIfImageExists(imageSrc,(exists)=>{
    if(exists ) return setMainImageSrc(imageSrc)
    else return setMainImageSrc(createNsfwImageUrl(
      {
        path: artworkDetail.artPhotos[enlargedImage].pictureUrl,
        login: isLoginToken(),
        age,
        genreList: artworkDetail && artworkDetail.genreId ? artworkDetail.genreId : null,
      },
      0,
      0,
      'mediaLibrary',
      true
    ))
  })
},[imageSrc])

useEffect(()=> {
  window.addEventListener('contextmenu', (e) => { if (e.target.classList.contains('SRLImage') ) { e.preventDefault(); return false;}})
}, [])

useEffect(() => {
  const c = canvasRef.current
  if (c) {
    const context2d = canvasRef.current && canvasRef.current.getContext("2d");
    context2d.moveTo(0, 0);
    context2d.fillStyle = "blue";
    context2d.fillRect(0, 0, 100, 100);
    setCanvasUrl(canvasRef.current && canvasRef.current.toDataUrl());  
  }
}, [canvasRef])

  return (
    <>
    {imageSrc && largeImageSrc && mainImageSrc &&
    <>
      {!isEmptyObj(artworkDetail) && (
        <>
          <ModalComponent closeOnOutsideClick={true} isOpen={openModal} closeModal={() => setOpenModal(false)}>
            {modal === 'quickEdit' && (
              <QuickEditModal type="detailPage" setOpenModal={setOpenModal} artworkInModal={artworkDetail} />
            )}
            {modal === 'delete' && (
              <ConfirmBox
                open={openModal}
                closeModal={() => setOpenModal(false)}
                deleteHandler={confirmDelete}
                confirmButtonText={t(`artworks.delete.confirmButton`)}
                heading={t(`artworks.delete.confirmDeleteText`)}
              />
            )}
          </ModalComponent>
          <ImgWrapper>
            <ArtworkImageSectionWrap onClick={() => {artworkDetail.artworkType !== 'digital' && openLightbox(enlargedImage)}}>
              {artworkDetail.userId.username === loggedInUsername && artworkDetail.inStock && (
                <ArtworkImageLeftIcons>
                  <IconWrap title={t(`quickEditTooltip`)}>
                    <IoPricetagSharp onClick={quickEditHandler} />
                  </IconWrap>
                  <IconWrap title={t(`editTooltip`)}>
                    <RiEditBoxFill onClick={() => router.push(`/artworks/edit/${artworkDetail.productSlug}`)} />
                  </IconWrap>
                  <IconWrap title={t(`deleteTooltip`)}>
                    <RiDeleteBin6Line onClick={deleteHandler} />
                  </IconWrap>
                </ArtworkImageLeftIcons>
              )}
              {artworkDetail.artworkType !== 'digital' && 
                <MagnifierDiv>
                  <BiSearch onClick={() => {openLightbox(enlargedImage)}} />
                </MagnifierDiv>
              }
              {artworkDetail.artPhotos &&
              artworkDetail.artPhotos[enlargedImage] &&
              artworkDetail.artPhotos[enlargedImage].pictureUrl ? (
                <>
                  <SideBySideMagnifier
                    ref={magRef}
                    className={"magnifierDiv " + artworkDetail.artworkType}
                    imageSrc={mainImageSrc || imageSrc}
                    imageAlt="artworkEnlargedImage"
                    alwaysInPlace={true}
                    cursorStyle="zoom-in"
                    mouseActivation={MOUSE_ACTIVATION.HOVER}
                    touchActivation={TOUCH_ACTIVATION.TAP}
                    largeImageSrc={largeSrc}
                  />
                </>
              ) : null}
              <ImageOverlay artworkType={artworkDetail.artworkType}/>
            </ArtworkImageSectionWrap>
            <SectionRow className="InnerSecRow">
              {artworkDetail.artPhotos &&
                artworkDetail.artPhotos.map((image, index) => {
                  if (image && !isEmptyObj(image) && image.pictureUrl) {
                    return (
                      <ImgSmContainer key={index} onClick={() => setEnlargedImage(index)}>
                        <img
                          src={createNsfwImageUrl(
                            {
                              path: image.pictureUrl,
                              login: isLoginToken(),
                              age,
                              genreList: artworkDetail && artworkDetail.genreId ? artworkDetail.genreId : null,
                            },
                            300,
                            300,
                            'mediaLibrary',
                            false
                          )}
                          onError={(e) => {
                            imageErrorHandler(
                              e,
                              createImageUrl(image.pictureUrl),
                              '/assets/artworkdemo.png',
                              'mediaLibrary',
                              ''
                            )
                          }}
                          alt="artworkImage"
                        />
                      </ImgSmContainer>
                    )
                  } else {
                    return ''
                  }
                })}
            </SectionRow>
            <SRLWrapper elements={imagesArr} options={lightboxOptions} ></SRLWrapper>
          </ImgWrapper>
        </>
      )}
      </>
  }
    </>
  )
}

export default ArtworkImageSection
