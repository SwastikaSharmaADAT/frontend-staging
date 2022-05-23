import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import SingleArtwork from '../SingleArtwork'

const ArtWorkSection = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  .NoWrap {
    margin: 0 0 30px;
    font-style: normal;
    color: #666;
    font-size: 16px;
    @media (max-width: 991px) {
      margin: 0 0 0px;
    }
  }
`
const SectionContent = (props) => {
  const { t } = useTranslation('profile')
  return (
    <>
      <ArtWorkSection>
        {props.userArtworks ? (
          <>
            {props.userArtworks.length > 0 ? (
              <>
                {props.userArtworks.map((artwork) => (
                  <SingleArtwork
                    artwork={artwork}
                    key={artwork._id}
                    currency={props.currency}
                    conversionRate={props.conversionRate}
                    decimalSeparator={props.decimalSeparator}
                  />
                ))}
              </>
            ) : (
              <div className="NoWrap">{t(`artwork.noArtworkFound`)}</div>
            )}
          </>
        ) : null}
      </ArtWorkSection>
    </>
  )
}

SectionContent.propTypes = {
  userArtworks: PropTypes.array,
  currency: PropTypes.string,
  conversionRate: PropTypes.any,
  decimalSeparator: PropTypes.string,
}

export default SectionContent
