const timePeriods = [
  { label: 'contemporary', value: 'contemporary' },
  { label: 'modern', value: 'modern' },
  { label: 'romanticism', value: 'romanticism' },
  { label: 'renaissance', value: 'renaissance' },
  { label: 'medieval', value: 'medieval' },
  { label: 'ancient', value: 'ancient' },
]
export const timePeriodsData = (t) =>
  timePeriods.map((o) => ({ ...o, label: t(`artworks:addArtwork.labels.${o.label}`) }))
  