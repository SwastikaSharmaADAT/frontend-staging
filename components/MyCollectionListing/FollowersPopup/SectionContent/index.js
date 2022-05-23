import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import SingleItem from './SingleItem'
import { getFollowersFollowing, setFollowLoader } from '../../../../modules/profile/myProfileSlice'
import GhostLoader from '../../../UI/GhostLoader'
import Select from '../../../UI/Select'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import {
  getUserSettings,
  saveUserSettings,
  downloadUserData,
  deleteUserData,
} from '../../../../modules/myAccount/myAccountSlice'
import Button from '../../../UI/Button'
import { setMyCollectionVisibility } from '../../../../modules/collection/collectionSlice'

const SectionContentWrap = styled.div`
  position: relative;
  margin: 0;
  border-top: 1px solid #eee;
  padding: 10px 15px;
  max-height: 400px;
  height: 100%;
  overflow: auto;
  overflow-x: hidden;
  @media (max-width: 991px) and (orientation: landscape) {
    max-height: 200px;
  }
  @media (max-width: 479px) {
    padding: 10px;
  }
`
const FollowingList = styled.div`
  position: relative;
  margin: 0 0 10px;
  border-bottom: 1px solid #f5f5f5;
  padding: 0 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const SectionContent = ({
  setIsOpen
}) => {
  const { t } = useTranslation('profile')

  const dispatch=useDispatch()
  const [privacy, setPrivacy] = useState()

  const settingsList = [{
    value: 'public',
    label: 'Public'
  },{
    value: 'connections',
    label: 'Connections Only'
  },{
    value: 'private',
    label: 'Private'
  }]

  const privacySettings = useSelector((state) => state.root.myAccount.privacySettings)

    /**get privacy settings on component mount */
    useEffect(() => {
      if (isEmptyObj(privacySettings)) {
        dispatch(getUserSettings())
      }
    }, [dispatch, privacySettings])

  console.log(privacySettings, setMyCollectionVisibility)

    const handleSubmit = () => {

      dispatch(setMyCollectionVisibility({type: privacy ? privacy : 'public'}))
      setIsOpen(false)
    }

  return (
    <>
      <SectionContentWrap id="follower" >
        <p>Who can see the Art Collection on your profile?</p>
        <Select value={privacy} onChange={(e) => setPrivacy(e.target.value)}>
          {settingsList.map((item, index) => (
            <option value={item.value} key={index}>
              {item.label}
            </option>
          ))}
        </Select>
        <Button onClick={handleSubmit}>Save Changes</Button>
      </SectionContentWrap>
    </>
  )
}
SectionContent.propTypes = {
  followUnfollowUser: PropTypes.func.isRequired,
  redirectToUserProfile: PropTypes.func,
  userData: PropTypes.object,
  loggedInUsername: PropTypes.string,
  accountType: PropTypes.string,
  referrals: PropTypes.object,
}
export default SectionContent