import React, { useState, useEffect } from "react";
// import PropTypes from 'prop-types'
// import ReactHtmlParser from 'react-html-parser'
import styled from "styled-components";
// import TeamItems from './TeamItems'
import * as Yup from "yup";
import { useFormik } from "formik";
import Button from "../../../components/UI/Button";
import Select from "../../../components/UI/Select";
import Input from "../../../components/UI/Input";
import { useTranslation } from "next-i18next";
import { convertDate } from '../../../utilities/convertDate'
import { currenciesList } from '../../../utilities/currenciesList'
import { convertCurrency } from '../../../utilities/convertCurrency'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { countriesUsingDecimal } from '../../../utilities/decimalUsingCountries'
import { decimalSeparatorMethod } from '../../../utilities/decimalSeparator'
import { setCurrencyObj } from '../../../modules/landingPage/landingPageSlice'
import {
  AddGiftCardProductToCart,
  getAdminAccesstoken,
  getProductListDetails,
} from "../../../modules/mygiftcard/mygiftcardslice";
import { isLoginToken } from "../../../utilities/authUtils";
import { useDispatch, useSelector } from "react-redux";
import { cartCheckout } from "../../../modules/cart/cartSlice";
import { unwrapResult } from "@reduxjs/toolkit";

import {
  closeAllModals,
  setLoginError,
  setLoginPopup,
  setSocialSignupError,
  toggleLoading,
} from "../../../modules/auth/authSlice";

const CommonWrapper = styled.div`
  margin: 0;
  padding: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const FormGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  svg {
    position: absolute;
    font-size: 20px;
    /* top: ${(props) => (props.hasError ? "24px" : "10px")}; */
    top: 10px;
    color: #ccc;
    right: 15px;
    cursor: pointer;
  }
  .MuiOutlinedInput-root.MuiInputBase-formControl {
    border-radius: 0;
    border: 2px solid #eee;
    border-color: ${(props) => (props.hasError ? "#d62d1e" : "#eee")};
    outline: 0;
    box-shadow: none;
    font-size: 14px;
    padding-right: 0 !important;
    color: #222;
    font-family: "Montserrat-Regular";
    font-weight: 400;
    font-size: 16px;
    padding: 0 4px;
    height: 40px;
    svg {
      position: inherit;
    }
    .MuiOutlinedInput-input {
      padding: 10px;
      font-family: "Montserrat-Regular";
      font-weight: 400;
      font-size: 16px;
      color: #222;
      &::placeholder {
        color: #666;
        opacity: 1;
      }
    }
  }
  .rtl-ar-content {
    direction: rtl;
  }
`;
const ErrorText = styled.span`
  color: #d62d1e;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  padding-bottom: 2px;
`;
const Vouchercontent = styled.div`
  padding: 2rem;
  box-sizing: border-box;
  width: 100%;
  margin: 0 auto;
  @media (max-width: 767px) {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
  }
`;

const CurrencyContent = styled.div`
  max-width: 200px;
`

const Titlecard = styled.h2`
  font-size: 24px;
  font-weight: normal;
  color: #222;
  line-height: 1.8;
  @media (max-width: 767px) {
    font-size: 16px;
  }
`;

const Cardactions = styled.div`
  position: relative;
  margin: 50px auto 30px;
  width: 100%;
  max-width: 500px;
  min-height: 250px;
  background: #000;
  display: flex;
  padding: 25px;
  box-sizing: border-box;
  border-radius: 30px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CardColumn = styled.div`
  width: 50%;
  display: flex;
  align-content: center;
  flex-wrap: wrap;
  border-right: 1px solid #eee;
  padding: 0 20px;
  img {
    margin-bottom: 10px;
  }
  @media (max-width: 768px) {
    border: 0;
    padding: 0;
    width: 100%;
  }
`

const CardText = styled.div`
  flex: 0 0 100%;
  line-height: 1.8;
  display: block;
  bottom: 20px;
  right: 15px;
  color: #fff;
  font-size: 14px;
  &.XLarge {
    font-size: 32px;
  }
  &.Framed {
    border: 1px solid #fff;
    text-align: center;
    max-width: 150px;
    margin: 10px 0 20px;
    flex: 0 0 100%;
  }
  &.Large {
    font-size: 20px;
    line-height: 2;
  }
  &.XSmall {
    font-size: 16px;
    margin-top: 0;
    text-align: center;
    max-width: 150px;
  }
  &.Small {
    font-size: 12px;
    margin-top: 30px;
  }
  &.Underline {
    text-decoration: underline;
  }
