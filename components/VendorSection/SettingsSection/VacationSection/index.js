import React from 'react'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { FormSection, InputWarp } from '../../styled.js'
import Label from '../../../UI/Label'
import Checkbox from '../../../UI/Checkbox'
import Textarea from '../../../UI/Textarea'
import Button from '../../../UI/Button'
import { saveVendorSettings } from '../../../../modules/dashboard/dashboardSlice.js'

const VacationSection = () => {
  const { t } = useTranslation('dashboard')

  const dispatch = useDispatch()
  /**get settings from redux */
  const settings = useSelector((state) => state.root.dashboard.settings)
  return (
    <>
      <Formik
        enableReinitialize
        initialValues={{
          vacationMode:
            settings && settings.vacationSettings && settings.vacationSettings.vacationMode
              ? settings.vacationSettings.vacationMode
              : false,
          disablePurchase:
            settings && settings.vacationSettings && settings.vacationSettings.disablePurchase
              ? settings.vacationSettings.disablePurchase
              : false,
          vacationMessage:
            settings && settings.vacationSettings && settings.vacationSettings.vacationMessage
              ? settings.vacationSettings.vacationMessage
              : '',
        }}
        validationSchema={Yup.object({
          vacationMode: Yup.bool(),
          disablePurchase: Yup.bool(),
          vacationMessage: Yup.string().test(
            '',
            t(`settings.vacation.validationErrors.vacationMessage`),
            function (value) {
              if (!value) return true
              if (value.length <= 1000) return true
            }
          ),
        })}
        onSubmit={(values) => {
          dispatch(saveVendorSettings({ type: 'vacation', values, t:t }))
        }}
      >
        {(formik) => (
          <Form>
            <FormSection className="CheckboxLandscape">
              <Label>{t(`settings.vacation.vacationMode`)}</Label>
              <Checkbox
                checked={formik.values.vacationMode}
                name="vacationMode"
                onChange={() => formik.setFieldValue('vacationMode', !formik.values.vacationMode)}
                className="CheckboxPosition"
              />
            </FormSection>
            <FormSection className="CheckboxLandscape">
              <Label>{t(`settings.vacation.disablePurchase`)}</Label>
              <Checkbox
                checked={formik.values.disablePurchase}
                name="disablePurchase"
                onChange={() => formik.setFieldValue('disablePurchase', !formik.values.disablePurchase)}
                className="CheckboxPosition"
              />
            </FormSection>
            <FormSection>
              <Label>{t(`settings.vacation.vacationMessage`)}</Label>
              <InputWarp>
                <Textarea
                  value={formik.values.vacationMessage}
                  name="vacationMessage"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                ></Textarea>

                <span>
                  <ErrorMessage name="vacationMessage" />
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
export default VacationSection
