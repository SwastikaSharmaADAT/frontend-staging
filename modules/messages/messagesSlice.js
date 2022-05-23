import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import fileDownload from 'js-file-download'
import { cloneDeep,uniqBy } from 'lodash'
import moment from 'moment'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { notifyError, notifySuccess } from '../profile/myProfileSlice'

/**
 * Thunk to get conversation list
 */
export const getListConversations = createAsyncThunk('messages/getListConversations', async (data) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_MESSAGES_SERVICE_API_ENDPOINT}list-conversations`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      return { data: response.data, reqData: data }
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(data.t(`auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

/**
 * Thunk to receive new message
 */
export const newMessage = (payload) => async (dispatch, getState) => {
  const oldState = getState()
  const conversations = oldState.root.messages.listConversations
  const userData = oldState.root.myProfile.userData
  if (
    (conversations && conversations.length === 0) ||
    !conversations.find((convo) => convo._id === payload.conversationId)
  ) {
    dispatch(getListConversations({ offset: 0, limit: 20 }))
    dispatch(receiveNewMessage({ payload, uuid: userData.uuid }))
  } else {
    dispatch(receiveNewMessage({ payload, uuid: userData.uuid }))
    dispatch(moveToTop(payload.conversationId))
  }
}

/**
 * Thunk to get conversation messages
 */
export const getConversationDetails = createAsyncThunk('messages/conversationDetails', async (data) => {
  if (data.dummy) return
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_MESSAGES_SERVICE_API_ENDPOINT}conversation-details`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      return { data: response.data, reqData: data }
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(data.t(`auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

/**
 * Thunk to get unread conversation count
 */
export const getUnreadConversationsCount = createAsyncThunk('messages/getUnreadConversationsCount', async (t) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_REACT_APP_MESSAGES_SERVICE_API_ENDPOINT}conversation-unread-count`,
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
      notifyError(t(`auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})
/**
 * Thunk to get conversation messages
 */
