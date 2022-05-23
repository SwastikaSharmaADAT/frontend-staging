import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import CloseIcon from '../../UI/CloseIcon/CloseIcon'
import SectionLeft from './SectionLeft'
import SectionRight from './SectionRight'

const ShareProfileWrap = styled.div`
  width: 100%;
  position: relative;
  max-width: 1120px;
  background: transparent;
  margin: 15px auto;
  display: flex;
  justify-content: space-between;
  .lightbox-close {
    position: absolute;
    right: 10px;
    top: 10px;
    color: #000;
    font-size: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9;
    @media( max-width: 767px ){
      color: #fff;
    }
    &.only-left {
      color: #fff;
      @media (max-width: 1024px) {
        right: 40px;
      }
      @media (max-width: 767px) {
        right: 20px;
      }
    }
  }
  @media (max-width: 767px) {
    flex-direction: column;
    /* margin: 40px 15px; */
    margin: 0;
    width: auto;
  }
  @media (max-width: 991px) {
    margin: 0;
  }
  @media (max-width: 1199px) {
    width: 90vw;
    max-height: 80vh;
  }
  @media (max-width: 991px) {
    width: 100%;
    max-height: 80vh;
  }
  @media (max-width: 767px) {
    width: 90vw;
    max-height: 80vh;
  }
  .slick-list {
    @media (max-width: 767px) {
      width: 70% !important;
      height: 300px;
    }
  }
  &.FullWidth {
    .slick-list {
      @media (min-width: 992px) and (max-width: 1024px) {
        width: 80% !important;
      }
      @media (max-width: 767px) {
        width: 70% !important;
        height: 300px;
      }
      @media (max-width: 991px) and (orientation: landscape) {
        width: 80% !important;
        height: 300px;
      }
    }
    @media (max-width: 991px) {
      flex-direction: column;
    }
    @media (max-width: 767px) {
      max-height: 70vh;
      overflow-y: auto;
      overflow-x: hidden;
      width: 80vw;
    }
    @media (max-width: 991px) and (orientation: landscape) {
      height: 70vh;
      overflow-y: auto;
      overflow-x: hidden;
      flex-direction: column;
      width: 80vw;
    }
  }
`

const AlbumPostsPopup = (props) => (
  <>
    <ShareProfileWrap className={props.showRightSection ? 'FullWidth' : null}>
      <CloseIcon
        className={props.showRightSection ? 'lightbox-close' : 'lightbox-close  only-left'}
        onclick={() => props.closeLightbox()}
      />

      <SectionLeft
        activeIndex={props.activeIndex}
        imagesData={props.imagesData}
        showRightSection={props.showRightSection}
      />
      {props.showRightSection && (
        <SectionRight
          userInfo={props.userInfo}
          likes={props.likes}
          postDate={props.postDate}
          comments={props.comments}
          albumTitle={props.albumTitle}
          activityId={props.activityId}
          activityType={props.activityType}
          activityOwnerUsername={props.activityOwnerUsername}
          shareSlug={props.shareSlug}
          singleActivityType={props.singleActivityType}
        />
      )}
    </ShareProfileWrap>
  </>
)

AlbumPostsPopup.propTypes = {
  imagesData: PropTypes.array,
  activeIndex: PropTypes.number,
  showRightSection: PropTypes.bool,
  userInfo: PropTypes.object,
  likes: PropTypes.array,
  comments: PropTypes.array,
  postDate: PropTypes.string,
  albumTitle: PropTypes.string,
  activityId: PropTypes.string,
  activityType: PropTypes.string,
  activityOwnerUsername: PropTypes.string,
  shareSlug: PropTypes.string,
  singleActivityType: PropTypes.bool,
  closeLightbox: PropTypes.func,
}

export default AlbumPostsPopup