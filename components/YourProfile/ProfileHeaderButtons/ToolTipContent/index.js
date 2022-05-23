import React from 'react'
import { useTranslation } from 'next-i18next'
/**
 *
 * @returns content of tooltip
 */
function ToolTipContent() {
  const { t } = useTranslation('profile')

  return (
    <>
      {t(`profileHead.tooltip.text`)}
      <a> {t(`profileHead.tooltip.seeMore`)}</a>
    </>
  )
}

export default ToolTipContent
