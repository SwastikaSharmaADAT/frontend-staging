import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useTranslation } from 'next-i18next'
import { getContent } from '../../../modules/staticContent/staticContentSlice'
import ArtNetworkSection from './ArtNetworkSection'
import ShopSection from './ShopSection'
import TeamSection from './TeamSection'
import IPSection from './IPSection'
import ImpressumSection from './ImpressumSection'
import TermsAndPrivacySection from './TermsAndPrivacySection'
import InvestorRelationsSection from './InvestorRelationsSection'
import CareerSection from './CareerSection'

const TabsContainer = styled.div`
  width: 100%;
  position: relative;
  font-family: 'Montserrat-Regular';
  .parHead .MuiButtonBase-root.MuiTab-root {
    padding: 0px 5px;
    margin-right: 0px;
  }
  .parHead .MuiTabs-flexContainer{
    flex-wrap: wrap ;
  }
  .parHead button {
    margin: 2px 5px;
  }
  
  .abtHead .MuiAppBar-colorPrimary {
    margin-top: -27px;
    @media( max-width: 450px ){
      margin-top: -85px ;
    }
    @media ( min-width: 451px ) and ( max-width: 767px ){
      margin-top: -56px !important;
    }
    @media( min-width: 991px ) and ( max-width: 1024px ) {
      margin-top: -56px !important;
    }
  }
  .dutchLang .MuiAppBar-colorPrimary{
    margin-top: -56px !important;
    @media( max-width: 450px ){
      margin-top: -114px !important ;
    }
   
  }
  .MuiTab-labelIcon .MuiTab-wrapper > *:first-child {
    margin-bottom: 0;
    order: 2;
  }
  .TabsContentDiv {
    background: #fff;
    font-size: 16px;
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
  .MuiAppBar-colorPrimary {
    box-shadow: none !important;
    background: transparent;
    margin-top: -45px;
    @media (min-width: 451px) and (max-width: 1251px)  {
      margin-top: -95.75px;
    }
    @media ( max-width: 450px ) {
      margin-top: -146px
    }
    
  }
  .MuiTabs-indicator {
    display: none !important;
    background-color: #222;
    height: 4px;
  }
  .Mui-selected {
    background: #fff !important;
    color: #000 !important;
    .MuiTab-wrapper {
      color: #000 !important;
    }
  }
  .MuiButtonBase-root.MuiTab-root {
    opacity: 1;
    min-height: 25px;
    font-size: 14px;
    color: #fff;
    min-width: auto;
    padding: 0px 12px;
    margin-right: 5px;
    background: #000;
    font-weight: bold;
    max-width: inherit;
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 12px;
    }
    @media (max-width: 767px) {
      font-size: 14px;
      max-width: inherit;
    }
  }
  .MuiButtonBase-root .MuiTab-wrapper {
    display: flex;
    flex-direction: row;
    font-family: 'Montserrat-Regular';
    color: #fff;
  }
  .MuiTab-root {
    text-transform: capitalize;
  }
  .Mui-selected {
    .Count {
      color: #222;
    }
  }
  .MuiTabs-flexContainer {
    @media (min-width: 992px) and (max-width: 1024px) {
      flex-direction: row ; 
    }
    @media (max-width: 767px) {
      flex-direction: row;
    }
  }
`

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

const SectionContent = () => {
  const { t } = useTranslation(['about','translation'])

  const classes = useStyles()
  const dispatch = useDispatch()
  const [value, setValue] = React.useState(0)

  const aboutTabsIds = [
    'ABOUT_the_art_network',
    'ABOUT_shop',
    'ABOUT_team',
    //'ABOUT_career',
    'ABOUT_ip',
    'ABOUT_impressum',
    'ABOUT_terms_&_privacy',
    'ABOUT_investor_relations',
  ]

  const tabContent = useSelector((state) => state.root.staticContent.tabContent)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  const [ classesNew, setClasses] = useState() 

  const handleChange = (event, newValue) => {
    setValue(newValue)
    //if (newValue !== 3) {
      dispatch(getContent(aboutTabsIds[newValue], t, undefined,''))
    //}
  }
  useEffect(()=>{
    if ( appLanguageCode === 'de' || appLanguageCode === 'es' || appLanguageCode==='ru' ) {
      setClasses( classes.root + ' abtHead dutchLang' )
    } else {
      setClasses( classes.root + ' abtHead' )
    }
  },[appLanguageCode])
  useEffect(() => {
    dispatch(getContent(aboutTabsIds[0], t, undefined,''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])
  return (
    <>
      <TabsContainer>
        <div className={classesNew}>
          <AppBar position="static">
            <Tabs className={classes.HeaderTabs + ' parHead'} value={value} onChange={handleChange} aria-label="">
              <Tab label={t(`labels.option1`)} {...a11yProps(0)} />
              <Tab label={t(`labels.option2`)} {...a11yProps(1)} />
              <Tab label={t(`labels.option3`)} {...a11yProps(2)} />
              {/* <Tab label={t(`labels.option4`)} {...a11yProps(3)} /> */}
              <Tab label={t(`labels.option5`)} {...a11yProps(3)} />
              <Tab label={t(`labels.option6`)} {...a11yProps(4)} />
              <Tab label={t(`labels.option7`)} {...a11yProps(5)} />
              <Tab label={t(`labels.option8`)} {...a11yProps(6)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <ArtNetworkSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <ShopSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TeamSection tabContent={tabContent} />
          </TabPanel>
          {/* <TabPanel value={value} index={3}>
            <CareerSection />
          </TabPanel> */}
          <TabPanel value={value} index={3}>
            <IPSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <ImpressumSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <TermsAndPrivacySection tabContent={tabContent} />
          </TabPanel>
          <TabPanel value={value} index={6}>
            <InvestorRelationsSection tabContent={tabContent} />
          </TabPanel>
        </div>
      </TabsContainer>
    </>
  )
}

export default SectionContent
