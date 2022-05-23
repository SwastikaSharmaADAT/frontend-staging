import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import Select from 'react-select'
import { customMultiSelectStyles } from '../../../UI/shared/styles'
import { groupedOptions, timezoneList } from '../../../../utilities/timezoneList'
import { FormSection, InputWarp } from '../../styled.js'
import Label from '../../../UI/Label'
import Input from '../../../UI/Input'
import Textarea from '../../../UI/Textarea'
import Button from '../../../UI/Button'
import { saveVendorSettings } from '../../../../modules/dashboard/dashboardSlice.js'

const groupStyles = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  color: '#222',
}
const padding = {
  option: (styles) => ({
    ...styles,
    paddingLeft: '20px',
  }),
}
const formatGroupLabel = (data) => (
  <div style={groupStyles}>
    {' '}
    <b> {data.label}</b>
  </div>
)

const VendorEmailSection = () => {
  const { t } = useTranslation(['dashboard', 'timezones'])
  const groups = groupedOptions(t)
  const timeZones = timezoneList(t)

  const dispatch = useDispatch()
  /**get settings from redux */
  const settings = useSelector((state) => state.root.dashboard.settings)
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          vendorEmail:
            settings && settings.generalSettings && settings.generalSettings.vendorEmail
              ? settings.generalSettings.vendorEmail
              : '',
          timezoneCountry:
            settings && settings.generalSettings && settings.generalSettings.timezoneCountry
              ? settings.generalSettings.timezoneCountry
              : '',
          shippingPolicy:
            settings && settings.generalSettings && settings.generalSettings.shippingPolicy
              ? settings.generalSettings.shippingPolicy
              : '',
        }}
        validationSchema={Yup.object({
          vendorEmail: Yup.string()
            .email(t(`settings.general.validationErrors.email`))
            .matches(
              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
              t(`settings.general.validationErrors.email`)
            ),
          timezoneCountry: Yup.string(),
          shippingPolicy: Yup.string().test(
            '',
            t(`settings.general.validationErrors.shippingPolicy`),
            function (value) {
              if (!value) return true
              if (value.length <= 1000) return true
            }
          ),
        })}
        onSubmit={(values) => {
          dispatch(saveVendorSettings({ type: 'general', values, t:t }))
        }}
      >
        {(formik) => (
          <Form>
            <FormSection>
              <Label>{t(`settings.general.vendorEmail`)}</Label>
              <InputWarp>
                <Input
                  value={formik.values.vendorEmail}
                  onBlur={formik.handleBlur}
                  onChange={(e) => formik.setFieldValue('vendorEmail', e.target.value)}
                  name="vendorEmail"
                />
                <span>
                  <ErrorMessage name="vendorEmail" />
                </span>
              </InputWarp>
            </FormSection>
            <FormSection>
              <Label>{t(`settings.general.timezone`)}</Label>
              <InputWarp className="TimeSelect">
                <Select
                  className="CustomBoxSelect"
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  styles={{ ...customMultiSelectStyles, ...padding }}
                  value={timeZones ? timeZones.find((item) => item.value === formik.values.timezoneCountry) : ''}
                  onChange={(obj) => formik.setFieldValue('timezoneCountry', obj.value)}
                  placeholder=""
                  options={groups}
                  formatGroupLabel={formatGroupLabel}
                />
                <ErrorMessage name="timezoneCountry" />
              </InputWarp>
            </FormSection>
            <FormSection>
              <Label>{t(`settings.general.shippingPolicy`)}</Label>
              <InputWarp>
                <Textarea
                  value={formik.values.shippingPolicy}
                  name="shippingPolicy"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></Textarea>
                <span>
                  <ErrorMessage name="shippingPolicy" />
                </span>
              </InputWarp>
            </FormSection>
            <FormSection className="BtnWrap">
              <Label>&nbsp;</Label>
              <Button type="submit">{t(`settings.saveChanges`)}</Button>
            </FormSection>
          </Form>
        )}
      </Formik>
    </>
  )
}

export default VendorEmailSection
