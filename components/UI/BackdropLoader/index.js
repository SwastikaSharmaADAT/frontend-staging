import React from 'react'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'

const useStyles = makeStyles(() => ({
  backdrop: {
    zIndex: 1305,
    color: '#fff',
  },
}))

export default function SimpleBackdrop(props) {
  const classes = useStyles()

  return (
    <div>
      <Backdrop className={classes.backdrop} open={props.open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}

SimpleBackdrop.propTypes = {
  open: PropTypes.bool,
}
