import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useTranslation } from 'next-i18next'
import { getContent } from '../../../../../modules/staticContent/staticContentSlice'
import { CommonWrapper } from '../../styled.js'
import InternshipSection from './InternshipSection'
import SocialMediaManagerDigitalMarketerSection from './SocialMediaManagerDigitalMarketerSection'
import WooCommerceExpertSection from './WooCommerceExpertSection'

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

const LisbonPortugalSection = () => {
  const { t } = useTranslation(['about','translation'])

  const classes = useStyles()
  const dispatch = useDispatch()
  const [value, setValue] = React.useState(0)

  const lisbonTabsIds = [
    'ABOUT_career_lisbon_portugal_internships',
    'ABOUT_career_lisbon_portugal_social_media_manager',
    'ABOUT_career_lisbon_portugal_woo_commerce_expert',
  ]

  const tabContent = useSelector((state) => state.root.staticContent.tabContent)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    dispatch(getContent(lisbonTabsIds[newValue], t, undefined,''))
  }

  useEffect(() => {
    dispatch(getContent(lisbonTabsIds[0], t, undefined,''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])

  return (
    <>
      <CommonWrapper>
        <div className={classes.root + ' abtSubTab' }>
          <AppBar position="static">
            <Tabs className={classes.HeaderTabs} value={value} onChange={handleChange} aria-label="">
              <Tab label={t(`career.lisbonPortugal.option1`)} {...a11yProps(0)} />
              <Tab label={t(`career.lisbonPortugal.option2`)} {...a11yProps(1)} />
              <Tab label={t(`career.lisbonPortugal.option3`)} {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <TabPanel className="InnerTabContent" value={value} index={0}>
            <InternshipSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={1}>
            <SocialMediaManagerDigitalMarketerSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={2}>
            <WooCommerceExpertSection tabContent={tabContent} />
          </TabPanel>
        </div>
      </CommonWrapper>
    </>
  )
}

export default LisbonPortugalSection
