import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import CancelIcon from '@material-ui/icons/Cancel'
import NoSsr from '@material-ui/core/NoSsr'
import TextField from '@material-ui/core/TextField'
import Paper from '@material-ui/core/Paper'
import MenuItem from '@material-ui/core/MenuItem'
import { emphasize } from '@material-ui/core/styles/colorManipulator'
import Chip from '@material-ui/core/Chip'
import classNames from 'classnames'
import Async from 'react-select/async'

const styles = theme => ({
  root: {
    marginTop: '-4px'
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto'
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden'
  },
  chip: {
    margin: `2px ${theme.spacing(1 / 4)}px`
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    )
  },
  noOptionsMessage: {
    padding: `${theme.spacing()}px ${theme.spacing(2)}px`
  },
  singleValue: {
    fontSize: 16
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16
  },
  paper: {
    position: 'absolute',
    zIndex: 20,
    marginTop: theme.spacing(),
    left: 0,
    right: 0
  },
  divider: {
    height: theme.spacing(2)
  },
  separator: {
    alignSelf: 'stretch',
    backgroundColor: 'hsl(0,0%,80%)',
    width: '1px',
    boxSizing: 'border-box'
  },
  chipExpanded: {
    width: '100%'
  },
  chipLabel: {
    flexGrow: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
  }
})

const useStyles = makeStyles(styles)

const NoOptionsMessage = props => (
  <Typography
    color='textSecondary'
    className={props.selectProps.classes.noOptionsMessage}
    {...props.innerProps}
  >
    {props.children}
  </Typography>
)

const MultiValue = props => (
  <Chip
    tabIndex={-1}
    key={props.data.id}
    classes={
      props.selectProps.isMultiExpanded
        ? {
            label: props.selectProps.classes.chipLabel
          }
        : {}
    }
    label={
      <Typography variant='body2' noWrap>
        {props.children}
      </Typography>
    }
    className={classNames(props.selectProps.classes.chip, {
      [props.selectProps.classes.chipFocused]: props.isFocused,
      [props.selectProps.classes.chipExpanded]:
        props.selectProps.isMultiExpanded
    })}
    onDelete={props.removeProps.onClick}
    deleteIcon={<CancelIcon {...props.removeProps} />}
  />
)

function inputComponent ({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />
}

function Control (props) {
  const obj = props.getValue()[0]
  return (
    <TextField
      fullWidth
      value={obj ? obj.label : ''}
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps
        }
      }}
      {...props.selectProps.textFieldProps}
    />
  )
}

function Option (props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component='div'
      style={{
        fontWeight: props.isSelected ? 500 : 400
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  )
}

function Placeholder (props) {
  return (
    <Typography
      color='textSecondary'
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function SingleValue (props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function ValueContainer (props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  )
}

function Menu (props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  )
}

function IndicatorSeparator (props) {
  return <span className={props.selectProps.classes.separator} />
}

const components = {
  Control,
  IndicatorSeparator,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer
}

const IntegrationReactSelect = ({
  isMulti,
  isMultiExpanded = false,
  options,
  loadOptions,
  onChange,
  value,
  label,
  placeholder,
  autoFocus,
  textFieldProps,
  disabled,
  defaultOptions
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit'
      }
    })
  }
  const AutocompleteComponent = loadOptions ? Async : Select

  return (
    <div className={classes.root}>
      <NoSsr>
        <AutocompleteComponent
          textFieldProps={{ label, autoFocus, ...textFieldProps }}
          classes={classes}
          styles={selectStyles}
          loadOptions={loadOptions}
          options={options}
          defaultOptions={defaultOptions}
          components={components}
          value={value}
          onChange={value => onChange(value)}
          placeholder={placeholder}
          isClearable
          isMulti={isMulti}
          isMultiExpanded={isMultiExpanded}
          isDisabled={disabled || false}
          loadingMessage={() => 'Carregando...'}
          noOptionsMessage={() => 'Sem opções'}
        />
      </NoSsr>
    </div>
  )
}

/// builds an object to use with Autocomplete components
/// @labelKey prop to autocomplete
/// @whitelist prop or props to keep on the object
export const toOption = (labelKey, whitelist) => {
  if (typeof labelKey !== 'string') {
    throw new Error(
      `labelKey: expected 'string' but received '${typeof labelKey}'`
    )
  }

  if (typeof whitelist === 'string') {
    return obj => ({
      [whitelist]: obj[whitelist],

      id: obj.id,
      value: obj.id,
      label: obj[labelKey]
    })
  }

  if (Array.isArray(whitelist)) {
    return obj => {
      const ret = {}

      for (const key of whitelist) ret[key] = obj[key]

      return {
        ...ret,

        id: obj.id,
        value: obj.id,
        label: obj[labelKey]
      }
    }
  }

  return obj => ({
    id: obj.id,
    value: obj.id,
    label: obj[labelKey]
  })
}

IntegrationReactSelect.defaultProps = {
  placeholder: '',
  textFieldProps: {},
  defaultOptions: true
}

IntegrationReactSelect.propTypes = {
  onChange: PropTypes.func,
  loadOptions: PropTypes.func,
  value: PropTypes.any,
  options: PropTypes.array,
  placeholder: PropTypes.string,
  textFieldProps: PropTypes.object,
  isMulti: PropTypes.bool,
  label: PropTypes.string,
  autoFocus: PropTypes.bool,
  disabled: PropTypes.bool,
  defaultOptions: PropTypes.bool
}

export default IntegrationReactSelect
