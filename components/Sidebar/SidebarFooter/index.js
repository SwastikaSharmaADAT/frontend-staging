import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import LanguageSelect from '../../Footer/LanguageSelect'
import Select from '../../UI/Select'
import { currenciesList } from '../../../utilities/currenciesList'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { convertCurrency } from '../../../utilities/convertCurrency'
import { toggleLoading } from '../../../modules/auth/authSlice'
import { setCurrencyObj } from '../../../modules/landingPage/landingPageSlice'
import { notifyError } from '../../../modules/profile/myProfileSlice.js'
import LanguagePopup from '../../LanguagePopup'

const SidebarFooterWrap = styled.div`
  width: 100%;
  background: #000;
  height: 52px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  @media( max-width: 767px ) {
    position: relative;
    top: -40px ;
  }
`

const LanguageSelectWrapper = styled.div`
  display: flex;
  width: 40%;
  padding: 0 5%;
  align-items: center;
  justify-content: center;
  .CustomBoxSelect {
    width: 100%;
    border: 0;
    outline: 0;
    text-transform: capitalize;
    svg {
      display: none;
    }
    > :first-child {
      border: 0;
      :hover,
      :focus {
        border: 0;
        outline: 0;
      }
    }
    :hover,
    :focus {
      border: 0;
      outline: 0;
    }
    &.my-react-select {
      :before {
        display: none;
      }
      select__menu-list::-webkit-scrollbar {
        width: 4px;
        height: 0px;
      }
      select__menu-list::-webkit-scrollbar-track {
        background: #f1f1f1;
      }
      select__menu-list::-webkit-scrollbar-thumb {
        background: #888;
      }
      select__menu-list::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    }
  }
  .LanguageLabel {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    text-align: left;
    font-size: 12px;
    color: #fff;
  }
`

const CurrencySelectWrapper = styled.div`
  display: flex;
  width: 40%;
  padding: 0 5%;
  align-items: center;
  justify-content: center;
  select {
    border: 0;
    margin: 0;
    color: #fff;
    font-size: 12px;
    option {
      color: #666;
    }
  }
`

const SidebarFooter = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation(['translation'])

  const currentCurrency = useSelector((state) => state.root.landingPage.currencyObj)
  const [currencyInfo, setCurrencyInfo] = useState(null)
  const localCurrency = currencyInfo && JSON.parse(currencyInfo)

  useEffect(() => {
    setCurrencyInfo(localStorage.getItem('currencyInfo'))
  }, [])

  const [currency, setCurrency] = useState('EUR')
  const [conversionRate, setConversionRate] = useState(1)
  const [conversionComplete, setConverionComplete] = useState(false)

  useEffect(() => {
    if (!isEmptyObj(currentCurrency) && currentCurrency.currency && currentCurrency.conversionRate) {
      setCurrency(currentCurrency.currency)
      setConversionRate(currentCurrency.conversionRate)
    } else {
      if (localCurrency) {
        if (!isEmptyObj(localCurrency) && localCurrency.currency && localCurrency.conversionRate) {
          setCurrency(localCurrency.currency)
          setConversionRate(localCurrency.conversionRate)
        } else {
          setCurrency('EUR')
          setConversionRate(1)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const disableLoading = () => {
    dispatch(toggleLoading(false))
    setConverionComplete(true)
  }

  const resetOnErr = () => {
    setCurrency('EUR')
    setConversionRate(1)
    disableLoading()
    notifyError(t(`translation:auth.serverResponses.errors.internalServerError`))
  }

  const handleCurrencyChange = (e) => {
    dispatch(toggleLoading(true))
    setCurrency(e.target.value)
    if (e.target.value !== 'EUR') {
      convertCurrency(e.target.value, setConversionRate, disableLoading, resetOnErr)
    } else {
      setConversionRate(1)
      disableLoading()
    }
  }

  useEffect(() => {
    if (conversionComplete) {
      const obj = {
        currency,
        conversionRate,
      }
      localStorage.setItem('currencyInfo', JSON.stringify(obj))
      dispatch(setCurrencyObj(obj))
      setConverionComplete(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversionComplete])

  return (
    <>
      <SidebarFooterWrap>
        <LanguageSelectWrapper>
          <LanguagePopup sidebar={true} className="sidebarLangSwitch"/>
        </LanguageSelectWrapper>
        <CurrencySelectWrapper>
          <Select value={currency} onChange={(e) => handleCurrencyChange(e)}>
            {currenciesList.map((item, index) => (
              <option value={item.value} key={index}>
                {item.label}
              </option>
            ))}
          </Select>
        </CurrencySelectWrapper>
      </SidebarFooterWrap>
    </>
  )
}


export default SidebarFooter
