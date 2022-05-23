import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { shuffle, remove } from 'lodash'
import _ from 'lodash'
import { toggleLoading } from '../auth/authSlice'
import { notifyError, notifySuccess } from '../profile/myProfileSlice'
import { checkOtherUser } from '../../utilities/otherProfile'
import router from 'next/router'

/**
 * thunk for fetching group members
 */
export const getGroupUsers = createAsyncThunk('groups/getGroupUsers', async (params) => {
  const { info, t } = params
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}group-users`,
      info,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      return response.data
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

/**
 * thunk for fetching suggestions
 */
export const getInviteUserList = createAsyncThunk('groups/getInviteUserList', async (params) => {
  const { info, t } = params
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}invite-users-list`,
      info,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      return {data:response.data,reqData:info}
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

/**
 * thunk for removing user from group
 */
export const removeFromGroup = createAsyncThunk('groups/removeFromGroup', async (info) => {
  const { t } = info
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}remove-from-group`,
      info,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const resObject = { ...response, info: info }
      notifySuccess(info.t(`successResponses:groups.userRemoved`))
      return resObject
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

/**
 * thunk for assigning as moderator
 */
export const addAsModerator = createAsyncThunk('groups/addAsModerator', async (info) => {
  const { t } = info
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}add-as-moderator`,
      info,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(t(`successResponses:groups.assignAsModerator`))
      const resObject = { ...response, info: info }
      return resObject
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

/**
 * thunk for inviting a connection
 */
export const inviteConnection = createAsyncThunk('groups/inviteConnection', async (info) => {
  const { t } = info
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}invite-connection`,
      info,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(t(`successResponses:groups.inviteSent`))
      const resObject = { ...response, info: info }
      return resObject
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

const initialState = {
  userGroups: [],
  userGroupsMetaData: {},
  allGroups: [],
  allGroupsMetaData: {},
  groupTags: [],
  groupCategories: [],
  validationErrors: null,
  groupDetail: {},
  currentPageGroupMembers: [],
  inviteUserList: [],
  groupFeeds: [],
  groupFeedsCount: undefined,
  groupInfo: {},
  groupFeedsLoader: true,
  loggedInUserType: 'guest',
  notAuthorisedErr: false,
  createPostResponse: false,
  groupJoinRequests: [],
  inviteUsersListLoading: false,
  membersMetadata:0,
  membersLoader:true

}

export const groupsSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    setMembersLoader: (state, action) => {
      state.membersLoader = action.payload
      state.inviteUsersListLoading=true
    },
    setUserGroups: (state, action) => {
      state.userGroups = action.payload
    },
    setUserGroupsMetadata: (state, action) => {
      state.userGroupsMetaData = action.payload
    },
    setAllGroups: (state, action) => {
      state.allGroups = action.payload
    },
    setAllGroupsMetadata: (state, action) => {
      state.allGroupsMetaData = action.payload
    },
    setGroupTags: (state, action) => {
      state.groupTags = action.payload
    },
    setGroupCategories: (state, action) => {
      state.groupCategories = action.payload
    },
    clearUserGroups: (state) => {
      state.userGroups = []
    },
    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload
    },
    clearValidationErrors: (state) => {
      state.validationErrors = null
    },
    setGroupDetail: (state, action) => {
      state.groupDetail = action.payload
    },
    setGroupFeeds: (state, action) => {
      state.groupFeeds = action.payload
      state.groupFeedsLoader = false
    },
    concatGroupFeeds: (state, action) => {
      state.groupFeeds = state.groupFeeds.concat(action.payload)
      state.groupFeedsLoader = false
    },
    setGroupFeedsCount: (state, action) => {
      state.groupFeedsCount = action.payload
    },
    setGroupInfo: (state, action) => {
      state.groupInfo = action.payload
    },
    setLoggedInUserType: (state, action) => {
      state.loggedInUserType = action.payload
    },
    setNotAuthorisedErr: (state, action) => {
      state.notAuthorisedErr = action.payload
    },
    setCreatePostResponse: (state, action) => {
      state.createPostResponse = action.payload
    },
    setGroupJoinRequests: (state, action) => {
      state.groupJoinRequests = action.payload
    },
  },
  extraReducers: {
    [getGroupUsers.fulfilled]: (state, action) => {
      if (action.payload) {
        state.currentPageGroupMembers = action.payload.data && action.payload.data.groupMembers
      }
    },
    [getInviteUserList.pending]: (state) => {
      state.inviteUsersListLoading = true
    },
    [getInviteUserList.rejected]: (state) => {
      state.inviteUsersListLoading = false
    },
    [getInviteUserList.fulfilled]: (state, action) => {
      const {data,reqData} =action.payload
      if(!reqData.offset){
      if (
        data &&
        data.data &&
        data.data.connections &&
        data.data.connections.length > 0
      ) {
        let list = [...data.data.connections]
        list.map((item) => (item.inviteSent = false))
        state.inviteUserList = shuffle(list)
      }
      state.inviteUsersListLoading = false
      state.membersLoader=false
      state.membersMetadata= data.data.count
    }else{
      if (
        data &&
        data.data &&
        data.data.connections &&
        data.data.connections.length > 0
      ) {
        let list = [...data.data.connections]
        list.map((item) => (item.inviteSent = false))
        state.inviteUserList = state.inviteUserList.concat(shuffle(list))
      }
      state.inviteUsersListLoading = false
      state.membersMetadata= data.data.count
    }
    },
    [removeFromGroup.fulfilled]: (state, action) => {
      if (action.payload)
        state.currentPageGroupMembers = state.currentPageGroupMembers.filter(
          (member) => member.user._id !== action.payload.info.userId
        )
    },
    [addAsModerator.fulfilled]: (state, action) => {
      if (action.payload) {
        const member = state.currentPageGroupMembers.find((member) => member.user._id === action.payload.info.userId)
        member.isModerator = true
      }
    },
    [inviteConnection.fulfilled]: (state, action) => {
      if (action.payload) {
        const connection = state.inviteUserList.find((user) => user._id === action.payload.info.userId)
        connection.inviteSent = true
      }
    },
  },
})

export const {
  setUserGroups,
  clearUserGroups,
  setGroupCategories,
  setGroupTags,
  setValidationErrors,
  setMembersLoader,
  setGroupDetail,
  setUserGroupsMetadata,
  setAllGroups,
  setAllGroupsMetadata,
  setGroupFeeds,
  concatGroupFeeds,
  setGroupFeedsCount,
  setGroupInfo,
  setLoggedInUserType,
  setNotAuthorisedErr,
  setCreatePostResponse,
  setGroupJoinRequests,
} = groupsSlice.actions

/**
 * Get group tags and categories
 */
export const getGroupCategoriesTags = (type) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}groups/${type}`, {
      headers: {
        Authorization: token,
      },
    })
    if (response.status === 200 && response.data.success) {
      const list = response.data.data
      if (type === 'tags') {
        dispatch(setGroupTags(list))
      }
      if (type === 'categories') {
        dispatch(setGroupCategories(list))
      }
    }
  } catch (error) {
    //log errors
  } finally {
    dispatch(toggleLoading(false))
  }
}

