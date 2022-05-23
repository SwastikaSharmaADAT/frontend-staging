import React, { useState } from 'react'
import styled from 'styled-components'
import { IoCameraSharp } from 'react-icons/io5'
import { Editor } from '@tinymce/tinymce-react'
import RightSideAds from '../YourProfile/RightSideAds'
import FollowsSection from '../YourProfile/FollowsSection'
import Input from '../../components/UI/Input'
import StyledCheckbox from '../../components/UI/CustomCheckbox'
import Select from '../../components/UI/Select'
import Button from '../../components/UI/Button'
import ButtonLight from '../../components/UI/ButtonLight'

const FeedWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
`
const YourProfileContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1290px;
  padding: 0 15px;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  @media (max-width: 1280px) {
    width: auto;
  }
  @media (min-width: 600px) and (max-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (max-width: 599px) {
    flex-direction: column;
  }
`
const LeftContainer = styled.div`
  position: relative;
  max-width: 844px;
  margin-right: 15px;
  margin-bottom: 30px;
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  padding: 18px;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: 991px) and (max-width: 1024px) {
    max-width: 558px;
  }
  @media (max-width: 991px) {
    margin-right: 0;
    max-width: 100%;
  }
  @media (max-width: 767px) {
    width: auto;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    width: 100%;
  }
`
const RightContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 350px;
  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 350px;
    margin: 0 auto;
  }
  @media (max-width: 991px) {
    max-width: 350px;
    margin: 0 auto;
  }
  @media (max-width: 479px) {
    margin-left: 0;
  }
  @media (max-width: 599px) {
    margin: 0 auto;
  }
`
const ImgWrap = styled.div`
  border: 3px dashed #eeeeee;
  justify-content: center;
  height: 146px;
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 17px;
  color: #222;
  flex-direction: column;
  cursor: pointer;
  position: relative;
  margin: 0 0 12px;
  svg {
    color: #aaa;
    font-size: 62px;
    @media (max-width: 479px) {
      font-size: 48px;
    }
  }
`

const ThreeCols = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (min-width: 991px) and (max-width: 1024px) {
    flex-direction: column;
  }
  @media (max-width: 767px) {
    flex-direction: column;
  }
  .CustomBoxSelect {
    width: 100%;
    background-color: #fff;
    svg {
      display: none;
    }
  }
`
const SelectCols = styled.div`
  max-width: 270px;
  width: 100%;
  display: flex;
  flex-direction: column;
  input {
    height: 32px;
  }
  @media (min-width: 991px) and (max-width: 1024px) {
    max-width: 100%;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    padding: 0 10px;
  }
  @media (max-width: 767px) {
    max-width: 100%;
  }
  .CustomBoxSelect {
    width: 100%;
    background-color: #fff;
    svg {
      display: none;
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
    margin: 2px 15px 0 0;
    font-size: 14px;
    @media (min-width: 768px) and (max-width: 991px) {
      margin: 2px 0 0 0;
    }
  }
  svg {
    position: relative;
    top: 2px;
  }
  input[type='checkbox'].ios-switch + div {
    width: 43px;
    height: 18px;
    margin: 0px 0 0 0;
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
    margin-left: 0;
    cursor: pointer ;
    @-moz-document url-prefix() {
      margin-left: -2px;
    }
  }
`
const ButnsWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  button {
    max-width: 130px;
    margin: 0 0 10px;
    @media (max-width: 767px) {
      margin: 0 10px 10px 0;
    }
  }
  @media (max-width: 767px) {
    justify-content: flex-start;
  }
`

const EditorWrap = styled.div`
  padding: 0px 0;
  border: 2px solid #eee;
  margin: 0px 0 12px;
  font-family: 'Montserrat-Regular' !important;
  .tox .tox-statusbar {
    display: none;
  }
  .tox-tinymce {
    border: 0;
  }
  .tox .tox-menubar + .tox-toolbar-overlord .tox-toolbar__primary {
    border-color: #eee;
    border-width: 2px;
    background-image: none;
    border-bottom: 2px solid #eee;
  }
  .tox:not([dir=rtl]) .tox-toolbar__group:not(:last-of-type) {
    border-right: 0;
  }
`

const ExibitionEdit = () => (
  <>
    <FeedWrapper>
      <YourProfileContainer>
        <LeftContainer>
          <ImgWrap>
            <IoCameraSharp />
            Add a feature image
          </ImgWrap>
          <Input placeholder="Insert Title" />
          <EditorWrap>
           <Editor
              apiKey={process.env.NEXT_PUBLIC_REACT_APP_TINY_MCE}
              value={values.description}
              init={{
                height: 500,
                target: false,
                placeholder: t(`articles:placeholderDescription`),
                plugins:
                  'advlist autolink quickbars lists link image charmap print preview anchor searchreplace code fullscreen media paste code placeholder mediaembed imagetools',
                menubar: false,
                media_live_embeds: true,
                toolbar:
                  'bold italic underline h2 h3 removeformat alignleft aligncenter alignright alignjustify numlist blockquote media quickimage link',
                  quickbars_insert_toolbar: false,
                  quickbars_selection_toolbar: 'bold italic underline h2 h3',
              }}
              onEditorChange={(content) => {
                setFieldValue('description', content)
              }}
              onBlur={() => setFieldTouched('description', true)}
            ></Editor>
          </EditorWrap>
          <ThreeCols>
            <SelectCols>
              <FormGroup className="BottomDiv">
                <StyledCheckbox />
                <span className="firstspan">This post is an Exhibition</span>
              </FormGroup>
            </SelectCols>
            <SelectCols>
              <Select>
                <option>Country</option>
              </Select>
              <Input placeholder="Start Date" />
              <Select>
                <option>Category</option>
              </Select>
            </SelectCols>
            <SelectCols>
              <Input placeholder="City" />
              <Input placeholder="End Date" />
              <ButnsWrap>
                <ButtonLight label="Save Draft" />
                <Button>Submit</Button>
              </ButnsWrap>
            </SelectCols>
          </ThreeCols>
        </LeftContainer>

        <RightContainer>
          <FollowsSection />
          <RightSideAds />
        </RightContainer>
      </YourProfileContainer>
    </FeedWrapper>
  </>
)

export default ExibitionEdit
