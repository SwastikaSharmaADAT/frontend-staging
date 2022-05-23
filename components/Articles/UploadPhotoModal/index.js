import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import DropNCrop from '@synapsestudios/react-drop-n-crop'
import '@synapsestudios/react-drop-n-crop/lib/react-drop-n-crop.min.css'
import { useTranslation } from 'next-i18next'
import Button from '../../UI/Button'
import Modal from '../../UI/Modal'

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: ${(props) => (props.isCover ? '600px' : '460px')};
  width: 100vw;
  overflow: hidden;
  @media (max-width: 500px) {
    width: 80vw;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    width: 80vw;
  }
`

const Wrapper = styled.div`
  padding: 25px;
  position: relative;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  font-style: normal;
  font-weight: 400;
  overflow: hidden;
  @media (max-width: 991px) {
    padding: 15px;
  }
`

const LoginContainer = styled.div`
  width: 100%;
  .dropzone {
    @media (min-width: 1024px) {
      padding: 0;
      height: 300px !important;
      overflow: hidden;
    }
    @media (max-width: 991px) and (orientation: landscape) {
      height: 110px !important;
    }
  }
  .dropzone-instructions--main {
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }
  .dropzone-instructions--sub {
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
  .drop-n-crop {
    @media (min-width: 1024px) {
      height: 304px !important;
    }
  }
  .drop-n-crop > div {
    overflow: hidden;
    @media (min-width: 1024px) {
      padding: 0;
      height: 300px !important;
    }
    @media (max-width: 991px) and (orientation: landscape) {
      height: 110px !important;
    }
  }
  .dropzone-validation {
    margin-top: 5px !important;
  }
`
const Heading = styled.h1`
  font-weight: 700;
  margin: 0 0 15px;
  padding: 0;
  color: #222;
  line-height: normal;
  font-size: 24px;
  text-align: left;
  font-family: 'Montserrat-Medium';
  @media (max-width: 767px) {
    font-size: 18px;
    margin: 0 0 10px;
  }
`

const BtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 991px) and (orientation: portrait) {
    flex-direction: column;
  }
  .BtnDiv {
    max-width: 45%;
    margin-top: 15px;
    @media (max-width: 991px) and (orientation: portrait) {
      max-width: 100%;
      margin-top: 5px;
    }
  }
`

const SocialSignupModal = (props) => {
  const { t } = useTranslation('profile')

  const checkButton = () => {
    if (props.value) {
      if (!props.value.error || props.value.result) {
        return false
      } else {
        return true
      }
    } else {
      return true
    }
  }

  return (
    <>
      {props.open && (
        <Modal closeOnOutsideClick={false} isOpen={props.open} closeModal={props.closeModal}>
          <PageWrapper isCover={props.isCover}>
            <Wrapper>
              <LoginContainer>
                <Heading>
                  {props.action} {t(`technique.your`)} {props.type} {t(`technique.photo`)}
                </Heading>
                <DropNCrop
                  value={props.value}
                  onChange={props.onChange}
                  canvasHeight="250px"
                  cropperOptions={{
                    guides: true,
                    viewMode: 1,
                    autoCropArea: 0.8,
                    aspectRatio: props.isCover ? 1.77 : 1,
                  }}
                  maxFileSize={Number(process.env.NEXT_PUBLIC_REACT_APP_MAX_IMAGE_SIZE)}
                  allowedFileTypes={['image/jpeg', 'image/jpg', 'image/png']}
                />
              </LoginContainer>
              <BtnWrap>
                <Button className="BtnDiv" disabled={checkButton()} onClick={props.applyHandler}>
                  {t(`technique.apply`)}
                </Button>
                <Button className="BtnDiv" onClick={props.closeModal}>
                  {t(`technique.cancel`)}
                </Button>
              </BtnWrap>
            </Wrapper>
          </PageWrapper>
        </Modal>
      )}
    </>
  )
}

SocialSignupModal.propTypes = {
  closeModal: PropTypes.func,
  open: PropTypes.bool,
  type: PropTypes.string,
  action: PropTypes.string,
  value: PropTypes.object,
  onChange: PropTypes.func,
  isCover: PropTypes.bool,
  applyHandler: PropTypes.func,
}

export default SocialSignupModal