/**
 * Get group details
 */
export const getGroupDetails = (groupId) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}groups/${groupId}/info`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const { group } = response.data.data
      dispatch(setGroupDetail(group))
    }
  } catch (error) {
    //log errors
  } finally {
    dispatch(toggleLoading(false))
  }
}

/**
 * Get group join requests list
 */
export const getJoinRequests = (groupId) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}join-requests`,
      { groupId },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const { users } = response.data.data
      dispatch(setGroupJoinRequests(users))
    }
  } catch (error) {
    //log errors
  } finally {
    dispatch(toggleLoading(false))
  }
}

/**
 * Get group feeds
 */
export const fetchGroupFeeds = (groupId, offset, sorting) => async (dispatch) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}group-feeds`,
      { groupId, offset, sorting },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      dispatch(setNotAuthorisedErr(false))
      const responseData = response.data.data
      if (offset === 0) dispatch(setGroupFeeds(responseData.groupFeeds))
      else dispatch(concatGroupFeeds(responseData.groupFeeds))

      dispatch(setGroupFeedsCount(responseData.groupFeedsCount))
      dispatch(setGroupInfo(responseData.group))
      dispatch(setLoggedInUserType(responseData.loggedInUserType))
    }
  } catch (error) {
    const { status, data: errorData } = error.response
    if (status === 400 && errorData.messageCode === 'notAuthorizedForGroup') {
      dispatch(setNotAuthorisedErr(true))
      dispatch(setGroupFeeds([]))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Add a group post
 * @param {object} info Object containing description, group id and image id of post to be created
 * @param {object} postImgObj Object containing image info
 */
export const addGroupPost = (info, postImgObj, t) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    dispatch(setCreatePostResponse(false))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}add-group-post`,
      info,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const responseData = response.data.data

      const authUserInfo = oldState.root.myProfile.authUserDetails
      const userInfo = localStorage.getItem('user_info')
      const parsedUserInfo = userInfo && JSON.parse(userInfo)

      const groupFeeds = [...oldState.root.groups.groupFeeds]
      const groupFeedsCount = oldState.root.groups.groupFeedsCount
      const loggedInUserType = oldState.root.groups.loggedInUserType
      const groupInfo = oldState.root.groups.groupInfo

      const postAction = responseData.postAction
      if (postAction === 'moderated') {
        notifySuccess(t(`successResponses:groups.postSentForApproval`), true)
      } else if (postAction === 'added') {
        const postObj = {
          comments: [],
          likes: [],
          dateCreated: responseData.dateCreated,
          dateUpdated: responseData.dateCreated,
          isModerated: false,
          isRejected: false,
          content: info.description,
          groupId: info.groupId,
          _id: responseData._id,
          picUrl: postImgObj,
          userId: {
            firstName: parsedUserInfo.personalFirstName,
            lastName: parsedUserInfo.personalLastName,
            profilePicUrl: authUserInfo && authUserInfo.profilePicUrl,
            username: parsedUserInfo.personalUsername,
            _id: parsedUserInfo.personalUuid,
            dateUpdated: authUserInfo && authUserInfo.dateUpdated,
          },
        }
        let newGroupFeeds = []
        if (
          (loggedInUserType === 'admin' || loggedInUserType === 'moderator') &&
          groupInfo.postModeration === 'publishedUponReview'
        ) {
          let lastModeratedPostIndex = -1
          for (let item = 0; item < groupFeeds.length; item++) {
            if (groupFeeds[item].isModerated === true) {
              lastModeratedPostIndex = item
            } else {
              break
            }
          }
          newGroupFeeds = [
            ...groupFeeds.slice(0, lastModeratedPostIndex + 1),
            postObj,
            ...groupFeeds.slice(lastModeratedPostIndex + 1),
          ]
        } else if (groupInfo.postModeration === 'autoPublished') {
          newGroupFeeds = [postObj, ...groupFeeds]
        }
        dispatch(setGroupFeeds(newGroupFeeds))
        dispatch(setGroupFeedsCount(groupFeedsCount + 1))
        notifySuccess(t(`successResponses:groups.postPublished`))
      }
      dispatch(setCreatePostResponse(true))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`auth.serverResponses.errors.${errorData.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Accept/Reject a group feed post
 * @param {string} groupId
 * @param {string} activityId
 * @param {string} type (accept/reject)
 */
export const groupPostAction = (groupId, activityId, type, t) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}group-post-action`,
      { groupId, activityId, type },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const responseData = response.data.data

      const groupFeeds = _.cloneDeep(oldState.root.groups.groupFeeds)
      const groupFeedsCount = oldState.root.groups.groupFeedsCount

      remove(groupFeeds, (o) => o._id === activityId)
      let newGroupFeeds = []

      if (type === 'accept') {
        const updatedPost = responseData.updateGroupPost
        updatedPost.isModerated = false

        let lastModeratedPostIndex = 0
        for (let item = 0; item < groupFeeds.length; item++) {
          if (groupFeeds[item].isModerated === true) {
            lastModeratedPostIndex = item
          } else {
            break
          }
        }
        newGroupFeeds = [
          ...groupFeeds.slice(0, lastModeratedPostIndex + 1),
          updatedPost,
          ...groupFeeds.slice(lastModeratedPostIndex + 1),
        ]
      } else if (type === 'reject') {
        newGroupFeeds = [...groupFeeds]
        dispatch(setGroupFeedsCount(groupFeedsCount - 1))
      }
      dispatch(setGroupFeeds(newGroupFeeds))
      notifySuccess(
        t(type === 'accept' ? `successResponses:groups.groupPostAccepted` : `successResponses:groups.groupPostRejected`)
      )
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Join request actions
 */