`;

const Maincontenth5 = styled.h5`
  font-weight: normal;
  font-size: 20px;
  margin-bottom: 20px;
`;
const Radiospan = styled.span`
  display: block;
  border: 1px solid #000;
  font-weight: bold;
  font-size: 15px;
  color: #000;
  padding: 8px 6px;
  text-align: center;
  cursor: pointer;
`;

const Radio = styled.div`
  width: 80px;
  margin-right: 8px;
  &:last-child {
    margin-right: 0;
  }
  input:checked {
    + span {
      background-color: #000;
      color: #fff;
      border-color: #000;
    }
  }
`;

const Cardtotitle = styled.div`
  font-weight: normal;
  font-size: 20px;
  margin: 2rem 0;
`;

const Price = styled.div`
`

const Shortp = styled.p`
  font-weight: normal;
  font-size: 14px;
  color: #222;
  margin: 1rem 0 2rem 0;
`;

const Buttongiftcard = styled.button`
  font-weight: 600;
  font-size: 16px;
  background-color: #222222;
  color: #fff;
  max-width: 300px;
  width: 100%;
`;

const LeftSide = styled.div`
  flex: 0 0 45%;
  padding: 2em;
  box-sizing: border-box;
  @media (max-width: 768px) {
    flex: 0 0 100%;
    padding: 0;
    order: 2;
  }
`;

const RightSide = styled.div`
  flex: 0 0 55%;
  @media (max-width: 768px) {
    flex: 0 0 100%;
  }
