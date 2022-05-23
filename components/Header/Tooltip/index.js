import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 160px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 46px;
  overflow: visible;
  left: 14px;
  @media (max-width: 767px) {
    right: inherit;
    top: 28px !important;
    left: -62px !important ;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    right: inherit;
    top: 49px !important;
    left: -12px !important;
  }
  :before {
    background: url('/assets/Polygon.png') no-repeat top center;
    width: 15px;
    left: -55px;
    height: 15px;
    content: ' ';
    top: -8px;
    position: relative;
    display: flex;
    text-align: center;
    margin: 0 auto;
    @media (max-width: 767px) {
      left: 63px;
      margin: inherit;
      top: -11px;
    }
  }
  .list-ul {
    list-style: none;
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
    flex-direction: column !important;
    margin-top: -14px;
  }
  .list-item {
    color: #666;
    text-align: left !important;
    padding: 8px 10px;
    text-decoration: none;
    line-height: 20px;
    font-size: 14px;
    border-bottom: 1px solid #eee;
    justify-content: flex-start !important;
    cursor: pointer;
    a {
      color: #666 !important;
    }
    .page-title {
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      overflow: hidden;
      margin: 0 0 0 5px !important;
      color: #666;
      width: 80px;
    }
    .PageImgNav {
      width: 24px !important;
      height: 24px !important;
      margin: 0 !important;
      @media (max-width: 767px) {
        width: 20px !important;
        height: 20px !important;
        max-width: 20px;
      }
    }
    &.page-list {
      display: flex;
      padding: 3px 5px;
      width: 150px;
      align-items: center;
      margin: 0;
      color: #666;
      @media (max-width: 1024px) {
        display: flex !important ;
      }
    }
    .list-arrow {
      @media (max-width: 767px) {
        position: relative;
        top: 2px;
      }
    }
  }
  .scroll-listing {
    display: block !important;
    max-height: 177px;
    overflow-y: auto;
    overflow-x: hidden;
    margin-top: 0 !important;
    .list-item {
      &.page-list {
        .page-title {
          width: 100%;
        }
      }
    }
    @media (max-width: 767px) {
      max-height: 157px;
    }
    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(241, 241, 241, 0.233);
    }

    ::-webkit-scrollbar-thumb {
      background: #000;
      cursor: pointer;
    }
  }
`
function Tooltip({ content }) {
  return (
    <DropdownContent className={'header-sub-menu'}>
      <div className="list-ul">
        <div className="list-item">{content}</div>
      </div>
    </DropdownContent>
  )
}
Tooltip.propTypes = {
  content: PropTypes.func,
}
export default Tooltip