export const joinRequestAction = (groupId, userId, type, t) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}join-request-action`,
      { groupId, userId, type },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      dispatch(getJoinRequests(groupId))
      if (type === 'accept') {
        dispatch(getGroupUsers({ info: { groupId }, t }))
      }
      notifySuccess(
        t(
          type === 'accept'
            ? `successResponses:groups.joinRequestAccepted`
            : `successResponses:groups.joinRequestRejected`
        )
      )
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`translation:auth.serverResponses.errors.${errorData.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Edit group action
 * @param {*} inputs
 * @returns
 */
export const editGroup = (groupId, inputs, history, t) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}groups/${groupId}`,
      inputs,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(t(`groups.updated`))
      router.push('/groups?ownGroups=true')
    }
  } catch (error) {
    const { status, data } = error.response || {}
    if (status === 400 || status === 500) {
      notifyError(t(`errors.internalServerError`))
    }
    if (status === 422) {
      dispatch(setValidationErrors(data))
      notifyError(t(`errors.invalidEntity`))
    }
  } finally {
    dispatch(toggleLoading(false))
  }
}

/**
 * Create group action
 * @param {*} inputs
 * @returns
 */
export const createGroup = (inputs, history, t) => async (dispatch) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}groups`,
      inputs,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(t(`groups.created`))
      router.push('/groups')
    }
  } catch (err) {
    const { status, data } = err.response || {}
    if (status === 400 || status === 500) {
      notifyError(t(`errors.internalServerError`))
    }
    if (status === 422) {
      dispatch(setValidationErrors(data))
      notifyError(t(`errors.invalidEntity`))
    }
  } finally {
    dispatch(toggleLoading(false))
  }
}
/**
 * Leave a group
 * @param {string} groupId
 * @param {string} type allGroups/singleGroup indicating from where api was called
 * @param {object} history For redirection
 * @returns
 */