`;


const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email("invalid Email")
    .matches(
      /^(([^<>()[\]\\.,;:$^*\s@"]+(\.[^<>()[\]\\.,;:$^*\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "invalid Email"
    )
    .required("Email Required"),
  price: Yup.string(),
  name: Yup.string().required("Name Required"),
});


const GiftCardContent = () => {

  const currentCurrency = useSelector((state) => state.root.landingPage.currencyObj)
  const [currencyInfo, setCurrencyInfo] = useState(null)
  const localCurrency = currencyInfo && JSON.parse(currencyInfo)

  const [currency, setCurrency] = useState('EUR')
  const [conversionRate, setConversionRate] = useState(1)
  const [plusPricing, setPlusPricing] = useState('quarterly')
  const [proPricing, setProPricing] = useState('quarterly')
  const [decimalSeparator, setDecimalSeparator] = useState('comma')
  const [openTermsModal, setTermsModal] = useState(false)
  const [openPaymentModal, setPaymentModal] = useState(false)
  const [conversionComplete, setConverionComplete] = useState(false)

  const { t } = useTranslation("giftcard");

  const formatPrice = (priceVal) => {
    const seperator = decimalSeparator === 'comma' ? ',' : '.'
    const formattedPrice = priceVal.split(seperator)
    return formattedPrice
  }

  const getCurrencyDetail = (value) => {
    const obj = currenciesList.find((cur) => cur.value === value)
    return obj
  }

  const dispatch = useDispatch();
  const langCode = useSelector(
    (state) => state.root.staticContent.appLanguageCode
  );

  const { cartId, cart, isCartCheckoutFulfilled, url } = useSelector(
    (state) => state.root.cart
  );

  const userData = useSelector((state) => state.root.myProfile.userData);
  // console.log(userData);

  const giftcardDetails = useSelector(
    (state) => state.root?.mygiftcard?.productList[0]
  );
  console.log('giftcardDetails', giftcardDetails);

  useEffect(() => {
    dispatch(getProductListDetails(t));
  }, []);

  useEffect(() => {
    if (isCartCheckoutFulfilled) {
      window.open(url, "_self");
    }

    return () => {
      // TODO: clear state
    };
  }, [isCartCheckoutFulfilled]);

  const renderPriceSection = (amount) => {
    if (amount) {
      console.log(getCurrencyDetail, currency, getCurrencyDetail(currency))
      return (<Price>
        {getCurrencyDetail(currency).symbol}{' '}
        {
          formatPrice(
            decimalSeparatorMethod(
              (amount * conversionRate).toFixed(2),
              decimalSeparator
            )
          )[0]
        }
      </Price>)
    }
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    setFieldValue,
  } = useFormik({
    initialValues: {
      email: "",
      price: "100",
      name: "",
    },
    validationSchema,
    onSubmit(values) {
      if (!isLoginToken()) {
        dispatch(closeAllModals());
        dispatch(setLoginPopup(true));
        dispatch(setLoginError(null));
        dispatch(setSocialUserError(null));
      }
      const cartDetails = {
        type: "giftCardCheckout",
        giftcardDetails: {
          amount: JSON.stringify(Math.ceil(values.amount)),
          sent_to: values.name,
          email: values.email,
          sku: giftcardDetails.sku,
        },
        langCode: langCode ? langCode : "en",
        isGiftCard: true,
        t: t,
      };
      dispatch(cartCheckout(cartDetails));
      dispatch(toggleLoading(true));
    },
  });

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

  const date = new Date()
  const yearLater = date.setFullYear(date.getFullYear() + 1);
  const yearLaterFormatted = convertDate(yearLater)

  return (
    <>
      <CommonWrapper>
        <LeftSide>
          <Cardactions>
            <CardColumn>
              <CardText className="XLarge">{t(`giftCardContent.singular`)}</CardText>
              <CardText className="Large Framed">€ {values.amount}</CardText>
              <CardText className="XSmall">{currency !== 'EUR' ? renderPriceSection(values.amount) : ''}</CardText>
            </CardColumn>
            <CardColumn>
              <CardText className="Large">{t(`giftCardContent.hello`) + (values.name ? (" " + values.name) : "")},</CardText>
              <CardText>{t(`giftCardContent.sentFrom`)}</CardText>
              <CardText className="Large">{userData && userData.firstName && userData.lastName && (userData.firstName + ' ' + userData.lastName)}</CardText>
              <CardText>{t(`giftCardContent.use`)}</CardText>
              <CardText className="Underline">{t(`giftCardContent.seeHere`)}</CardText>
              <CardText className="Small">{t(`giftCardContent.expiryDate`)} {yearLaterFormatted}</CardText>
            </CardColumn>
          </Cardactions>
        </LeftSide>
        <RightSide>
        <Vouchercontent className="w-100 vouchers-content">
          <Titlecard className=" ">
            {t(`giftCardContent.title`)}
          </Titlecard>

          <div className="main-content-view">
            <CurrencyContent>
              <Select value={currency} onChange={(e) => handleCurrencyChange(e)}>
                {currenciesList.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.label}
                  </option>
                ))}
              </Select>
            </CurrencyContent>
            <Maincontenth5>{t(`giftCardContent.selectAmount`)}</Maincontenth5>
            <form className=" " onSubmit={handleSubmit}>
              <div className="d-flex flex-wrap">
                {giftcardDetails &&
                  giftcardDetails?.gift_card_amounts &&
                  giftcardDetails?.gift_card_amounts?.map((item, index) => (
                    <Radio>
                      <label>
                        <input
                          type="radio"
                          id={index}
                          onChange={() => setFieldValue("amount", item.amount)}
                          checked={values.amount === item.amount ? true : false}
                          value={item.amount}
                          name="fav_language"
                        />
                        <Radiospan htmlFor={index}>{renderPriceSection(item.amount)}</Radiospan>
                      </label>
                    </Radio>
                  ))}
                <div className="">
                  <Cardtotitle className="">
                    {t(`giftCardContent.quesion`)}
                  </Cardtotitle>
                </div>
                <FormGroup>
                  {errors.name && touched.name ? (
                    <ErrorText>{errors.name}</ErrorText>
                  ) : null}
                  <Input
                    type="text"
                    name="name"
                    placeholder={t(`giftCardContent.namePlaceholder`)}
                    onChange={handleChange}
                    values={values.name}
                    hasError={errors.name && touched.name}
                    onBlur={handleBlur}
                  />
                </FormGroup>
                <FormGroup>
                  {errors.email && touched.email ? (
                    <ErrorText className="error-email">
                      {errors.email}
                    </ErrorText>
                  ) : null}
                  <Input
                    type="email"
                    name="email"
                    placeholder={t(`giftCardContent.emailPlaceholder`)}
                    onChange={handleChange}
                    values={values.email}
                    hasError={errors.email && touched.email}
                    onBlur={handleBlur}
                  />
                </FormGroup>
                {/* <input type="text" className="form-control border-0" name="name" placeholder="Insert Name" />
                    <input type="text" className="form-control border-0" name="name" placeholder="Insert Email" /> */}
                <Shortp className="">
                  {t(`giftCardContent.lastNote`)}
                </Shortp>
                <Buttongiftcard className="btn border-0" type="submit">
                  {t(`giftCardContent.buttonText`)}
                </Buttongiftcard>
              </div>
            </form>
          </div>
        </Vouchercontent>
        </RightSide>
      </CommonWrapper>
    </>
  );
};

// TeamSection.propTypes = {
//   tabContent: PropTypes.object,
// }

export default GiftCardContent;
