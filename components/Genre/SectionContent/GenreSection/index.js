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
import GenreSubSection from './GenreSubSection'
import Head from 'next/head'

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

const GenreSection = () => {
  const { t } = useTranslation(['genre','translation'])
  const classes = useStyles()
  const dispatch = useDispatch()
  const [value, setValue] = React.useState(0)

  const genreTabsIds = [
    'GENRE_definiton',
    'GENRE_abstract_expressionism',
    'GENRE_abstract',
    'GENRE_calligraphy',
    'GENRE_conceptual',
    'GENRE_concrete',
    'GENRE_constructivism',
    'GENRE_cubism',
    'GENRE_documentary',
    'GENRE_expressionism',
    'GENRE_fantastic',
    'GENRE_figurative',
    'GENRE_illustration',
    'GENRE_impressionism',
    'GENRE_magical_realism',
    'GENRE_minimalism',
    'GENRE_naive_art',
    'GENRE_pop',
    'GENRE_realism',
    'GENRE_surrealism',
  ]

  const tabContent = useSelector((state) => state.root.staticContent.tabContent)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    dispatch(getContent(genreTabsIds[newValue], t, undefined,''))
  }

  useEffect(() => {
    dispatch(getContent(genreTabsIds[0], t, undefined,''))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])

  return (
    <>
      <Head>
        <title>Genres | ARTMO | The Art Network | Connecting The Art World</title>
        <meta name="description" content={"Learn about all visual art genres and art media | Find artists and collections from all different genres."} />
        <meta name="og:title" content={"Genres | ARTMO | The Art Network | Connecting The Art World"} />
        <meta name="og:description" content={"Learn about all visual art genres and art media | Find artists and collections from all different genres."} />
      </Head>
      <CommonWrapper>
        <div className={classes.root  + ' genSubTab' }>
          <AppBar position="static">
            <Tabs
              className={classes.HeaderTabs}
              value={value}
              onChange={handleChange}
              aria-label=""
            >
              <Tab label={t(`tabs.genreSubTabs.definition`)} {...a11yProps(0)} />
              <Tab label={t(`tabs.genreSubTabs.abstractExpressionism`)} {...a11yProps(1)} />
              <Tab label={t(`tabs.genreSubTabs.abstract`)} {...a11yProps(2)} />
              <Tab label={t(`tabs.genreSubTabs.calligraphy`)} {...a11yProps(3)} />
              <Tab label={t(`tabs.genreSubTabs.conceptual`)} {...a11yProps(4)} />
              <Tab label={t(`tabs.genreSubTabs.concrete`)} {...a11yProps(5)} />
              <Tab label={t(`tabs.genreSubTabs.constructivism`)} {...a11yProps(6)} />
              <Tab label={t(`tabs.genreSubTabs.cubism`)} {...a11yProps(7)} />
              <Tab label={t(`tabs.genreSubTabs.documentary`)} {...a11yProps(8)} />
              <Tab label={t(`tabs.genreSubTabs.expressionism`)} {...a11yProps(9)} />
              <Tab label={t(`tabs.genreSubTabs.fantastic`)} {...a11yProps(10)} />
              <Tab label={t(`tabs.genreSubTabs.figurative`)} {...a11yProps(11)} />
              <Tab label={t(`tabs.genreSubTabs.illustration`)} {...a11yProps(12)} />
              <Tab label={t(`tabs.genreSubTabs.impressionism`)} {...a11yProps(13)} />
              <Tab label={t(`tabs.genreSubTabs.magicalRealism`)} {...a11yProps(14)} />
              <Tab label={t(`tabs.genreSubTabs.minimalism`)} {...a11yProps(15)} />
              <Tab label={t(`tabs.genreSubTabs.naiveArt`)} {...a11yProps(16)} />
              <Tab label={t(`tabs.genreSubTabs.pop`)} {...a11yProps(17)} />
              <Tab label={t(`tabs.genreSubTabs.realism`)} {...a11yProps(18)} />
              <Tab label={t(`tabs.genreSubTabs.surrealism`)} {...a11yProps(19)} />
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
          <TabPanel className="InnerTabContent" value={value} index={10}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={11}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={12}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={13}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={14}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={15}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={16}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={17}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={18}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
          <TabPanel className="InnerTabContent" value={value} index={19}>
            <GenreSubSection tabContent={tabContent} />
          </TabPanel>
        </div>
      </CommonWrapper>
    </>
  )
}

export default GenreSection
