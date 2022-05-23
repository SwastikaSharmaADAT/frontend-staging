import React, { useEffect, useState } from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { default as ReactSelect } from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { FormSection, TopHeading, RadioWrap, RadioLabelText, InputWarp } from '../../styled.js'
import Label from '../../../UI/Label'
import Input from '../../../UI/Input'
import Button from '../../../UI/Button'
import Radio from '../../../UI/Radio'
import { countriesData } from '../../../../utilities/countriesList'
import { customMultiSelectStyles } from '../../../UI/shared/styles'
import { saveVendorSettings } from '../../../../modules/dashboard/dashboardSlice.js'

const PayoutSection = () => {
  const { t } = useTranslation('dashboard')

  const [previouslyFilled, setPreviouslyFilled] = useState(false)
  const countries = countriesData(t)

  const dispatch = useDispatch()
  /**get settings from redux */
  const settings = useSelector((state) => state.root.dashboard.settings)
  const userData = useSelector((state) => state.root.myProfile.userData)
  useEffect(() => {
    if (settings && settings.payoutDetails) {
      for (const key in settings.payoutDetails) {
        if (`${settings.payoutDetails[key]}`) {
          setPreviouslyFilled(true)
          return
        }
      }
    }
  }, [settings])
  const isPaypal=(formik)=>formik.values.paymentType === 'paypal'
  const initialValues={
    paymentType:
      settings && settings.payoutDetails && settings.payoutDetails.paymentType
        ? settings.payoutDetails.paymentType
        : 'paypal',
    country:
      settings && settings.payoutDetails && settings.payoutDetails.country
        ? settings.payoutDetails.country
        : userData.country && userData.country.value,
    email: settings && settings.payoutDetails && settings.payoutDetails.email ? settings.payoutDetails.email : '',
    bankAccountNumber:
      settings && settings.payoutDetails && settings.payoutDetails.bankAccountNumber
        ? settings.payoutDetails.bankAccountNumber.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ')
        : '',
    routingNumber:
      settings && settings.payoutDetails && settings.payoutDetails.routingNumber
        ? settings.payoutDetails.routingNumber.replace(/\W/gi, '').replace(/(.{4})/g, '$1 ')
        : '',
  }
  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      validationSchema={Yup.object({
        paymentType: Yup.string().required(t(`settings.payouts.validationErrors.paymentType`)),
        country: Yup.string().required(t(`settings.payouts.validationErrors.country`)),
        email: Yup.string().when(['paymentType'], {
          is: (paymentType) => {
            if (paymentType === 'paypal') return true
            return false
          },
          then: Yup.string()
            .email(t(`settings.payouts.validationErrors.invalidEmail`))
            .matches(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              t(`settings.payouts.validationErrors.invalidEmail`)
            )
            .required(t(`settings.payouts.validationErrors.email`)),
        }),
        bankAccountNumber: Yup.string().when(['paymentType'], {
          is: (paymentType) => {
            if (paymentType === 'wiretransfer') return true
            return false
          },
          then: Yup.string()
            .test('', t(`settings.payouts.validationErrors.bankAccountNumberLength`), function (value) {
              if (!value) return true
              if (value.length <= 30) return true
            })
            .required(t(`settings.payouts.validationErrors.bankAccountNumber`)),
        }),
        routingNumber: Yup.string()
          .test('', t(`settings.payouts.validationErrors.routingNumberLength`), function (value) {
            if (!value) return true
            if (value.length <= 30) return true
          }),
      })}
      onSubmit={(values) => {
        if(values.paymentType === 'wiretransfer'){
        values.email = ''
        values.bankAccountNumber = values.bankAccountNumber.replace(/\s/g, '')
        values.routingNumber = values.routingNumber.replace(/\s/g, '')
        dispatch(saveVendorSettings({ type: 'payouts', values, t:t }))
        return 
        }

        values.bankAccountNumber = ''
        values.routingNumber = ''
        dispatch(saveVendorSettings({ type: 'payouts', values, t:t }))
      }}
    >
      {(formik) => (
        <Form>
          <>
            <TopHeading>{t(`settings.payouts.paymentTypeQuestion`)}</TopHeading>
            <FormSection className="RadioLandscape">
              <RadioWrap className="RadioLandscapeIpad">
                <Radio
                  name="paymentType"
                  onChange={() => {
                    formik.setTouched({})
                    formik.setFieldValue('paymentType', 'paypal')
                  }}
                  value={formik.values.paymentType}
                  checked={formik.values.paymentType === 'paypal'}
                />
                <RadioLabelText>{t(`settings.payouts.payPal`)}</RadioLabelText>
              </RadioWrap>
              <RadioWrap className="RadioLandscapeIpad">
                <Radio
                  name="paymentType"
                  onChange={() => {
                    formik.setTouched({})
                    formik.setFieldValue('paymentType', 'wiretransfer')
                  }}
                  value={formik.values.paymentType}
                  checked={formik.values.paymentType === 'wiretransfer'}
                />
                <RadioLabelText>{t(`settings.payouts.wireTransfer`)}</RadioLabelText>
              </RadioWrap>
            </FormSection>
            {isPaypal(formik) && (
              <FormSection>
                <Label>{t(`settings.payouts.email`)}:</Label>
                <InputWarp>
                  <Input
                    name="email"
                    value={formik.values.email}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <span>
                    <ErrorMessage name="email" />
                  </span>
                </InputWarp>
              </FormSection>
            )}
            <FormSection>
              <Label>{t(`settings.payouts.country`)}</Label>
              <InputWarp>
                <ReactSelect
                  name="country"
                  className="CustomBoxSelect"
                  styles={customMultiSelectStyles}
                  options={countries}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  placeholder=""
                  value={countries ? countries.find((item) => item.value === formik.values.country) : ''}
                  onChange={(val) => formik.setFieldValue('country', val.value)}
                />
                <span>
                  <ErrorMessage name="country" />
                </span>
              </InputWarp>
            </FormSection>
            {!isPaypal(formik) && 
            <>
            <FormSection>
              <Label>{t(`settings.payouts.bankAccountNumber`)}:</Label>
              <InputWarp>
                <Input
                  name="bankAccountNumber"
                  value={formik.values.bankAccountNumber}
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    if (!e.target.value.match(/[a-z]/i)) {
                      let val = e.target.value
                      formik.setFieldValue('bankAccountNumber', val.replace(/\W/gi, '').replace(/(.{4})/g, '$1 '))
                    }
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && e.target.value[e.target.value.length - 1] === ' ') {
                      formik.setFieldValue('bankAccountNumber', e.target.value.slice(0, -1))
                    }
                  }}
                />
                <span>
                  <ErrorMessage name="bankAccountNumber" />
                </span>
              </InputWarp>
            </FormSection>
            <FormSection>
              <Label>{t(`settings.payouts.routingNumber`)}:</Label>
              <InputWarp>
                <Input
                  name="routingNumber"
                  value={formik.values.routingNumber}
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                      let val = e.target.value
                      formik.setFieldValue('routingNumber', val.replace(/\W/gi, '').replace(/(.{4})/g, '$1 '))
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Backspace' && e.target.value[e.target.value.length - 1] === ' ') {
                      formik.setFieldValue('routingNumber', e.target.value.slice(0, -1))
                    }
                  }}
                />
                <span>
                  <ErrorMessage name="routingNumber" />
                </span>
              </InputWarp>
            </FormSection>
            </>
            }
            <FormSection className="BtnWrap">
              <Label>&nbsp;</Label>
              <Button>
                {previouslyFilled ? t(`settings.updateChanges`) : t(`settings.saveChanges`)}
              </Button>
            </FormSection>
          </>
        </Form>
      )}
    </Formik>
  )
}

export default PayoutSection
