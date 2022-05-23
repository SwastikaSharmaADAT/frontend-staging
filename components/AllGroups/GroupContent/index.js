import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { isLoginToken } from '../../../utilities/authUtils'
import { getGroups } from '../../../modules/groups/groupsSlice'
import ConfirmBox from '../../UI/ConfirmBox'
import { dateFromNow } from '../../../utilities/convertDate'
import SingleMyGroup from './SingleMyGroup'
import SingleAllGroup from './SingleAllGroup'


const TabsContainer = styled.div`
  width: 100%;
  position: relative;
  font-family: 'Montserrat-Regular';
  .GroupBorder {
    border-top: 2px solid #eee;
  }
  .MuiTabs-flexContainer {
    @media (max-width: 480px) {
      flex-direction: column;
    }
    .Mui-selected {
      background: #fff;
      @media (max-width: 480px) {
        border-bottom: 4px solid #222;
      }
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
    background: #fff;
  }
  .MuiTabs-indicator {
    /* display: none !important; */
    background-color: #222;
    height: 4px;
    @media (max-width: 480px) {
      display: none;
    }
  }
  .Mui-selected {
    background: #fff;
  }
  .MuiButtonBase-root.MuiTab-root {
    opacity: 1;
    min-height: 56px;
    font-size: 16px;
    color: #222;
    min-width: 150px;
    padding: 6px 12px;
    @media (max-width: 480px) {
      font-size: 14px;
      min-width: 100%;
    }
  }
  .MuiButtonBase-root .MuiTab-wrapper {
    display: flex;
    flex-direction: row;
    font-family: 'Montserrat-Regular';
    color: #000;
    text-transform: none;
  }
  .MuiTab-root {
    text-transform: capitalize;
  }
  .Mui-selected {
    .Count {
      color: #222;
    }
  }
`
const LoadMoreDiv = styled.div`
  position: relative;
  margin: 0;
  padding: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  background: #fff;
`

const LoadMoreBtn = styled.button`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #222;
  background: #eee;
  width: auto;
  border: 0;
  padding: 7px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  :hover,
  :focus {
    outline: 0;
    border: 0;
  }
  @media (max-width: 767px) {
    margin-left: 0px;
    font-size: 14px;
    padding: 4px 10px;
  }
`

const FilterSorting = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  display: flex;
  width: 240px;
  align-items: center;
  padding: 10px 0;
  @media (min-width: 991px) and (max-width: 1024px) {
    position: relative;
    margin: 0;
    padding: 10px 20px 0;
  }
  @media (max-width: 767px) {
    position: relative;
    margin: 0;
    padding: 10px 15px 0;
    width: auto;
    flex-direction: row;
  }
  &.rtl-ar-content {
    left: 0;
    right: inherit;
  }
`
const SpanLabel = styled.span`
  font-size: 16px;
  color: #222222;
  @media (max-width: 767px) {
    font-size: 14px;
    width: 90px;
  }
`
const InputSelect = styled.select`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #222222;
  padding: 0 0px 0 10px;
  margin: 0 8px 0 0;
  font-family: 'Montserrat-Regular';
  height: 40px;
  border: 0;
  outline: none;
  max-width: 150px;
  width: 100%;
  background: url('/assets/group_select_arrow.png') no-repeat right 10px center;
  &:hover,
  &:focus {
    outline: none;
  }
  @media (max-width: 767px) {
    max-width: 100%;
    margin: 10px 0;
    font-size: 14px;
    padding-left: 0;
  }
`
const GroupBarHeadWrapper = styled.div`
  position: relative;
  margin: 0 0 17px;
  padding: 24px 15px;
  /* background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1); */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid #eee;
  @media (max-width: 500px) {
    flex-direction: column;
    padding: 15px;
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
    backgroundColor: '#fff',
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
    backgroundColor: '#fff',
    boxShadow: 'none',
    fontSize: '15px',
    fontFamily: 'Montserrat-Medium',
    color: '#222',
  },
}))

