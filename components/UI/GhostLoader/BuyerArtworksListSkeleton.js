import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '100%',
    margin: theme.spacing(0),
  },
  media: {
    height: 317,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

/**
 * @description: GhostLoader component displays skeleton before list load in all artworks listing
 * @returns
 */
function BuyerArtworksListSkeleton() {
  const classes = useStyles()
  return (
    <>
      <Card className={classes.card}>
        <Skeleton animation="wave" variant="rect" className={classes.media} />
        <CardContent>
          <div className={classes.contentWrapper}>
            <Skeleton animation="wave" height={10} width="80%" />
            <Skeleton animation="wave" height={10} width="80%" />
            <Skeleton animation="wave" height={10} width="80%" />
            <Skeleton animation="wave" height={10} width="80%" />
            <Skeleton animation="wave" height={10} width="80%" />
            <Skeleton animation="wave" height={10} width="80%" />
            <Skeleton animation="wave" height={30} width="97%" style={{ marginTop: '10px', marginBottom: '-20px' }} />
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default BuyerArtworksListSkeleton