export const leaveGroup = (groupId, type, t) => async (dispatch, getState) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.delete(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}groups/${groupId}/leave`,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      if (type === 'allGroups') {
        // remove from my group
        const userGroups = _.cloneDeep(getState().root.groups.userGroups)
        remove(userGroups, (o) => o._id === groupId)
        const userGroupsMetaData = _.cloneDeep(getState().root.groups.userGroupsMetaData)
        dispatch(setUserGroups([...userGroups]))
        dispatch(
          setUserGroupsMetadata({
            total: userGroupsMetaData && userGroupsMetaData.total ? userGroupsMetaData.total - 1 : 0,
            page: userGroupsMetaData && userGroupsMetaData.page ? userGroupsMetaData.page : 1,
          })
        )
        // remove membership from group
        const allGroups = _.cloneDeep(getState().root.groups.allGroups)
        let groupPrivacy = ''
        allGroups.forEach((group) => {
          if (group._id === groupId) {
            group.groupMembers = null
            group.membersCount = group.membersCount - 1
          }
          groupPrivacy = group.privacy
        })
        let newAllGroups = allGroups
        if (groupPrivacy === 'hidden') {
          newAllGroups = allGroups.filter((grp) => grp._id !== groupId)
          const allGroupsMetaData = _.cloneDeep(getState().root.groups.allGroupsMetaData)
          dispatch(
            setAllGroupsMetadata({
              total: allGroupsMetaData && allGroupsMetaData.total ? allGroupsMetaData.total - 1 : 0,
              page: allGroupsMetaData && allGroupsMetaData.page ? allGroupsMetaData.page : 1,
            })
          )
        }

        dispatch(setAllGroups(newAllGroups))
      } else if (type === 'singleGroup') {
        router.push('/groups')
      }
      notifySuccess(t(`translation:groups.left`))
    }
  } catch (error) {
    const { data } = error.response || {}
    const { messageCode = 'internalServerError' } = data || {}
    notifyError(t(`translation:errors.${messageCode}`))
  } finally {
    dispatch(toggleLoading(false))
  }
}
/**
 * Group join request
 * @param {string} groupId
 * @param {string} type allGroups/singleGroup indicating from where api was called
 * @returns
 */
export const joinGroup = (groupId, type, t) => async (dispatch, getState) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}groups/${groupId}/join`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      if (type === 'allGroups') {
        const allGroups = _.cloneDeep(getState().root.groups.allGroups)
        // add invitation
        if (response.data.data && response.data.data.joinRequest) {
          allGroups.forEach((group) => {
            if (group._id === groupId) {
              group.invitedMembers = response.data.data.joinRequest
            }
          })
          dispatch(setAllGroups(allGroups))
        }
        // add into groups if user joined public group
        if (response.data.data && response.data.data.memberInfo) {
          let newUsersGroup = null
          allGroups.forEach((group) => {
            if (group._id === groupId) {
              group.groupMembers = response.data.data.memberInfo
              group.membersCount = group.membersCount + 1
              newUsersGroup = _.cloneDeep(group)
            }
          })
          if (newUsersGroup) {
            const userGroups = _.cloneDeep(getState().root.groups.userGroups)
            const userGroupsMetaData = _.cloneDeep(getState().root.groups.userGroupsMetaData)
            dispatch(setUserGroups([...userGroups, newUsersGroup]))
            dispatch(
              setUserGroupsMetadata({
                total: userGroupsMetaData && userGroupsMetaData.total ? userGroupsMetaData.total + 1 : 1,
                page: userGroupsMetaData && userGroupsMetaData.page ? userGroupsMetaData.page : 1,
              })
            )
          }
          dispatch(setAllGroups(allGroups))
        }
      } else if (type === 'singleGroup') {
        dispatch(getGroupUsers({ groupId }))
        dispatch(setLoggedInUserType('member'))
      }
      notifySuccess(t(`translation:groups.${response.data.messageCode}`))
    }
  } catch (error) {
    const { data } = error.response || {}
    const { messageCode = 'internalServerError' } = data || {}
    notifyError(t(`translation:errors.${messageCode}`))
  } finally {
    dispatch(toggleLoading(false))
  }
}
/**
 * Cancel Group join request
 * @param {string} groupId
 * @returns
 */
