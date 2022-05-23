import React, { useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { GrFormClose } from 'react-icons/gr'
import { Chip } from '@material-ui/core'
import styled from 'styled-components'

const PageWrapper = styled.div`
  width: 100%;
  .tagsInput {
    display: flex;
    width: 100%;
    align-items: flex-start;
    box-sizing: border-box;
    min-height: 100px;
    flex-wrap: wrap;
    border: 2px solid #eee;
    color: #666;
    font-size: 16px;
    font-weight: 400;
    height: auto;
    margin: 0 0 10px;
    padding: 15px;
    appearance: none;
    border-radius: 0;
    cursor: text;
  }

  #tags {
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 8px 0 0 0;
  }

  .tag {
    width: auto;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 0 8px;
    font-size: 14px;
    list-style: none;
    border-radius: 6px;
    margin: 0 8px 8px 0;
    background: #0052cc;
  }

  @media screen and (max-width: 567px) {
    .tags-input {
      width: calc(100vw - 32px);
    }
  }
  .email-input {
    border: 0;
    color: #222;
    font-size: 16px;
    height: 30px;
  }
  .width-max {
    width: 100% !important;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .width-max::placeholder {
    overflow: visible;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  .width-max::-webkit-input-placeholder {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
  .width-min {
    width: auto;
    background-color: transparent;
  }
  .email-input::placeholder {
    color: #222;
  }
  .email-input:hover,
  .email-input:focus {
    outline: 0;
  }
  .chip-margin {
    margin: 0 5px 5px 0;
  }
  @media screen and (max-width: 767px) {
    .email-input {
      font-size: 12px;
    }
  }
  .limitReached{
    color: #d62d1e;
    font-size: 12px;
    line-height: 15px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-align-items: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    padding-bottom: 2px;
  }
`
const TagsInput = (props) => {
  const [tags, setTags] = useState(props.tags)
  const [limitReached, setLimitReached] = useState(false)
  let myInp = useRef

  useEffect(() => {
    if (props.tags !== tags && !props.invite) {
      setTags(props.tags)
    }
  }, [props.invite, props.tags, tags])

  const removeTags = (indexToRemove) => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)])
    props.selectedTags([...tags.filter((_, index) => index !== indexToRemove)])
  }
  const addTags = (event) => {
    if ( props.max ) {
      if ( tags.length < props.max ){
        if (event.target.value !== '') {
          if (tags.find((tag) => tag === event.target.value)) {
            event.target.value = ''
          } else {
            setTags([...tags, event.target.value])
            props.selectedTags([...tags, event.target.value])
            event.target.value = ''
          }
        }
      } else {
        event.target.value = ''
        setLimitReached( true )
      }
    } else {
      if (event.target.value !== '') {
        if (tags.find((tag) => tag === event.target.value)) {
          event.target.value = ''
        } else {
          setTags([...tags, event.target.value])
          props.selectedTags([...tags, event.target.value])
          event.target.value = ''
        }
      }
    }
  }
  function validateEmail(email) {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return re.test(String(email).toLowerCase())
  }
  const onBlurHandler = () => {
    setLimitReached( false );
  }
  return (
    <PageWrapper>
      <div className="tagsInput" onClick={() => myInp.focus()}>
        {tags.map((tag, index) => (
          <Chip
            className="chip-margin"
            key={index}
            label={tag}
            onDelete={() => removeTags(index)}
            deleteIcon={props.type === 'text' && <GrFormClose />}
          />
        ))}
        <input
          ref={(ip) => (myInp = ip)}
          className={
            tags.length === 0
              ? 'email-input width-max'
              : 'email-input width-min'
          }
          type="text"
          onKeyDown={(event) => {
            if (
              (event.key === 'Enter' || event.key === ',') &&
              (props.type === 'text' ||
                (props.type === 'email' && validateEmail(event.target.value)))
            )
              addTags(event)
            else if (event.key === 'Backspace' && event.target.value === '') {
              removeTags(tags.length - 1)
            }
          }}
          onKeyUp={(e) => {
            if (
              e.key === ',' &&
              (props.type === 'text' ||
                (props.type === 'email' && !validateEmail(e.target.value))) &&
              e.target.value === ','
            )
              e.target.value = ''
          }}
          onBlur={onBlurHandler}
          placeholder={tags.length === 0 && props.placeholder}
        />
      </div>
      {
        limitReached && ( <div className="limitReached">You can only add {props.max} tags.</div>)
      }
    </PageWrapper>
  )
}
TagsInput.propTypes = {
  selectedTags: PropTypes.func,
  tags: PropTypes.array,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  invite: PropTypes.bool,
}
export default TagsInput