const GroupContent = ({
  onLeaveGroupClick,
  onJoinClick,
  onInvitationResponse,
  onCancelJoinRequest,
  searchValue,
  tagsValue,
  catValue,
}) => {
  const { t } = useTranslation(['groups','translation','successResponses'])

  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const params = router.query
  const ownGroups = params.ownGroups
  const [userInfo, setUserInfo] = useState(null)
  const accountType = userInfo && JSON.parse(userInfo).accountType

  const [value, setValue] = useState(ownGroups ? 1 : 0)
  const [toBeLeftGroup, setToBeLeftGroup] = useState('')
  const userGroups = useSelector((state) => state.root.groups.userGroups)
  const userGroupsMetaData = useSelector((state) => state.root.groups.userGroupsMetaData)
  const allGroups = useSelector((state) => state.root.groups.allGroups)
  const allGroupsMetaData = useSelector((state) => state.root.groups.allGroupsMetaData)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    if (isLoginToken()) {
      dispatch(getGroups({ ownGroups: true, page: 1 }, 'own',t))
      dispatch(getGroups({ page: 1 }, 'all',t))
    }
  }, [dispatch])

  const handleChange = (event, newValue) => {
    setValue(newValue)
    if (newValue === 2) {
      router.push('/groups/create')
    }
  }
  const checkLoadMore = (type) => {
    if (type === 'own') {
      return userGroups.length < userGroupsMetaData.total ? true : false
    } else if (type === 'all') {
      return allGroups.length < allGroupsMetaData.total ? true : false
    }
  }

  const loadMoreRecords = (type) => {
    const reqObj = {}
    if (type === 'own') {
      reqObj.page = userGroupsMetaData.page + 1
    } else if (type === 'all') {
      reqObj.page = allGroupsMetaData.page + 1
    }
    if (searchValue) {
      reqObj.keyword = searchValue
    }
    if (tagsValue && Number(tagsValue) !== 0) {
      reqObj.tag = tagsValue
    }
    if (catValue && Number(catValue) !== 0) {
      reqObj.category = catValue
    }
    if (type === 'own') {
      dispatch(getGroups({ ...reqObj, ownGroups: true }, 'own',t))
    } else if (type === 'all') {
      dispatch(getGroups(reqObj, 'all',t))
    }
  }

  const redirectToGroup = (groupId) => {
    router.push(`/groups/${groupId}`)
  }

  return (
    <>
      {toBeLeftGroup && (
        <ConfirmBox
          open={toBeLeftGroup.length > 0}
          closeModal={() => setToBeLeftGroup('')}
          deleteHandler={() => {
            onLeaveGroupClick(toBeLeftGroup)
            setToBeLeftGroup('')
          }}
          confirmButtonText={t(`groupListing.confirmButtonText`)}
          heading={t(`groupListing.confirmLeaveText`)}
        />
      )}
      <TabsContainer>
        <FilterSorting className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
          <SpanLabel>{t(`groupListing.sortedBy`)}:</SpanLabel>
          <InputSelect>
            <option>{t(`groupListing.recentActivity`)}</option>
          </InputSelect>
        </FilterSorting>
        <div className={classes.root}>
          <AppBar position="static">
            <Tabs className={classes.HeaderTabs} value={value} onChange={handleChange} aria-label="">
              <Tab
                label="All Groups"
                {...a11yProps(0)}
                icon={<span className={classes.Count}>({allGroupsMetaData.total || 0})</span>}
              />
              <Tab
                label="My Groups"
                {...a11yProps(1)}
                icon={<span className={classes.Count}>({userGroupsMetaData.total || 0})</span>}
              />
              {accountType !== 'page' && <Tab label="Create a Group" {...a11yProps(2)} />}
            </Tabs>
          </AppBar>
          <TabPanel className="GroupBorder" value={value} index={0}>
            {allGroups &&
              allGroups.length > 0 &&
              allGroups.map((group, index) => (
                <SingleAllGroup
                  redirectToGroup={redirectToGroup}
                  group={group}
                  key={index}
                  setToBeLeftGroup={setToBeLeftGroup}
                  onJoinClick={onJoinClick}
                  onCancelJoinRequest={onCancelJoinRequest}
                  onInvitationResponse={onInvitationResponse}
                  dateFromNow={dateFromNow}
                />
              ))}
            {allGroups && allGroups.length === 0 && (
              <GroupBarHeadWrapper>{t(`groupListing.noGroupsFound`)}</GroupBarHeadWrapper>
            )}
            {checkLoadMore('all') && (
              <LoadMoreDiv>
                <LoadMoreBtn onClick={() => loadMoreRecords('all')}>{t(`groupListing.loadMore`)}</LoadMoreBtn>
              </LoadMoreDiv>
            )}
          </TabPanel>
          <TabPanel className="GroupBorder" value={value} index={1}>
            {userGroups &&
              userGroups.length > 0 &&
              userGroups.map((group, index) => (
                <SingleMyGroup
                  key={index}
                  redirectToGroup={redirectToGroup}
                  group={group}
                  dateFromNow={dateFromNow}
                  setToBeLeftGroup={setToBeLeftGroup}
                />
              ))}
            {userGroups && userGroups.length === 0 && (
              <GroupBarHeadWrapper>{t(`groupListing.noGroupsFound`)}</GroupBarHeadWrapper>
            )}
            {checkLoadMore('own') && (
              <LoadMoreDiv>
                <LoadMoreBtn onClick={() => loadMoreRecords('own')}>{t(`groupListing.loadMore`)}</LoadMoreBtn>
              </LoadMoreDiv>
            )}
          </TabPanel>
        </div>
      </TabsContainer>
    </>
  )
}

GroupContent.propTypes = {
  onLeaveGroupClick: PropTypes.func,
  onJoinClick: PropTypes.func,
  onCancelJoinRequest: PropTypes.func,
  onInvitationResponse: PropTypes.func,
  searchValue: PropTypes.string,
  catValue: PropTypes.any,
  tagsValue: PropTypes.any,
}

export default GroupContent