export const cancelJoinGroupRequest = (groupId, t) => async (dispatch, getState) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.put(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}groups/${groupId}/join-request/cancel`,
      {},
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      // remove invitation from group
      const allGroups = _.cloneDeep(getState().root.groups.allGroups)
      allGroups.forEach((group) => {
        if (group._id === groupId) {
          group.invitedMembers = null
        }
      })
      dispatch(setAllGroups(allGroups))
      notifySuccess(t(`groups.joinRequestCancelled`))
    }
  } catch (error) {
    const { data } = error.response || {}
    const { messageCode = 'internalServerError' } = data || {}
    notifyError(t(`errors.${messageCode}`))
  } finally {
    dispatch(toggleLoading(false))
  }
}

/**
 * Group accept/reject join invitation
 * @param {string} groupId
 * @param {string} invitedBy
 * @param {boolean} accept
 * @param {boolean} isMyGroup request triggered from which tab
 * @returns
 */
export const acceptRejectToGroupInvitation =
  (groupId, invitedBy, accept, isMyGroup, t) => async (dispatch, getState) => {
    try {
      dispatch(toggleLoading(true))
      const token = localStorage.getItem('auth_token')
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}groups/${groupId}/join-invitation/accept-reject`,
        { invitedBy, accept },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      if (response.status === 200 && response.data.success) {
        const allGroups = _.cloneDeep(getState().root.groups.allGroups)
        // remove invitation
        let newGroup = null
        let groupPrivacy = ''
        allGroups.forEach((group) => {
          if (group._id === groupId) {
            if (response.data.data && response.data.data.memberInfo) {
              group.groupMembers = response.data.data.memberInfo
              group.membersCount = group.membersCount + 1
            }
            newGroup = _.cloneDeep(group)
            groupPrivacy = group.privacy
            group.invitedMembers = null
          }
        })
        let newAllGroups = allGroups
        if (!accept && groupPrivacy === 'hidden') {
          newAllGroups = allGroups.filter((grp) => grp._id !== groupId)
          const allGroupsMetaData = _.cloneDeep(getState().root.groups.allGroupsMetaData)
          dispatch(
            setAllGroupsMetadata({
              total: allGroupsMetaData && allGroupsMetaData.total ? allGroupsMetaData.total - 1 : 0,
              page: allGroupsMetaData && allGroupsMetaData.page ? allGroupsMetaData.page : 1,
            })
          )
        }
        dispatch(setAllGroups(newAllGroups))
        // remove invitation from group
        if (newGroup && accept) {
          const userGroups = _.cloneDeep(getState().root.groups.userGroups)
          const userGroupsMetaData = _.cloneDeep(getState().root.groups.userGroupsMetaData)
          userGroups.forEach((group) => {
            if (group._id === groupId) {
              if (response.data.data && response.data.data.memberInfo) {
                group.groupMembers = response.data.data.memberInfo
                group.membersCount = group.membersCount + 1
              }
              group.invitedMembers = null
            }
          })
          if (!isMyGroup) {
            userGroups.push(newGroup)
          }
          dispatch(setUserGroups(userGroups))
          dispatch(setUserGroupsMetadata({ total: userGroupsMetaData.total + 1, page: userGroupsMetaData.page }))
        }

        notifySuccess(
          accept ? t(`successResponses:groups.groupInviteAccept`) : t(`successResponses:groups.groupInviteReject`)
        )
      }
    } catch (error) {
      const { data } = error.response || {}
      const { messageCode = 'internalServerError' } = data || {}
      notifyError(t(`errors.${messageCode}`))
    } finally {
      dispatch(toggleLoading(false))
    }
  }

