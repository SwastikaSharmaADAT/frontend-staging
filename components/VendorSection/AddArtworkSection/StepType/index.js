import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
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
  OptionsWrapper,
  ArtworkTypeNote,
  TimePeriodWrapper,
  ModalContainer,
  ModalHeading,
  FormStep,
  StepHeader,
  FirstStepOption,
  SubHeader
} from '../../styled.js'
import { values } from 'lodash'

const StepType = ({
  values,
  errors,
  touched,
  setFieldValue
}) => {

  console.log(values)

  return (
    <>
      <SectionLabel>TYPE</SectionLabel>
      <OptionsWrapper>
      <FirstStepOption className={values.artworkType === 'physical' ? "marked" : ""} onClick={() => setFieldValue('artworkType', 'physical')}>
        <img src="/assets/add-artwork-physical.svg"/>
        <p>a physical artwork</p>
      </FirstStepOption>
      <FirstStepOption className={values.artworkType === 'digital' ? "marked" : ""} onClick={() => setFieldValue('artworkType', 'digital')}>
        <img src="/assets/add-artwork-digital.svg"/>
        <p>a digital file</p>
      </FirstStepOption>
      </OptionsWrapper>
      {values.artworkType === 'digital' && <ArtworkTypeNote>Your artwork is a digital file. It is infinitely reproducible and downloadable upon purchase.</ArtworkTypeNote>}    
      {values.artworkType === 'physical' && <ArtworkTypeNote>Your artwork is a tangible item, which you will ship by mail. This includes prints of digital artpieces.</ArtworkTypeNote>}
      </>
  )
}

export default StepType
