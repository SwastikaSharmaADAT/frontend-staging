import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'


const RightContainerSec = styled.div`
  width: 100%;
  position: relative;
  background: #fff ;
  @media (max-width: 1024px) {
    margin: 0 auto;
  }
  .conDiv {
      padding: 10px ;
      color: #5e5e5e;
      h2 {
        font-size: 24px;
        margin-bottom: 1em;
      }
      p {
        font-size: 16px;
        margin-bottom: 1em;
        line-height: 25px;
      }
      h3 {
        font-size: 18px;
        margin-bottom: 1em;
      }
  }

`

const AddArticleRightSec = () => {
    const { t } = useTranslation(['articles','translation'])
  return (
    <RightContainerSec>
      <div className="conDiv">
        <h2>{t(`articles:addArticleInfo.mainSection.heading`)}</h2>
        <p>{t(`articles:addArticleInfo.mainSection.firstPara`)}</p>
        <p>{t(`articles:addArticleInfo.mainSection.secondPara`)}</p>
        <p>{t(`articles:addArticleInfo.mainSection.thirdPara`)}</p>
        <h3>{t(`articles:addArticleInfo.buzzSubSection.heading`)}</h3>
        <p>{t(`articles:addArticleInfo.buzzSubSection.firstPara`)} {t(`articles:addArticleInfo.buzzSubSection.anchorText`)}.</p>
        <h3>{t(`articles:addArticleInfo.potdSubSection.heading`)}</h3>
        <p>{t(`articles:addArticleInfo.potdSubSection.firstPara`)} {t(`articles:addArticleInfo.potdSubSection.anchorText`)}.</p>
        <h3>{t(`articles:addArticleInfo.exhibitionSubSection.heading`)}</h3>
        <p>{t(`articles:addArticleInfo.exhibitionSubSection.firstPara`)}</p>
        <p>{t(`articles:addArticleInfo.exhibitionSubSection.secondPara`)} {t(`articles:addArticleInfo.exhibitionSubSection.anchorText`)}.</p>
      </div>
    </RightContainerSec>
  )
}

export default AddArticleRightSec
