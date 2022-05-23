import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IoPencil } from 'react-icons/io5'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Tooltip from '@material-ui/core/Tooltip'
import IconButton from '@material-ui/core/IconButton'
// import DeleteIcon from '@material-ui/icons/Delete'
import { FaQuestionCircle } from 'react-icons/fa'
import { makeStyles } from '@material-ui/core/styles'
import { useTranslation } from 'next-i18next'
import StyledCheckbox from '../../UI/CustomCheckbox'
import { setEditingHeader } from '../../../modules/profile/myProfileSlice'
import { HiShare } from 'react-icons/hi'
import ShareProfilePopup from '../ShareProfilePopup'
import ModalComponent from '../../UI/Modal'
import { populateChatBox, setMessageState } from '../../../modules/messages/messagesSlice'
import Menu from './OptionsMenu'
import ToolTipContent from './ToolTipContent'
import { isLoginToken } from '../../../utilities/authUtils'



const ProfileButtons = styled.div`
  width: auto;
  position: relative;
  display: flex;
  margin-bottom: 5px;
  flex-direction: column;
  @media (max-width: 767px) {
    margin-top: 5px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  &.shiftLeft {
    @media (max-width: 991px) and (orientation: landscape) {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    flex-direction: row-reverse;
  }
  .popoverDiv {
    display: flex;
    .PopoverBtn {
      margin: 0 0 0 5px;
    }
    .MuiIconButton-root {
      align-items: flex-start;
      padding: 0;
    }
  }
`

