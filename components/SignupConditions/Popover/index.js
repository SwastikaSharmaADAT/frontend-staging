// import React from 'react'
// import { makeStyles } from '@material-ui/core/styles';
// import Popper from '@material-ui/core/Popper';
import { FaQuestionCircle } from 'react-icons/fa'

// const useStyles = makeStyles(() => ({
//   paper: {
//     border: '0',
//     padding: '5px',
//     backgroundColor: '#000',
//     color: '#fff',
//     fontSize: '14px',
//     maxWidth: '200px',
//     position: 'relative',
//     top: '8px'
//   },
// }));

// export default function SimplePopper() {
//   const classes = useStyles();
//   const [anchorEl, setAnchorEl] = React.useState(null);

//   const handleClick = (event) => {
//     setAnchorEl(anchorEl ? null : event.currentTarget);
//   };

//   const open = Boolean(anchorEl);
//   const id = open ? 'simple-popper' : undefined;

//   return (
//     <div>
//       {/* <button aria-describedby={id} type="button" onClick={handleClick}>
//         Toggle Popper
//       </button> */}
//       <FaQuestionCircle aria-describedby={id} onClick={handleClick} />
//       <Popper id={id} open={open} anchorEl={anchorEl}>
//         <div className={classes.paper}>The other profile type has different subscription models. <a>See more...</a></div>
//       </Popper>
//     </div>
//   );
// }

import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { useTranslation } from 'next-i18next'

const HtmlTooltip = withStyles(() => ({
  tooltip: {
    backgroundColor: '#000',
    color: '#fff',
    maxWidth: 200,
    fontSize: '10',
    border: '0',
  },
}))(Tooltip)

export default function CustomizedTooltips() {
  const { t } = useTranslation(['translation', 'profile'])

  const [open, setOpen] = React.useState(false)

  const handleTooltipClose = () => {
    setOpen(false)
  }

  const handleTooltipOpen = () => {
    setOpen(true)
  }

  return (
    <div>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <HtmlTooltip
          title={
            <React.Fragment>
              <Typography color="inherit">
                {t(`profile:profileHead.tooltip.text`)} <a>{t(`profile:profileHead.tooltip.seeMore`)}</a>
              </Typography>
            </React.Fragment>
          }
          interactive
          disableFocusListener
          onClose={handleTooltipClose}
          open={open}
          disableHoverListener
          disableTouchListener
        >
          <Button className="PopoverBtn" onMouseOver={handleTooltipOpen} onClick={handleTooltipOpen}>
            <FaQuestionCircle />
          </Button>
        </HtmlTooltip>
      </ClickAwayListener>
    </div>
  )
}