/**
 * Get groups
 * @param {*} groupsData
 * @returns
 */
export const getGroups = (groupsParamObj, groupType, t) => async (dispatch, getState) => {
  try {
    dispatch(toggleLoading(true))
    const state = getState()
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}groups`, {
      params: groupsParamObj,
      headers: {
        Authorization: token,
      },
    })
    if (response.status === 200 && response.data.success) {
      if (response.data.data && response.data.data[0]) {
        const { metadata, groups } = response.data.data[0]
        if (groupType === 'own') {
          if (metadata[0] && metadata[0].page && metadata[0].page > 1) {
            dispatch(setUserGroups([...state.root.groups.userGroups, ...groups]))
          } else {
            dispatch(setUserGroups(groups))
          }

          dispatch(setUserGroupsMetadata(metadata[0] || {}))
        } else {
          if (metadata[0] && metadata[0].page && metadata[0].page > 1) {
            dispatch(setAllGroups([...state.root.groups.allGroups, ...groups]))
          } else {
            dispatch(setAllGroups(groups))
          }
          dispatch(setAllGroupsMetadata(metadata[0] || {}))
        }
      }
    }
  } catch (error) {
    const { status, data } = error.response || {}
    if (status === 400 || status === 500) {
      notifyError(t(`translation:errors.internalServerError`))
    }
    if (status === 422) {
      dispatch(setValidationErrors(data))
      notifyError(t(`translation:errors.invalidEntity`))
    }
  } finally {
    dispatch(toggleLoading(false))
  }
}

/**
 * Like/Unlike a group activity
 * @param {string} type Type of request (like/unlike)
 * @param {string} activityId Id of activity to be liked/unliked
 * @param {string} username Username of user who liked/unliked activity
 */
export const likeAGroupActivity = (type, activityId, username) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}like-group-activity/`,
      { type, activityId },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const userData = { ...oldState.root.myProfile.userData }
      const groupFeeds = [...oldState.root.groups.groupFeeds]

      const authUserInfo = oldState.root.myProfile.authUserDetails
      const userInfo = localStorage.getItem('user_info')
      const parsedUserInfo = userInfo && JSON.parse(userInfo)

      const activityObj = groupFeeds.find((o) => o._id === activityId)

      if (activityObj) {
        let likesArr = []
        if (type === 'like') {
          let userObj = {}
          if (!checkOtherUser(userData.username)) {
            userObj = {
              firstName: userData.firstName,
              lastName: userData.lastName,
              profilePicUrl: userData.profilePicUrl,
              username: userData.username,
              _id: userData.uuid,
              dateUpdated: userData.dateUpdated,
            }
          } else {
            userObj = {
              firstName: parsedUserInfo.personalFirstName,
              lastName: parsedUserInfo.personalLastName,
              profilePicUrl: authUserInfo.profilePicUrl,
              username: parsedUserInfo.personalUsername,
              _id: parsedUserInfo.personalUuid,
              dateUpdated: authUserInfo.dateUpdated,
            }
          }
          likesArr = [...activityObj.likes, userObj]
        } else if (type === 'unlike') {
          likesArr = [...activityObj.likes]
          const userObj = likesArr.find((o) => o.username === username)
          if (userObj) {
            const objIndex = likesArr.indexOf(userObj)
            if (objIndex !== -1) {
              likesArr.splice(objIndex, 1)
            }
          }
        }
        const updatedgroupFeeds = groupFeeds.map((o) => {
          const cloned = Object.assign({}, o)
          if (cloned._id === activityId) {
            cloned.likes = likesArr
          }
          return cloned
        })
        dispatch(setGroupFeeds(updatedgroupFeeds))
      }
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}

