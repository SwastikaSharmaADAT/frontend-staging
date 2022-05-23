import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useTranslation } from 'next-i18next'
import { getContent } from '../../../../modules/staticContent/staticContentSlice'
import { CommonWrapper } from '../styled.js'
import GenreSubSection from '../GenreSection/GenreSubSection'

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

const MediaSection = () => {
  const { t } = useTranslation(['genre','translation'])

  const classes = useStyles()
  const dispatch = useDispatch()
  const [value, setValue] = React.useState(0)

  const mediaTabsIds = [
    'MEDIA_definition',
    'MEDIA_collage',
    'MEDIA_design',
    'MEDIA_digital',
    'MEDIA_drawing',
    'MEDIA_mixed',
    'MEDIA_multimedia',
    'MEDIA_new_media',
    'MEDIA_painting',
    'MEDIA_sculpture',
  ]

  const tabContent = useSelector((state) => state.root.staticContent.tabContent)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    dispatch(getContent(mediaTabsIds[newValue], t, undefined,''))
  }

  useEffect(() => {
    dispatch(getContent(mediaTabsIds[0], t, undefined,''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])

  return (
    <>
      <CommonWrapper>
        <div className={classes.root  + ' genSubTab'}>
          <AppBar position="static">
            <Tabs
              className={classes.HeaderTabs}
              value={value}
              onChange={handleChange}
              aria-label=""
              variant="scrollable"
            >
              <Tab label={t(`tabs.mediaSubTabs.definition`)} {...a11yProps(0)} />
              <Tab label={t(`tabs.mediaSubTabs.collage`)} {...a11yProps(1)} />
              <Tab label={t(`tabs.mediaSubTabs.design`)} {...a11yProps(2)} />
              <Tab label={t(`tabs.mediaSubTabs.digital`)} {...a11yProps(3)} />
              <Tab label={t(`tabs.mediaSubTabs.drawing`)} {...a11yProps(4)} />
              <Tab label={t(`tabs.mediaSubTabs.mixed`)} {...a11yProps(5)} />
              <Tab label={t(`tabs.mediaSubTabs.multimedia`)} {...a11yProps(6)} />
              <Tab label={t(`tabs.mediaSubTabs.newMedia`)} {...a11yProps(7)} />
              <Tab label={t(`tabs.mediaSubTabs.painting`)} {...a11yProps(8)} />
              <Tab label={t(`tabs.mediaSubTabs.sculpture`)} {...a11yProps(9)} />
            </Tabs>
          </AppBar>
          <TabPanel className="InnerTabContent" value={value} index={0}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={1}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={2}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={3}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={4}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={5}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={6}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={7}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={8}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={9}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
        </div>
      </CommonWrapper>
    </>
  )
}

export default MediaSection
