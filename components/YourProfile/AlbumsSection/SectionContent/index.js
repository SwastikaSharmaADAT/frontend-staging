import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'

import SingleAlbum from '../SingleAlbum'

const AlbumsSection = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  .DefaultText {
    font-style: normal;
    color: #666;
  }
`

// TODO default image
const SectionContent = ({setAddAlbumModal,userAlbums,setPostInfo,setLightBox,setEditData,editData,editType,setEditType}) => {
  const { t } = useTranslation('profile')
  return (
    <>
      <AlbumsSection>
        {userAlbums ? (
          <>
            {userAlbums.length > 0 ? (
              <>
                {userAlbums.map((album) => (
                  <SingleAlbum
                    setAddAlbumModal={setAddAlbumModal}
                    setEditData={setEditData}
                    editData={editData}
                    editType={editType}
                    setEditType={setEditType}
                    setPostInfo={setPostInfo}
                    setLightBox={setLightBox}
                    key={album._id}
                    album={album}
                  />

                ))}
              </>
            ) : (
              <span className="DefaultText">{t(`album.noAlbumFound`)}</span>
            )}
          </>
        ) : null}
      </AlbumsSection>
    </>
  )
}

SectionContent.propTypes = {
  userAlbums: PropTypes.array,
  setPostInfo: PropTypes.object,
  setLightBox: PropTypes.bool,
  setEditData: PropTypes.func,
  editData: PropTypes.object,
  editType: PropTypes.object,
  setEditType: PropTypes.func,
  setAddAlbumModal: PropTypes.func,
}

export default SectionContent
