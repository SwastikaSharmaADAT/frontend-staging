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
    height: 150,
  },
  contentWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}))

/**
 * @description: GhostLoader component displays skeleton before list load in users listing
 * @returns
 */
function UsersListSkeleton() {
  const classes = useStyles()
  return (
    <>
      <Card className={classes.card}>
        <Skeleton animation="wave" variant="rect" className={classes.media} />
        <CardContent>
          <div className={classes.contentWrapper}>
            <Skeleton animation="wave" height={20} width="70%" />
            <Skeleton animation="wave" height={10} width="70%" />
            <Skeleton animation="wave" height={35} width="40%" />
            <Skeleton animation="wave" height={10} width="50%" />
            <Skeleton animation="wave" height={10} width="50%" />
            <Skeleton animation="wave" height={10} width="50%" />
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default UsersListSkeleton
