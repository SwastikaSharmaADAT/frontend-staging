import React from 'react'
import styled from 'styled-components'
import { IoThumbsUpSharp, IoChatbubbleSharp } from 'react-icons/io5'
import { HiShare } from 'react-icons/hi'
import { VscChromeClose } from 'react-icons/vsc'
import SeeMorePopup from './SeeMorePopup'

const CenterContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 610px;
  @media (max-width: 1279px) {
    margin: 0 15px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 70%;
    margin: 0;
  }
  @media (min-width: 600px) and (max-width: 767px) {
    max-width: 67%;
    margin-right: 0;
  }
  @media (max-width: 599px) {
    max-width: 100%;
    margin: 0;
  }
`

const SinglePostWrap = styled.div`
  display: inline-block;
  width: 100%;
  position: relative;
  padding: 0;
  margin: 0 auto 17px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  background: #fff;
  filter: blur(8px);
  overflow: hidden;
  pointer-events: none;
`
const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0;
  font-family: 'Montserrat-Regular';
  margin: 15px;
`

const ProfileThumb = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 10px 0 0;
  img {
    width: 40px;
    height: 40px;
  }
`
const ProfileNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: calc(100% - 50px);
`

const ProfileName = styled.div`
  font-style: normal;
  font-size: 16px;
  line-height: normal;
  margin: 0 0 5px 0;
  color: #222;
  font-weight: bold;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const ProfileTimeline = styled.div`
  font-style: normal;
  font-size: 14px;
  line-height: normal;
  margin: 0;
  color: #666;
  @media (max-width: 767px) {
    font-size: 12px;
  }
`

const PostText = styled.div`
  font-style: normal;
  font-size: 24px;
  line-height: normal;
  margin: 0;
  color: #222;
  border: 0;
  border-top: 1px solid #eee;
  padding: 20px 15px;
  font-family: 'Montserrat-Regular';
  &::empty {
    padding: 0;
  }
  @media (max-width: 767px) {
    font-size: 18px;
  }
`

const LikesWrap = styled.div`
  display: flex;
  margin: 0;
  font-family: 'Montserrat-Regular';
  border-bottom: 1px solid #eee;
  justify-content: space-between;
  padding: 15px;
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`

const LikesDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 30px 0 0;
`

const LikesCount = styled.div`
  color: #000;
  font-size: 24px;
  @media (max-width: 767px) {
    font-size: 18px;
  }
`

const LikesLabel = styled.div`
  color: #aaa;
  font-size: 17px;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`
const UserLikes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media (max-width: 767px) {
    justify-content: flex-start;
    margin: 0 0 10px;
  }
`

const UserThumb = styled.div`
  img {
    width: 33px;
    height: 36px;
    margin: 0 0 0 5px;
    @media (max-width: 767px) {
      margin: 0 5px 0 0;
    }
  }
`

const LikesBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0px;
`

const UsersButton = styled.button`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #aaa;
  background: transparent;
  width: auto;
  border: 0;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 5px;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    background: transparent2;
  }
  @media (max-width: 767px) {
    margin-left: 0px;
    font-size: 14px;
    padding: 5px 10px;
  }
  svg {
    margin: 0 8px 0 0;
    font-size: 18px;
  }
`

const PostDiv = styled.div`
  max-width: 580px;
  text-align: center;
  margin: 0 auto;
  padding: 0 15px;
`

const CommentsWrap = styled.div`
  display: flex;
  padding: 0;
  font-family: 'Montserrat-Regular';
  margin: 15px;
`

const CommentsThumb = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 10px 0 0;
  img {
    width: 40px;
    height: 40px;
  }
`
const CommentNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: calc(100% - 40px);
`

