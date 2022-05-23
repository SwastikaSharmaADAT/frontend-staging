import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { isLoginToken } from '../../../utilities/authUtils'
import GroupContent from '../GroupContent'
import {
  getGroupCategoriesTags,
  getGroups,
  leaveGroup,
  joinGroup,
  cancelJoinGroupRequest,
  acceptRejectToGroupInvitation,
} from '../../../modules/groups/groupsSlice'


const GroupBarHeadWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0px;
  background: #fff;
  display: flex;
  flex-direction: column;
  &.rtl-ar-content {
    direction: rtl;
  }
`
const TopGroupSearch = styled.div`
  display: flex;
  border-bottom: 2px solid #eeeeee;
  padding: 18px;
  @media (max-width: 767px) {
    flex-wrap: wrap;
    padding: 15px;
  }
  select {
    @media (max-width: 1399px) {
      font-size: 14px;
    }
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`
const InputSelected = styled.input`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #222222;
  padding: 0 10px;
  margin: 0 8px 0 0;
  font-family: 'Montserrat-Regular';
  height: 36px;
  border: 2px solid #eeeeee;
  outline: none;
  max-width: 210px;
  width: 100%;
  &:hover,
  &:focus {
    outline: none;
  }
  ::placeholder {
    color: #666;
  }
  @media (max-width: 1399px) {
    font-size: 14px;
  }
  @media (max-width: 767px) {
    max-width: 100%;
    margin: 0 0 10px 0;
    font-size: 14px;
  }
`
const InputSelect = styled.select`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #222222;
  padding: 0 10px;
  margin: 0 8px 0 0;
  font-family: 'Montserrat-Regular';
  height: 40px;
  border: 2px solid #eeeeee;
  outline: none;
  max-width: 210px;
  width: 100%;
  padding-right: 30px;
  background: url('/assets/group_select_arrow.png') no-repeat right 10px center;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  padding-right: 30px;
  &:hover,
  &:focus {
    outline: none;
  }
  @media (max-width: 767px) {
    max-width: 100%;
    margin: 0 0 10px 0;
    font-size: 14px;
  }
`
const PublishButton = styled.button`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #fff;
  background: #222222;
  width: auto;
  border: 0;
  padding: 4px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #fff;
    background: #222;
  }
  @media (max-width: 767px) {
    margin-right: 8px;
    font-size: 14px;
    padding: 4px 10px;
  }
  :disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`
const ClearButton = styled.button`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #222;
  background: #eee;
  width: auto;
  border: 0;
  padding: 4px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 8px;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #fff;
    background: #222;
  }
  @media (max-width: 767px) {
    margin-left: 0px;
    font-size: 14px;
    padding: 4px 10px;
  }
`
const TabsContainer = styled.div`
  width: 100%;
`

const GroupContainer = () => {
  const { t } = useTranslation(['groups', 'successResponses','translation'])

  const dispatch = useDispatch()
  const router = useRouter()
  const [value, setValue] = React.useState('')
  const [catValue, setCategoriesValue] = React.useState(0)
  const [tagsValue, setTagsValue] = React.useState(0)
  const groupsTagsList = useSelector((state) => state.root.groups.groupTags)
  const groupsCategoryList = useSelector((state) => state.root.groups.groupCategories)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  // Redirect to homepage if user is not logged in
  useEffect(() => {
    if (!isLoginToken()) {
      router.push('/')
    }
  }, [router])

  useEffect(() => {
    if (isLoginToken()) {
      dispatch(getGroupCategoriesTags('tags'))
      dispatch(getGroupCategoriesTags('categories'))
    }
  }, [dispatch])

  // handle leave group action
  const leaveGroupHandler = (groupId) => {
    dispatch(leaveGroup(groupId, 'allGroups', t))
  }
  // handle join group action
  const joinGroupHandler = (groupId) => {
    dispatch(joinGroup(groupId, 'allGroups', t))
  }
  // handle cancel join group request
  const cancelJoinGroupRequestHandler = (groupId) => {
    dispatch(cancelJoinGroupRequest(groupId, t))
  }
  // handle accept/reject join group invitation
  const responseToInvitationHandler = (groupId, invitedBy, accept, myGroupsTab = false) => {
    dispatch(acceptRejectToGroupInvitation(groupId, invitedBy, accept, myGroupsTab, t))
  }

  const handleGroupSearch = () => {
    const reqObj = {}
    reqObj.page = 1
    if (value) {
      reqObj.keyword = value
    }
    if (tagsValue && Number(tagsValue) !== 0) {
      reqObj.tag = tagsValue
    }
    if (catValue && Number(catValue) !== 0) {
      reqObj.category = catValue
    }
    dispatch(getGroups({ ...reqObj, ownGroups: true }, 'own',t))
    dispatch(getGroups(reqObj, 'all',t))
  }
  const handleClearSearch = () => {
    setTagsValue(0)
    setCategoriesValue(0)
    setValue('')
    dispatch(getGroups({ page: 1, ownGroups: true }, 'own',t))
    dispatch(getGroups({ page: 1 }, 'all',t))
  }

  return (
    <>
      <GroupBarHeadWrapper className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}> 
        <TopGroupSearch className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
          <InputSelected
            onChange={(e) => setValue(e.target.value)}
            placeholder={t(`placeholderSearchGroups`)}
            value={value}
          ></InputSelected>
          <InputSelect
            onChange={(e) => {
              setCategoriesValue(e.target.value)
            }}
            value={catValue}
          >
            <option value={0}>{t(`allCategories`)}</option>
            {groupsCategoryList &&
              groupsCategoryList.length > 0 &&
              groupsCategoryList.map((groupCat, index) => (
                <option key={index} value={groupCat._id}>
                  {groupCat.title}
                </option>
              ))}
            {groupsCategoryList && groupsCategoryList.length === 0 && <option>{t(`noCategoriesFound`)}</option>}
          </InputSelect>
          <InputSelect
            onChange={(e) => {
              setTagsValue(e.target.value)
            }}
            value={tagsValue}
          >
            <option value={0}>{t(`allTags`)}</option>
            {groupsTagsList &&
              groupsTagsList.length > 0 &&
              groupsTagsList.map((groupTag, index) => (
                <option key={index} value={groupTag._id}>
                  {groupTag.title}
                </option>
              ))}
            {groupsCategoryList && groupsCategoryList.length === 0 && <option>{t(`noTagsFound`)}</option>}
          </InputSelect>
          <PublishButton
            onClick={handleGroupSearch}
            disabled={!value && Number(tagsValue) === 0 && Number(catValue) === 0}
          >
            {t(`search`)}
          </PublishButton>
          <ClearButton
            onClick={() => {
              handleClearSearch()
            }}
          >
            {t(`clear`)}
          </ClearButton>
        </TopGroupSearch>
        <TabsContainer>
          <GroupContent
            onLeaveGroupClick={leaveGroupHandler}
            onJoinClick={joinGroupHandler}
            onCancelJoinRequest={cancelJoinGroupRequestHandler}
            onInvitationResponse={responseToInvitationHandler}
            searchValue={value}
            tagsValue={tagsValue}
            catValue={catValue}
          />
        </TabsContainer>
      </GroupBarHeadWrapper>
    </>
  )
}

export default GroupContainer
