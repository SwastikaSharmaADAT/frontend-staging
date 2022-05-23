import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { BiSearch } from 'react-icons/bi'
import { useTranslation } from 'next-i18next'
import { setEnableUserSearch } from '../../modules/profile/myProfileSlice'
import { useRouter } from 'next/router'

const HeaderSearchBar = styled.div`
  height: 35px;
  margin: 0 0 0 21px;
  background: #fff;
  border: 1px solid #000;
  display: flex;
  width: 85%;
  @media (max-width: 991px) {
  }
  @media (min-width: 768px) {
    display: none;
  }
  @media (max-width: 767px) {
    display: flex;
  }
`
const SearchIcon = styled.div`
  width: 32px;
  height: 35px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 22px;
    color: #000 !important;
    font-weight: bold;
  }
`

const SearchInput = styled.input`
  width: calc(100% - 32px);
  height: 35px;
  color: #000;
  background: transparent;
  border: 0;
  font-size: 14px;
  font-weight: 400;
  padding: 0;
  ::placeholder {
    color: #000;
  }
  :focus,
  :hover {
    outline: none;
    border: 0;
  }
`

const HeaderSearchMobile = () => {
  const { t } = useTranslation('header')

  const router = useRouter()
  const dispatch = useDispatch()

  const pathname = router.pathname

  const [text, setText] = useState('')

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && text && text.length < 21) {
      if (pathname.includes('/users')) {
        dispatch(setEnableUserSearch(true))
      }
      const params = router.query
      params.search = JSON.stringify(text)
      router.push({ pathname: '/users', query: params })
      setText('')
    }
  }

  return (
    <>
      <HeaderSearchBar>
        <SearchIcon>
          <BiSearch />
        </SearchIcon>
        <SearchInput
          type="text"
          placeholder={t(`search`)}
          value={text}
          onChange={handleTextChange}
          maxLength="20"
          onKeyDown={handleKeyPress}
        />
      </HeaderSearchBar>
    </>
  )
}

export default HeaderSearchMobile
