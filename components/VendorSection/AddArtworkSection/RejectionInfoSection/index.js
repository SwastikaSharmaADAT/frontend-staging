import PropTypes from 'prop-types'
import { Alert, AlertTitle } from '@material-ui/lab'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
    marginBottom: '10px',
  },
  heading: {
    fontWeight: 'bold',
    fontSize: '18px !important',
  },
  reasonsHeading: {
    margin: 0,
    padding: 0,
    fontSize: '16px',
    marginBottom: '5px',
  },
  reasonsList: {
    margin: '0 0 10px',
    '& li': {
      fontSize: '14px',
    },
  },
  description: {
    margin: 0,
    padding: 0,
    fontSize: '14px',
  },
}))

const RejectionInfoSection = ({ title, reasonsHeading, artworkDetail }) => {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      <Alert severity="error">
        <AlertTitle className={classes.heading}>{title}</AlertTitle>
        <h2 className={classes.reasonsHeading}>{reasonsHeading}</h2>
        <ul className={classes.reasonsList}>
          {artworkDetail &&
            artworkDetail.rejectedReasons &&
            artworkDetail.rejectedReasons.map((reason, index) => (
              <li key={index}>
                <b>{reason.title}</b>: {reason.description}
              </li>
            ))}
        </ul>
        <p className={classes.description}>{artworkDetail && artworkDetail.rejectDescription}</p>
      </Alert>
    </div>
  )
}

RejectionInfoSection.propTypes = {
  title: PropTypes.string,
  reasonsHeading: PropTypes.string,
  artworkDetail: PropTypes.object,
}

export default RejectionInfoSection