/**
 * Comment on group activity
 * @param {string} type Type of comment (comment/subcomment)
 * @param {string} activityId Id of activity on which comment is to be added
 * @param {string} comment Text added by user
 * @param {string} commentId Id of parent comment if type is subcomment
 */
export const commentOnGroupActivity = (type, activityId, comment, commentId, t) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const obj = { activityId, comment }
    if (type === 'subcomment') {
      obj.commentId = commentId
    }
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}comment-on-group-activity/`,
      obj,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const userData = { ...oldState.root.myProfile.userData }
      const groupFeeds = [...oldState.root.groups.groupFeeds]

      const authUserInfo = oldState.root.myProfile.authUserDetails
      const userInfo = localStorage.getItem('user_info')
      const parsedUserInfo = userInfo && JSON.parse(userInfo)

      const activityObj = groupFeeds.find((o) => o._id === activityId)

      if (activityObj) {
        let commentsArr = []
        let userObj = {}
        if (!checkOtherUser(userData.username)) {
          userObj = {
            firstName: userData.firstName,
            lastName: userData.lastName,
            profilePicUrl: userData.profilePicUrl,
            username: userData.username,
            _id: userData.uuid,
            dateUpdated: userData.dateUpdated,
          }
        } else {
          userObj = {
            firstName: parsedUserInfo.personalFirstName,
            lastName: parsedUserInfo.personalLastName,
            profilePicUrl: authUserInfo.profilePicUrl,
            username: parsedUserInfo.personalUsername,
            _id: parsedUserInfo.personalUuid,
            dateUpdated: authUserInfo.dateUpdated,
          }
        }
        const commentObj = {
          body: comment,
          parentComment: type === 'subcomment' ? commentId : null,
          userId: userObj,
          likes: [],
          _id: response.data.data.updatedCommentId,
        }
        commentsArr = [...activityObj.comments, commentObj]

        const updatedGroupFeeds = groupFeeds.map((o) => {
          const cloned = Object.assign({}, o)
          if (cloned._id === activityId) {
            cloned.comments = commentsArr
          }
          return cloned
        })
        dispatch(setGroupFeeds(updatedGroupFeeds))
      }
      notifySuccess(t(`successResponses:groups.commentAddSuccess`))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`auth.serverResponses.errors.${errorData.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Like/Unlike a comment
 * @param {string} type Type of request (like/unlike)
 * @param {string} activityId Id of activity whose comment is to be liked/unliked
 * @param {string} commentId Id of comment which is to be liked/unliked
 * @param {string} username Username of user who liked/unliked comment
 */
export const likeGroupComment = (type, activityId, commentId, username) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}like-a-group-comment`,
      { type, activityId, commentId },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const userData = { ...oldState.root.myProfile.userData }
      const groupFeeds = [...oldState.root.groups.groupFeeds]

      const authUserInfo = oldState.root.myProfile.authUserDetails
      const userInfo = localStorage.getItem('user_info')
      const parsedUserInfo = userInfo && JSON.parse(userInfo)

      const activityObj = groupFeeds.find((o) => o._id === activityId)

      if (activityObj) {
        const commentObj = activityObj.comments.find((o) => o._id === commentId)
        if (commentObj) {
          let likesArr = []
          if (type === 'like') {
            let userObj = {}
            if (!checkOtherUser(userData.username)) {
              userObj = {
                firstName: userData.firstName,
                lastName: userData.lastName,
                profilePicUrl: userData.profilePicUrl,
                username: userData.username,
                _id: userData.uuid,
                dateUpdated: userData.dateUpdated,
              }
            } else {
              userObj = {
                firstName: parsedUserInfo.personalFirstName,
                lastName: parsedUserInfo.personalLastName,
                profilePicUrl: authUserInfo.profilePicUrl,
                username: parsedUserInfo.personalUsername,
                _id: parsedUserInfo.personalUuid,
                dateUpdated: authUserInfo.dateUpdated,
              }
            }
            likesArr = [...commentObj.likes, userObj]
          } else if (type === 'unlike') {
            likesArr = [...commentObj.likes]
            const userObj = likesArr.find((o) => o.username === username)
            if (userObj) {
              const objIndex = likesArr.indexOf(userObj)
              if (objIndex !== -1) {
                likesArr.splice(objIndex, 1)
              }
            }
          }

          const updatedCommentsArr = activityObj.comments.map((o) => {
            const cloned = Object.assign({}, o)
            if (cloned._id === commentId) {
              cloned.likes = likesArr
            }
            return cloned
          })

          const updatedGroupFeeds = groupFeeds.map((o) => {
            const cloned = Object.assign({}, o)
            if (cloned._id === activityId) {
              cloned.comments = updatedCommentsArr
            }
            return cloned
          })
          dispatch(setGroupFeeds(updatedGroupFeeds))
        }
      }

      dispatch(toggleLoading(false))
    }
  } catch (err) {
    dispatch(toggleLoading(false))
  }
}
/**
 *
 * @param {form data} imageData
 * @param {bool} remove
 * @method to upload group display image
 */
export const uploadGroupPhoto = (imageData, remove, t) => async (dispatch, getState) => {
  try {
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT + 'save-group-profile-picture',
      imageData,
      {
        /**If it is a remove request don't send form-data */
        headers: {
          Authorization: token,
          'Content-Type': !remove ? 'multipart/form-data' : undefined,
        },
      }
    )
    /** on success mutate state */
    if (response.status === 200 && response.data.success) {
      const groupInfoState = getState().root.groups.groupInfo
      const newObj = {
        ...groupInfoState,
        profilePicUrl: response.data.data.imageUrl,
        dateUpdated: response.data.data.dateUpdated,
      }
      dispatch(setGroupInfo(newObj))
      if (remove) notifySuccess(t(`successResponses:groups.groupPhotoRemove`))
      else notifySuccess(t(`successResponses:groups.groupPhotoUpload`))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const { status, data } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`auth.serverResponses.errors.${data.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

/**
 * Delete a comment
 * @param {string} activityId Id of activity whose comment is to be deleted
 * @param {string} activityType Type of activity whose comment is to be deleted
 * @param {string} commentId Id of comment which is to be deleted
 * @param {boolean} articleViewPage Whether api called from articleViewPage or not
 */
export const deleteGroupComment = (activityId, commentId, groupId, t) => async (dispatch, getState) => {
  try {
    const oldState = getState()
    dispatch(toggleLoading(true))
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_GROUPS_SERVICE_API_ENDPOINT}delete-group-comment/`,
      { activityId, commentId, groupId },
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      const groupFeeds = [...oldState.root.groups.groupFeeds]

      let activityObj = {}
      activityObj = groupFeeds.find((o) => o._id === activityId)

      if (activityObj) {
        const commentObj = activityObj.comments.find((o) => o._id === commentId)
        if (commentObj) {
          const objIndex = activityObj.comments.indexOf(commentObj)
          const commentsArr = [...activityObj.comments]
          if (objIndex !== -1) {
            commentsArr.splice(objIndex, 1)
          }

          const updatedGroupFeeds = groupFeeds.map((o) => {
            const cloned = Object.assign({}, o)
            if (cloned._id === activityId) {
              cloned.comments = commentsArr
            }
            return cloned
          })
          dispatch(setGroupFeeds(updatedGroupFeeds))
        }
      }
      notifySuccess(t(`successResponses:groups.commentDeleted`))
      dispatch(toggleLoading(false))
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(t(`auth.serverResponses.errors.${errorData.messageCode}`))
    }
    dispatch(toggleLoading(false))
  }
}

export default groupsSlice.reducer
