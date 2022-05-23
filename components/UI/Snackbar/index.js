import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert from '@material-ui/lab/Alert'
import { makeStyles } from '@material-ui/core/styles'
import { useDispatch, useSelector } from 'react-redux'
import { setNotificationMsg, setNotificationType, setShowNotification } from '../../../modules/auth/authSlice'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}))

export default function CustomizedSnackbars() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const showNotification = useSelector((state) => state.root.auth.showNotification)
  const notificationType = useSelector((state) => state.root.auth.notificationType)
  const notificationMsg = useSelector((state) => state.root.auth.notificationMsg)

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }
    dispatch(setShowNotification(false))
    dispatch(setNotificationType(null))
    dispatch(setNotificationMsg(null))
  }

  return (
    <div className={classes.root}>
      {showNotification ? (
        <Snackbar
          open={showNotification}
          autoHideDuration={3000}
          onClose={handleClose}
          anchorOrigin={{ horizontal: 'center', vertical: 'top' }}
        >
          <Alert onClose={handleClose} severity={notificationType}>
            {notificationMsg}
          </Alert>
        </Snackbar>
      ) : null}
    </div>
  )
}
