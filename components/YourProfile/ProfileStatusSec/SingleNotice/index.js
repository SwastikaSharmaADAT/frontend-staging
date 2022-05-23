import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { GrFormClose } from 'react-icons/gr'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import ReactHtmlParser from 'react-html-parser'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'

const NoticeContent = styled.div`
  padding: 10px;
  background: #fff;
  border: 2px solid #fff;
  font-size: 14px;
  line-height: 17px;
  color: #222222;
  display: flex;
  align-items: flex-start;
  margin-bottom: 5px;
  box-shadow: 1px 1px 6px rgb(0 0 0 / 10%);
  justify-content: space-between;
  a {
    cursor: pointer;
    svg {
      font-size: 10px;
      background: #fff;
      border-radius: 50%;
      width: 18px;
      height: 18px;
      line-height: normal;
      color: #000;
    }
  }
`

function SingleNotice({ index, notice, handleDelete }) {
  const [content, translateContent] =useTranslateContent('')

  useEffect(() => {
    if(!isEmptyObj(notice))
    translateContent(notice.content)
  }, [notice.content])
  return (
    <NoticeContent key={index}>
      {content ? ReactHtmlParser(content): notice && notice.content && ReactHtmlParser(notice.content)}
      <a>
        <GrFormClose onClick={() => handleDelete(notice.id)} />
      </a>
    </NoticeContent>
  )
}
SingleNotice.propTypes = {
  index: PropTypes.number,
  notice: PropTypes.object,
  handleDelete: PropTypes.func,
}
export default SingleNotice
