import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useTranslation } from 'next-i18next'
import { getContent } from '../../../modules/staticContent/staticContentSlice'
import TabSection from './TabSection'

const TabsContainer = styled.div`
  width: 100%;
  position: relative;
  font-family: 'Montserrat-Regular';
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
    margin-top: -25px;
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
      overflow-x: scroll;
    }
    @media (max-width: 767px) {
      flex-direction: column;
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
  const { t } = useTranslation(['staticPages','translation'])

  const classes = useStyles()
  const dispatch = useDispatch()
  const [value, setValue] = React.useState(0)

  const whatIsArtmoTabIds = [
    'WHAT_IS_ARTMO_the_art_network',
    'WHAT_IS_ARTMO_art_enthusiast',
    'WHAT_IS_ARTMO_artist',
    'WHAT_IS_ARTMO_gallery',
    'WHAT_IS_ARTMO_university',
    'WHAT_IS_ARTMO_shop',
  ]

  const tabContent = useSelector((state) => state.root.staticContent.whatIsArtmoTabContent)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    dispatch(getContent(whatIsArtmoTabIds[newValue], t, 'whatIsArtmo',''))
  }

  useEffect(() => {
    dispatch(getContent(whatIsArtmoTabIds[0], t, 'whatIsArtmo'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])

  return (
    <>
      <TabsContainer>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs className={classes.HeaderTabs} value={value} onChange={handleChange} aria-label="">
              <Tab label={t(`whatIsArtmo.artNetwork`)} {...a11yProps(0)} />
              <Tab label={t(`whatIsArtmo.artEnthusiast`)} {...a11yProps(1)} />
              <Tab label={t(`whatIsArtmo.artist`)} {...a11yProps(2)} />
              <Tab label={t(`whatIsArtmo.gallery`)} {...a11yProps(3)} />
              <Tab label={t(`whatIsArtmo.university`)} {...a11yProps(4)} />
              <Tab label={t(`whatIsArtmo.shop`)} {...a11yProps(5)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            <TabSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TabSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <TabSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <TabSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel value={value} index={4}>
            <TabSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel value={value} index={5}>
            <TabSection tabContent={tabContent} />
          </TabPanel>
        </div>
      </TabsContainer>
    </>
  )
}

export default SectionContent