export const downloadConversation = createAsyncThunk('messages/downloadConversation', async (data) => {
  const { conversationId, username } = data
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios
      .post(
        `${process.env.NEXT_PUBLIC_REACT_APP_MESSAGES_SERVICE_API_ENDPOINT}conversation-download`,
        { conversationId },
        {
          headers: {
            Authorization: token,
          },
        }
      )
      .then((response) => {
        fileDownload(response.data, `${username} ${moment(new Date()).format('MMMM D YYYY, H:MM:SS')}.csv`)
      })
    if (response.status === 200 && response.data.success) {
      return response.data
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(data.t(`auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

/**
 * Thunk to delete conversation messages
 */
export const deleteConversation = createAsyncThunk('messages/deleteConversation', async (data) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_REACT_APP_MESSAGES_SERVICE_API_ENDPOINT}remove-conversation-messages`,
      data,
      {
        headers: {
          Authorization: token,
        },
      }
    )
    if (response.status === 200 && response.data.success) {
      notifySuccess(data.t(`successResponses:messages.chatDelete`))
      return response.data
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(data.t(`auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

/**
 * Thunk to delete conversation messages
 */
export const blockUser = createAsyncThunk('messages/blockUser', async (data) => {
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(`${process.env.NEXT_PUBLIC_REACT_APP_MESSAGES_SERVICE_API_ENDPOINT}block-user`, data, {
      headers: {
        Authorization: token,
      },
    })
    if (response.status === 200 && response.data.success) {
      notifySuccess(data.t(`messages.userBlock`))
      return response.data
    }
  } catch (err) {
    const { status, data: errorData } = err.response
    if (status === 400 || status === 500) {
      notifyError(data.t(`auth.serverResponses.errors.${errorData.messageCode}`))
    }
  }
})

/**initial state for notification slice */
const initialState = {
  unreadConversationsCount: 0,
  listConversations: [],
  activeChatMessages: [],
  activeChatBox: {},
  conversationLoader: true,
  conversationMetadata: null,
  messagesLoader: true,
  messagesMetadata: 0,
  chatThreadExists: false,
  apiFetch: true,
  contactToggle: false,
  chatPopup: false,
  fetch: false,
  pageLoaded:false
}
/**Notifications slice */
export const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    clearActiveChat: (state, action) => {
      state.listConversations = []
      state.activeChatMessages = []
      state.activeChatBox = {}
      state.conversationLoader = true
      state.conversationMetadata = null
      state.messagesLoader = true
      state.messagesMetadata = 0
      state.chatThreadExists = false
      state.apiFetch = true
      state.contactToggle = false
      state.pageLoaded = false
    },
    contactsToggler: (state, action) => {
      state.contactToggle = action.payload
    },
    setMessageState: (state, action) => {
      const { key, value } = action.payload
      state[key] = value
    },
    mutateStateAfterBlock: (state, action) => {
      if (action.payload === 'block') {
        state.activeChatBox.isBlocked = true
        const blockConversation = state.listConversations.find((convo) => convo._id === state.activeChatBox._id)
        blockConversation.isBlocked = true
        return
      }
      state.activeChatBox.isBlocked = false
      const blockConversation = state.listConversations.find((convo) => convo._id === state.activeChatBox._id)
      blockConversation.isBlocked = false
    },
    instantBlockUser: (state, action) => {
      state.activeChatBox.isBlocked = true
      state.activeChatBox.blockedBy = 'receiver'
      const blockConversation = state.listConversations.find((convo) => convo._id === state.activeChatBox._id)
      blockConversation.isBlocked = true
      state.activeChatMessages.pop()
    },
    incrementMessageCount: (state, action) => {
      state.unreadConversationsCount = state.unreadConversationsCount + 1
    },
    clearConversationsUnreadCount: (state, action) => {
      state.unreadConversationsCount = 0
    },
    fetchConversations: (state, action) => {
      state.fetch = action.payload
    },
    populateChatBox: (state, action) => {
      state.activeChatBox = action.payload
    },
    moveToTop: (state, action) => {
      const conversation = state.listConversations.find((item) => item._id === action.payload)
      if (conversation) {
        state.listConversations = state.listConversations.filter((item) => item._id !== action.payload)
        state.listConversations.unshift(conversation)
      }
    },
    readChat: (state, action) => {
      const updateRead = state.listConversations.find((convo) => convo.receiverUser._id === action.payload._id)
      if (updateRead) {
        updateRead.isRead = true
        updateRead.readPendingFrom = ''
      }
    },
    populateChatFromId: (state, action) => {
      if (state.listConversations.length === 0) return
      state.activeChatBox = state.listConversations.find((convo) => convo.receiverUser._id === action.payload)
    },
    initiateNewThread: (state, action) => {
      const userInfo = localStorage.getItem('user_info')
      const personalUuid = userInfo && JSON.parse(userInfo).personalUuid
      const { profilePicUrl, firstName, lastName, username, uuid, temp } = action.payload
      state.listConversations.unshift({
        temp,
        receiverUser: action.payload,
        _id: action.payload.uuid,
        senderUser: { _id: personalUuid },
      })
      state.activeChatBox = {
        receiverUser: { profilePicUrl, firstName, lastName, username, _id: uuid },
        senderUser: { _id: personalUuid },
      }
      state.activeChatMessages = []
    },
    addNewMessage: (state, action) => {
      const userInfo = localStorage.getItem('user_info')
      const loggedInUsername = userInfo && JSON.parse(userInfo).username
      state.activeChatMessages = state.activeChatMessages.concat({
        isRead: false,
        content: action.payload.message,
        dateCreated: new Date().toString(),
        isDeleted: 0,
        _id: Math.random(),
        conversationId: state.activeChatBox._id,
        userIdSender: { username: loggedInUsername },
      })
    },
    receiveNewMessage: (state, action) => {
      const userInfo = localStorage.getItem('user_info')
      const personalUuid = userInfo && JSON.parse(userInfo).personalUuid

      const { payload } = action.payload
      /**display red dot */
      const findConvo = state.listConversations.find((convo) => convo._id === payload.conversationId)
      if (findConvo) {
        findConvo.isRead = false
        findConvo.readPendingFrom = personalUuid
      }

      /**push new message */
      if (state.activeChatBox._id === payload.conversationId) {
        state.activeChatMessages = uniqBy(
          [
            ...state.activeChatMessages,
            {
              isRead: false,
              readPendingFrom: personalUuid,
              content: payload.message,
              dateCreated: new Date().toString(),
              isDeleted: 0,
              _id: payload._id,
              conversationId: payload.conversationId,
              userIdSender: '',
            },
          ],
          '_id'
        )
      }
    },
  },
  extraReducers: {
    [getListConversations.pending]: (state, action) => {
      state.apiFetch = true
      state.pageLoaded=false
    },
    [getListConversations.rejected]: (state, action) => {
      state.apiFetch = false
      state.pageLoaded=true
    },
    [getListConversations.fulfilled]: (state, action) => {
      const newArr = [...action.payload.data.data.conversations]
      // receiver-sender logic
      const userInfo = localStorage.getItem('user_info')
      const loggedInUsername = userInfo && JSON.parse(userInfo).username
      const deletedObject={
        firstName:'Deleted',
        lastName:'User',
        username:'*deletedUser*',
        _id: '*'
      }
      if (action.payload && newArr.length > 0) {
        newArr.forEach((user) => {
          if(isEmptyObj(user.receiverUser)) {
            user.receiverUser=deletedObject
            user.deletedUser=true
          }
          if(isEmptyObj(user.senderUser)) {
            user.senderUser=deletedObject
            user.deletedUser=true
          }
          if (user.receiverUser.username === loggedInUsername) {
            let temp = user.receiverUser
            user.receiverUser = user.senderUser
            user.senderUser = temp

            temp = user.receiverBlockList
            user.receiverBlockList = user.senderBlockList
            user.senderBlockList = temp
            if (user.receiverBlockList.includes(user.senderUser._id)) user.blockedBy = 'receiver'
            else if (user.senderBlockList.includes(user.receiverUser._id)) user.blockedBy = 'sender'
            else user.blockedBy = ''
            user.isBlocked =
              user.receiverBlockList.concat(user.senderBlockList).includes(user.senderUser._id) ||
              user.receiverBlockList.concat(user.senderBlockList).includes(user.receiverUser._id)
              user.adminBlock=user.receiverUser.isBlocked
          } else {
            if (user.receiverBlockList.includes(user.senderUser._id)) user.blockedBy = 'receiver'
            else if (user.senderBlockList.includes(user.receiverUser._id)) user.blockedBy = 'sender'
            else user.blockedBy = ''
            user.isBlocked =
              user.receiverBlockList.concat(user.senderBlockList).includes(user.senderUser._id) ||
              user.receiverBlockList.concat(user.senderBlockList).includes(user.receiverUser._id)
            user.adminBlock=user.receiverUser.isBlocked
          }
          return
        })
      }
      const toMessage = action.payload.reqData.toMessage
      let newArr2 = cloneDeep(newArr)
      let firstUser = {}
      if (toMessage && newArr2.length > 1 && !action.payload.data.data.userNotExist) {
        firstUser = newArr2[0]
        newArr2 = newArr2.slice(1)
      }
      const newArr3 = cloneDeep(newArr2)
      let sortRecent = newArr3
      if (toMessage && newArr.length > 1 && !action.payload.data.data.userNotExist) {
        sortRecent = [firstUser, ...sortRecent]
      }
      sortRecent = uniqBy(sortRecent, '_id')

      //pagination logic & set Redux state
      if (action.payload) {
        if (action.payload.reqData.offset === 0) {
          state.pageLoaded=true
          state.listConversations = sortRecent
          state.conversationMetadata = action.payload.data.data.count
        } else {
          state.listConversations = state.listConversations.concat(sortRecent)
        }
        state.conversationLoader = false
      }
      state.apiFetch = false
    },
    [getConversationDetails.fulfilled]: (state, action) => {
      if (!action.payload) {
        state.activeChatMessages = []
        state.messagesLoader = false
      }
      if (action.payload) {
        action.payload.data.data.chats.reverse()
        if (action.payload.reqData.offset === 0) {
          state.activeChatMessages = action.payload.data.data.chats
          state.messagesMetadata = action.payload.data.data.count
        } else {
          state.activeChatMessages = action.payload.data.data.chats.concat(state.activeChatMessages)
        }
        state.messagesLoader = false
      }
    },
    [deleteConversation.fulfilled]: (state, action) => {
      if (action.payload) {
        state.activeChatMessages = []
      }
    },
    [getUnreadConversationsCount.fulfilled]: (state, action) => {
      if (action.payload) {
        state.unreadConversationsCount = action.payload.data.unreadConversationsCount
      }
    },
  },
})
export const {
  instantBlockUser,
  populateChatBox,
  populateChatFromId,
  incrementMessageCount,
  mutateStateAfterBlock,
  initiateNewThread,
  readChat,
  clearConversationsUnreadCount,
  addNewMessage,
  receiveNewMessage,
  moveToTop,
  contactsToggler,
  clearActiveChat,
  setMessageState,
  fetchConversations,
} = messagesSlice.actions

export default messagesSlice.reducer
