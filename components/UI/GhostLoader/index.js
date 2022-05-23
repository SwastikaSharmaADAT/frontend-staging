import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardHeader from '@material-ui/core/CardHeader'
import PropTypes from 'prop-types'
import CardContent from '@material-ui/core/CardContent'

const useStyles = makeStyles((theme) => ({
  card: {
    maxWidth: '100%',
    margin: theme.spacing(0),
  },
  media: {
    height: 230,
  },
}))
/**
 * @description: GhostLoader Component displays skeleton before posts load in news Feed
 * @returns
 */
function GhostLoader({ video, notification, articleFetch }) {
  const classes = useStyles()
  return (
    <>
      <Card className={classes.card}>
        {!video && !notification && !articleFetch && (
          <CardHeader
            avatar={<Skeleton animation="wave" variant="circle" width={40} height={40} />}
            title={<Skeleton animation="wave" height={10} width="80%" style={{ marginBottom: 6 }} />}
            subheader={<Skeleton animation="wave" height={10} width="40%" />}
          />
        )}
        {!notification && <Skeleton animation="wave" variant="rect" className={classes.media} />}
        <CardContent>
          <>
            <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
            <Skeleton animation="wave" height={10} width="80%" />
          </>
        </CardContent>
      </Card>
    </>
  )
}
GhostLoader.propTypes = {
  video: PropTypes.bool,
  notification: PropTypes.bool,
  articleFetch: PropTypes.bool,
}
export default GhostLoader
