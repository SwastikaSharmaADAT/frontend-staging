import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useTranslation } from 'next-i18next'
import { getContent } from '../../../../modules/staticContent/staticContentSlice'
import { CommonWrapper } from '../styled.js'
import JobOpeningSection from './JobOpeningSection'
import HamburgGermanySection from './HamburgGermanySection'
import LisbonPortugalSection from './LisbonPortugalSection'

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  Count: {
    backgroundColor: 'transparent',
    fontSize: '16px',
    color: '#222',
    fontFamily: 'Montserrat-Regular',
    width: '24px',
    height: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    margin: '0 0 0 10px',
  },
  HeaderTabs: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    fontSize: '15px',
    fontFamily: 'Montserrat-Medium',
    color: '#222',
    minHeight: 'inherit',
  },
}))

const CareerSection = () => {
  const { t } = useTranslation(['about','translation'])
  const classes = useStyles()
  const dispatch = useDispatch()
  const [value, setValue] = React.useState(0)

  const careerTabsIds = ['ABOUT_career_job_openings', 'ABOUT_career_lisbon_portugal', 'ABOUT_career_hamburg_germany']

  const tabContent = useSelector((state) => state.root.staticContent.tabContent)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    if (newValue !== 1) {
      dispatch(getContent(careerTabsIds[newValue], t, undefined,''))
    }
  }

  useEffect(() => {
    dispatch(getContent(careerTabsIds[0], t ,undefined,''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])

  return (
    <>
      <CommonWrapper>
        <div className={classes.root + ' abtSubTab' }>
          <AppBar position="static">
            <Tabs className={classes.HeaderTabs} value={value} onChange={handleChange} aria-label="">
              <Tab label={t(`career.jobOpening.title`)} {...a11yProps(0)} />
              <Tab label={t(`career.lisbonPortugal.title`)} {...a11yProps(1)} />
              <Tab label={t(`career.hamburgGermany.title`)} {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel className="InnerTabContent" value={value} index={0}>
            <JobOpeningSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={1}>
            <LisbonPortugalSection />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={2}>
            <HamburgGermanySection tabContent={tabContent} />
          </TabPanel>
        </div>
      </CommonWrapper>
    </>
  )
}

export default CareerSection