const CommentName = styled.div`
  font-style: normal;
  font-size: 16px;
  line-height: normal;
  margin: 0 0 3px 0;
  color: #222;
  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  a {
    width: calc(100% - 97%);
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const CommentsDespWrap = styled.div`
  font-style: normal;
  font-size: 16px;
  line-height: normal;
  margin: 0 0 8px 0;
  color: #222;
  max-width: 100%;
  overflow: hidden;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const CommentsClick = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  font-family: 'Montserrat-Regular';
  color: #666;
  font-size: 16px;
  a {
    color: #666;
    margin: 0 15px 0 0;
    cursor: pointer;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const CommentsInput = styled.div`
  display: flex;
  padding: 0;
  font-family: 'Montserrat-Regular';
  margin: 15px;
  justify-content: flex-end;
  flex-wrap: wrap;
`

const CommentsTextArea = styled.textarea`
  padding: 15px;
  font-family: 'Montserrat-Regular';
  margin: 0 0 15px;
  width: 100%;
  resize: none;
  border: 2px solid #eeeeee;
  min-height: 76px;
  overflow: auto;
  font-size: 14px;
  border-radius: 0;
  ::placeholder {
    color: #ccc;
  }
  :hover,
  :focus {
    outline: 0;
  }
`

const PublishBtn = styled.button`
  background: #222;
  font-style: normal;
  color: #fff;
  border: 0px;
  outline: 0px;
  padding: 3px 11px;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  font-family: 'Montserrat-Regular';
  :hover,
  :focus {
    outline: 0;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    padding: 3px 10px;
  }
`

const ImagePostWrap = styled.div`
  width: 100%;
  max-height: 320px;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  margin: 0 0 10px;
  &.clickable {
    cursor: pointer;
  }
  img {
    max-height: 320px;
  }
`

const SinglePost = () => (
  <>
    <CenterContainer>
      <SeeMorePopup />
      <SinglePostWrap>
        <ProfileNameHeader>
          <ProfileThumb>
            <img src='/assets/followers_thumb.png' alt="" />
          </ProfileThumb>
          <ProfileNameWrap>
            <ProfileName>Go Wah</ProfileName>
            <ProfileTimeline>May 14 at 3:34 PM</ProfileTimeline>
          </ProfileNameWrap>
        </ProfileNameHeader>

        <PostText>Artist at work.</PostText>
        <PostDiv>
          <ImagePostWrap>
            <img src='/assets/PostImg.png' alt="PostImg" />
          </ImagePostWrap>
        </PostDiv>

        <LikesWrap>
          <UserLikes>
            <LikesDiv>
              <LikesCount>3</LikesCount>
              <LikesLabel>likes</LikesLabel>
            </LikesDiv>
            <LikesDiv>
              <LikesCount>3</LikesCount>
              <LikesLabel>comments</LikesLabel>
            </LikesDiv>
          </UserLikes>
          <UserThumb>
            <img src='/assets/followers_thumb.png' alt="" />
            <img src='/assets/followers_thumb.png' alt="" />
            <img src='/assets/followers_thumb.png' alt="" />
          </UserThumb>
        </LikesWrap>

        <LikesBtnWrap>
          <UsersButton>
            <IoThumbsUpSharp /> Like
          </UsersButton>
          <UsersButton>
            <IoChatbubbleSharp /> Comment
          </UsersButton>
          <UsersButton>
            <HiShare /> Share
          </UsersButton>
        </LikesBtnWrap>

        <CommentsWrap>
          <CommentsThumb>
            <img src='/assets/followers_thumb.png' alt="" />
          </CommentsThumb>
          <CommentNameWrap>
            <CommentName>
              Go Wah{' '}
              <a>
                <VscChromeClose />
              </a>
            </CommentName>
            <CommentsDespWrap>This is absolutely stunning! Truly - artist at work.</CommentsDespWrap>
            <CommentsClick>
              <a>Like</a>
              <a>Reply</a>
            </CommentsClick>
          </CommentNameWrap>
        </CommentsWrap>

        <CommentsInput>
          <CommentsTextArea placeholder="Insert your comment..."></CommentsTextArea>
          <PublishBtn>Publish</PublishBtn>
        </CommentsInput>
      </SinglePostWrap>
    </CenterContainer>
  </>
)

export default SinglePost