const TopButtons = styled.button`
  height: 36px;
  font-weight: bold;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #222222;
  background: #eeeeee;
  width: auto;
  border: 0;
  padding: 0 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 5px;
  svg {
    margin: 0 5px 0 0;
  }
  &.disableFollow {
    cursor: auto;
    :hover,
    :focus {
      color: #222222;
      background: #eeeeee;
    }
  }
  &.disableForBlock {
    opacity: 0.6;
    pointer-events: none;
  }
  :hover {
    outline: 0;
    border: 0;
    color: #fff;
    background: #222;
  }
  :focus {
    outline: 0;
    border: 0;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    margin: 8px 5px 5px 0;
  }
  @media (max-width: 767px) {
    margin-right: 5px;
    margin-left: 0px;
    height: 30px;
    font-weight: bold;
    font-size: 14px;
    padding: 0 10px;
  }
  &.primary {
    background: #222 ;
    color: #fff ;
  }
`
const ProfileTopBtns = styled.div`
  clear:both;
  display: flex;
  z-index: 8 ;
  @media( max-width: 767px ){
    &.no-sub {
      bottom: 150px;
      position: relative;
    }
  }
  @media( min-width: 768px ) and ( max-width: 1024px){
    &.no-sub {
      top: 40px;
      position: relative;
    }
  }
  @media( min-width: 1050px ) and ( max-width: 1200px){ 
    &.no-sub {
      position: relative;
      bottom: 120px;
    }
  }

  button {
    @media( max-width: 767px){
      position: relative;
      top: 300px ;
      
    }
    @media( min-width: 768px ) and ( max-width: 1024px){
      top: 110px;
      position: relative;
    }
    @media( min-width: 1050px ) and ( max-width: 1200px){
      position: relative;
      top: 250px;
    }
  }
  
`
const FormGroup = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  .Inputauto {
    width: auto;
  }
  &.BottomDiv {
    flex-direction: row;
    margin: 10px 15px 10px 0;
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
  .firstspan {
    text-transform: uppercase;
    margin: 0 15px 0 0;
  }
  .popoverDiv{
    text-transform: uppercase;
  }
  svg {
    position: relative;
    top: 2px;
  }
  input[type='checkbox'].ios-switch + div {
    width: 55px;
    height: 20px;
    margin: -1px 0 0 0;
    cursor: pointer ;
  }
  input[type="checkbox"].ios-switch+div>div {
    background-color: #222;
    border: 1px solid #222;
    cursor: pointer ;
  }
  input[type='checkbox'].ios-switch + div > div {
    width: 14px;
    height: 14px;
    margin-top: 2px;
    margin-left: 3px;
    cursor: pointer ;
  }
  input[type='checkbox'].green.ios-switch:checked + div > div {
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3), 0 0 0 1px #222;
    margin-left: 12px;
    cursor: pointer ;
    @-moz-document url-prefix() {
      margin-left: 16px;
    }
  }
  input[type="checkbox"].green.ios-switch:checked+div {
    box-shadow: inset 0 0 0 15px #fff;
    cursor: pointer ;
  }
  .PopoverBtn {
    color: #000;
    font-size: 16px;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: ${(props) => (props.editing ? '20px' : '0px')};
`
const ChooseProfile = styled.div`
	border: 4px solid #eeeeee;
  clear:both;
  position: relative;
  top: 20px;
  height: 120px;
  min-width: 250px;
  z-index: 8 ;
  @media( min-width: 1300px){
    margin-top: 15px;
  }
  @media( max-width: 767px){
    top: 88px;
    width: 97%;
    margin: 0;
  }
  @media( min-width: 768px ) and ( max-width: 1024px){
    width: 47%;
    min-width: 47%;
    left: 177px;
    top: 10px ;
  }
  @media( min-width: 1050px ) and ( max-width: 1200px){ 
    margin-left: 0px;
    top: 60px;
  }
  .title {
    padding: 10px;
    background: #eeeeee;
    text-align: center;
  }
  .form-section {
    justify-content: center;
  }
  .helpSection{
    text-align: center;
    margin-bottom: 12px;
    padding: 6px ;
    font-size: 11px;
  &.help-member {
    b {
      text-decoration: underline; 
    }
  }
  .large-ft {
    font-size: 15px;
  }
  }
  .boldTxt {
    font-weight: bold ;
  }
`

const ProfileHeaderButtons = (props) => {
  const { t } = useTranslation('profile')

  const dispatch = useDispatch()
  const isEditingHeader = useSelector((state) => state.root.myProfile.isEditingHeader)
  const subscription = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const [shareProfilePopup, setShareProfilePopup] = useState(false)

  /** Get account type from local storage */
  const [userInfo, setUserInfo] = useState(null)
  const parsedUserInfo = userInfo && JSON.parse(userInfo)
  let accountType = ''
  if (!userInfo) {
    accountType = 'personal'
  } else {
    accountType = parsedUserInfo.accountType
  }

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])
  const startEditing = () => {
    dispatch(setEditingHeader(true))
  }

  const stopEditing = () => {
    // dispatch(setEditingHeader(false))
    props.updateData()
  }

  const cancelEditing = () => {
    props.handleCancelClick()
    dispatch(setEditingHeader(false))
  }

  const followClickHandler = () => {
    if (props.userData && props.userData.userIdentity === 'guestUser') {
      props.scrollToBlurred()
    } else {
      props.followUser(props.userData.uuid, 'follow', 'followers')
    }
  }

  const UnfollowClickHandler = () => {
    if (props.userData && props.userData.userIdentity === 'guestUser') {
      props.scrollToBlurred()
    } else {
      props.unFollowUser(props.userData.uuid, 'unfollow', 'followers')
    }
  }

  const messageClickHandler = async () => {
    dispatch(setMessageState({ key: 'chatPopup', value: true }))
    dispatch(populateChatBox({ senderUser: {}, receiverUser: props.userData }))
  }

  const openLoginPopHandler = () => {
    if ( !isLoginToken() ) {
      // dispatch(closeAllModals())
      // dispatch(setLoginPopup(true))
      // dispatch(setLoginError(null))
      // dispatch(setSocialUserError(null))
      props.scrollToBlurred()
    }
  }

  /**styles for tooltip */
  const useStylesBootstrap = makeStyles((theme) => ({
    arrow: {
      color: theme.palette.common.black,
    },
    tooltip: {
      backgroundColor: '#000',
      fontSize: '12px',
      width: '150px',
    },
  }))

  function BootstrapTooltip(props) {
    const classes = useStylesBootstrap()
    return <Tooltip arrow classes={classes} {...props} />
  }
  const shareClickHandler = (e) => {
    e.stopPropagation()
    if (props.userData && props.userData.userIdentity === 'guestUser') {
      props.scrollToBlurred()
    } else {
      setShareProfilePopup(true)
    }
    props.closeMoreMenu()
  }

  return (
    <>
      <ProfileButtons className={!isEditingHeader ? 'shiftLeft' : null}>
        <ButtonWrapper editing={isEditingHeader}>
        {props.userData.userIdentity === 'verifiedUser' && !isEditingHeader && <TopButtons onClick={(e) => shareClickHandler(e)}> <HiShare /> Share</TopButtons> }
          {props.userData.userIdentity === 'verifiedUser' &&
            (!isEditingHeader ? (
              <TopButtons onClick={() => startEditing()}>
                <IoPencil /> {t(`profile:profileHead.edit`)}
              </TopButtons>
            ) : (
              <ProfileTopBtns className={subscription && 'no-sub'}>
                <TopButtons onClick={() => cancelEditing()}>{t(`profile:profileHead.cancel`)}</TopButtons>
                <TopButtons className="primary" onClick={() => stopEditing()}>{t(`profile:profileHead.save`)}</TopButtons>
              </ProfileTopBtns>
            ))}
            
          {props.userData.userIdentity !== 'verifiedUser' && !isEditingHeader && (
            <>
              {accountType === 'personal' && (
                <>
                  {props.userData.haveFollower === 'true' ? (
                    <TopButtons
                      onClick={() => UnfollowClickHandler()}
                      className={props.userData.haveBlockedUser === 'true' ? 'disableForBlock' : ''}
                    >
                      {t(`profile:profileHead.followed`)}
                    </TopButtons>
                  ) : (
                    <>
                      {props.userData.haveBlockedUser === 'true' ? (
                        <TopButtons className="disableForBlock">{t(`profile:profileHead.follow`)}</TopButtons>
                      ) : (
                        <TopButtons onClick={() => followClickHandler()}>{t(`profile:profileHead.follow`)}</TopButtons>
                      )}
                    </>
                  )}
                </>
              )}

              {props.userData.canSendMessage && (
                <TopButtons
                  className={props.userData.haveBlockedUser === 'true' ? 'disableForBlock' : null}
                  onClick={() => messageClickHandler()}
                >
                  {t(`profile:profileHead.message`)}
                </TopButtons>
              )}
              {!isLoginToken() && (
                <TopButtons
                  //className={props.userData.haveBlockedUser === 'true' ? 'disableForBlock' : null}
                  onClick={openLoginPopHandler}
                >
                  {t(`profile:profileHead.message`)}
                </TopButtons>
              )}
              <div onClick={() => props.toggleMenu()}>
                <TopButtons>{t(`profile:profileHead.more`)}</TopButtons>
                {props.menuState && (
                  <Menu
                    handleClickOutside={props.handleClickOutside}
                    addConnectionRequest={props.addConnectionRequest}
                    userData={props.userData}
                    blockUserRequest={props.blockUserRequest}
                    setShareProfilePopup={setShareProfilePopup}
                    scrollToBlurred={props.scrollToBlurred}
                    closeMoreMenu={props.closeMoreMenu}
                    accountType={accountType}
                  />
                )}
              </div>
            </>
          )}
        </ButtonWrapper>
        {shareProfilePopup && (
          <ModalComponent
            closeOnOutsideClick={true}
            isOpen={shareProfilePopup}
            closeModal={() => setShareProfilePopup(false)}
          >
            <ShareProfilePopup setShareProfilePopup={setShareProfilePopup} userData={props.userData} />
          </ModalComponent>
        )}
        {/* <ShareProfilePopup /> */}
        {isEditingHeader && props.userData.userRoleType === 'personal' && !subscription && (
          <ChooseProfile>
            <div className="title">Choose Profile Type</div>
            <FormGroup className="BottomDiv form-section">
            <span className={ !props.isArtist ? 'firstspan boldTxt' : 'firstspan' }>{t(`profile:profileHead.memberProfile`)}</span>{' '}
            <StyledCheckbox checked={props.isArtist} onChange={props.handleArtistChange} />{' '}
            <span className={ props.isArtist ? 'popoverDiv boldTxt' : 'popoverDiv' }>
              {t(`profile:profileHead.artistProfile`)}
              {/* <BootstrapTooltip leaveDelay={2000} leaveTouchDelay interactive arrow title={<ToolTipContent />}>
                <IconButton aria-label="delete">
                  <FaQuestionCircle className="PopoverBtn" />
                </IconButton>
              </BootstrapTooltip> */}
            </span>
          </FormGroup>
          {
            props.isArtist ? <div className="helpSection help-artist"><div className="large-ft" dangerouslySetInnerHTML={{__html:t(`profile:profileHead.profileDesc.artist.firstline`)}}></div>{t(`profile:profileHead.profileDesc.artist.secondline`)}</div> : <div className="helpSection help-member"><div className="large-ft" dangerouslySetInnerHTML={{__html:t(`profile:profileHead.profileDesc.member.firstline`)}}></div>{t(`profile:profileHead.profileDesc.member.secondline`)}</div>
          }
          </ChooseProfile>
        )}
      </ProfileButtons>
    </>
  )
}

ProfileHeaderButtons.propTypes = {
  isArtist: PropTypes.bool,
  handleArtistChange: PropTypes.func,
  updateData: PropTypes.func,
  userData: PropTypes.object,
  handleCancelClick: PropTypes.func,
  handleClickOutside: PropTypes.func,
  menuState: PropTypes.bool,
  toggleMenu: PropTypes.func,
  followUser: PropTypes.func,
  unFollowUser:PropTypes.func,
  addConnectionRequest: PropTypes.func,
  blockUserRequest: PropTypes.func,
  scrollToBlurred: PropTypes.func,
  closeMoreMenu: PropTypes.func,
}

export default ProfileHeaderButtons
