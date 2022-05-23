import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { unwrapResult } from '@reduxjs/toolkit'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import {
  QuickEditModalWrapper,
  TopHeaderBar,
  ModalForm,
  CustomOption,
  CustomOptionLabel,
  CloseWrap,
  CheckboxContainerMain,
  RadioLabelText,
} from '../../styled.js'
import Button from '../../../UI/Button'
import Input from '../../../UI/Input'
import Textarea from '../../../UI/Textarea'
import Checkbox from '../../../UI/Checkbox'
import CustomCheckbox from '../../../UI/CustomCheckbox'
import CloseIcon from '../../../UI/CloseIcon/CloseIcon'
import ConfirmBox from '../../../UI/ConfirmBox/index.js'
import { quickEditArtwork } from '../../../../modules/dashboard/dashboardSlice'
import { quickEditDetailArtwork } from '../../../../modules/subscription/subscriptionSlice.js'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'

const QuickEditModal = ({ artworkInModal, setOpenModal, type, callFiltersApi }) => {
  const { t } = useTranslation(['dashboard', 'successResponses', 'translation', 'artworks'])

  const dispatch = useDispatch()

  /**declared a state for form values */
  const [details, setDetails] = useState({
    artworkId: artworkInModal._id ? artworkInModal._id : '',
    title: artworkInModal.title ? artworkInModal.title : '',
    price: artworkInModal.price ? artworkInModal.price.toString().replace('.', ',') : '',
    inStock: artworkInModal.inStock ? artworkInModal.inStock : false,
    selfNote: artworkInModal.selfNote ? artworkInModal.selfNote : '',
    priceOnRequest: artworkInModal.priceOnRequest ? true : false,
  })
  /**state to toggle confirm modal */
  const [confirm, setConfirm] = useState(false)
  const minPrice = () => {
    if (details.price && parseInt(details.price && details.price.toString().replace(',', '.')) >= 50) return true

    return false
  }

  /**handles submit event */
  const submitHandler = async () => {
    if (details.price.toString().includes(',')) {
      details.price = parseFloat(details.price.toString().replace(',', '.'))
    } else {
      details.price = parseFloat(details.price)
    }
    let resultAction = ''

    if (type === 'detailPage')
      resultAction = await dispatch(quickEditDetailArtwork({ data: { ...details, pageType: 'detailPage' }, t }))
    else if (type === 'allArtworksPage')
      resultAction = await dispatch(quickEditDetailArtwork({ data: { ...details, pageType: 'allArtworksPage' }, t }))
    else resultAction = await dispatch(quickEditArtwork({ ...details, t: t }))

    const result = await unwrapResult(resultAction)
    /**If API call is successful, close the modal */
    if (result && result.success) {
      setOpenModal(false)
      if (type === 'allArtworksPage') {
        callFiltersApi()
      }
    }
  }
  return (
    <>
      {confirm && (
        <ConfirmBox
          open={true}
          closeModal={() => setConfirm(false)}
          deleteHandler={() => {
            setDetails({ ...details, inStock: false })
            setConfirm(false)
          }}
          confirmButtonText={t(`artworks.quickEdit.confirmButton`)}
          heading={t(`artworks.quickEdit.markAsSoldText`)}
        />
      )}
      <CloseWrap>
        <CloseIcon onclick={() => setOpenModal(false)} />
      </CloseWrap>

      <QuickEditModalWrapper>
        <TopHeaderBar>
          {t(`artworks.quickEdit.title`)}
          <img
            src={
              artworkInModal &&
              artworkInModal.artPhotos &&
              artworkInModal.artPhotos.length > 0 &&
              artworkInModal.artPhotos[0].pictureUrl
                ? createResizeImageUrl(artworkInModal.artPhotos[0].pictureUrl, 150, 150, 'mediaLibrary')
                : '/assets/artworkdemo.png'
            }
            onError={(e) => {
              imageErrorHandler(
                e,
                createImageUrl(artworkInModal.artPhotos[0].pictureUrl),
                '/assets/artworkdemo.png',
                'mediaLibrary',
                ''
              )
            }}
            alt="artwork-thumbnail"
          />
        </TopHeaderBar>
        <ModalForm>
          <Input
            placeholder={ t(`artworks.quickEdit.titlePlaceholder`)}
            onChange={(e) => {
              if (e.target.value.length < 251) setDetails({ ...details, title: e.target.value })
            }}
            value={details.title}
          />
          <Input
            placeholder={
              details.priceOnRequest
                ? t(`artworks.quickEdit.priceOnRequestPlaceholder`)
                : t(`artworks.quickEdit.pricePlaceholder`)
            }
            disabled={details.priceOnRequest ? true : false}
            onChange={(e) => {
              const regex = /^(\d*),{0,1}(\d){0,2}$/
              const value = e.target.value==='0'?'':e.target.value
              if (value === '' || regex.test(value)) setDetails({ ...details, price: e.target.value })
            }}
            value={!details.priceOnRequest ? details.price : ''}
          />
          <CheckboxContainerMain className="quick-edit-modal">
            <Checkbox
              name="priceOnRequest"
              checked={details.priceOnRequest}
              onChange={(e) =>
                setDetails({
                  ...details,
                  priceOnRequest: e.target.checked,
                  price: e.target.checked ? '' : 0,
                })
              }
            />
            <RadioLabelText className="CheckboxText quick-edit-modal">
              {t(`artworks:addArtwork.labels.priceOnRequest`)}
            </RadioLabelText>
          </CheckboxContainerMain>
          <Textarea
            placeholder={t(`artworks.quickEdit.selfNotePlaceholder`)}
            maxLength={500}
            value={details.selfNote}
            onChange={(e) => {
              if (e.target.value.length < 501) setDetails({ ...details, selfNote: e.target.value })
            }}
          ></Textarea>
          {!artworkInModal.isDrafted && artworkInModal.moderated === 1 && (
            <CustomOption>
              <CustomOptionLabel className="M-Left">{t(`artworks.quickEdit.switchLeft`)}</CustomOptionLabel>
              <CustomCheckbox
                onChange={(e) => {
                  if (!e.target.checked) setConfirm(true)
                  else setDetails({ ...details, inStock: true })
                }}
                checked={details.inStock}
              />
              <CustomOptionLabel>{t(`artworks.quickEdit.switchRight`)}</CustomOptionLabel>
            </CustomOption>
          )}
        </ModalForm>
        <Button
          disabled={
            !(
              details.title &&
              (((!details.price || isNaN(details.price)) && details.priceOnRequest) ||
                (details.price && minPrice() && !details.priceOnRequest))
            )
          }
          onClick={submitHandler}
        >
          {t(`artworks.quickEdit.saveChanges`)}
        </Button>
      </QuickEditModalWrapper>
    </>
  )
}
QuickEditModal.propTypes = {
  artworkInModal: PropTypes.object,
  setOpenModal: PropTypes.func,
  type: PropTypes.string,
  callFiltersApi: PropTypes.func,
}
export default QuickEditModal