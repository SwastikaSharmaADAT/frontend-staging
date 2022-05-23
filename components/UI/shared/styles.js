/**
 * Style for react select
 * @param {*} base
 * @returns
 */
const dropdownIndicatorStyles = (base) => {
  let changes = {
    background: `url('/assets/select_arrow.png') no-repeat center center`,
    width: '30px',
  }
  return Object.assign(base, changes)
}

export const customMultiSelectStyles = {
  control: () => ({
    border: '2px solid #eee',
    borderRadius: 0,
    boxShadow: 'none',
    display: 'flex',
    minHeight: '36px',
  }),
  dropdownIndicator: dropdownIndicatorStyles,
  placeholder: () => ({
    color: '#222',
    paddingLeft: '7px',
  }),
  menu: (styles) => ({
    ...styles,
    width: 'calc(100% + 59px)',
    left: -15,
    border: '0!important',
    borderRadius: 0
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: 'transparent',
    display: 'block !important',
    background: `url('/assets/language_cross.png') no-repeat right center`,
    borderRadius: 0,
    paddingLeft: '7px',
    width: '15px',
    marginRight: '5px',
    ':hover': {
      backgroundColor: 'transparent',
      color: 'transparent',
    },
  }),
}
