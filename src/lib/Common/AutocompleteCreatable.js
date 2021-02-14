import React from 'react'
import PropTypes from 'prop-types'
import Select from 'react-select/creatable'
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
import Async from 'react-select/async-creatable'

const styles = theme => ({
  root: {
    marginTop: '-4px',
  },
  input: {
    display: 'flex',
    padding: 0,
    height: 'auto',
  },
  valueContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    overflow: 'hidden',
  },
  chip: {
    margin: `${theme.spacing(1 / 2)}px ${theme.spacing(1 / 4)}px`,
  },
  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === 'light'
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing()}px ${theme.spacing(2)}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: 'absolute',
    zIndex: 20,
    marginTop: theme.spacing(),
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing(2),
  },
  separator: {
    alignSelf: 'stretch',
    backgroundColor: 'hsl(0,0%,80%)',
    width: '1px',
    boxSizing: 'border-box',
  },
})

const useStyles = makeStyles(styles)

const NoOptionsMessage = props => (
  <Typography
    color="textSecondary"
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
    label={props.children}
    className={classNames(props.selectProps.classes.chip, {
      [props.selectProps.classes.chipFocused]: props.isFocused,
    })}
    onDelete={props.removeProps.onClick}
    deleteIcon={<CancelIcon {...props.removeProps} />}
  />
)

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />
}

function Control(props) {
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
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
    />
  )
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  )
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  )
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  )
}

function Menu(props) {
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

function IndicatorSeparator(props) {
  return <span className={props.selectProps.classes.separator}></span>
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
  ValueContainer,
}

const IntegrationReactSelectCreatable = ({
  isMulti,
  options,
  loadOptions,
  onChange,
  value,
  label,
  placeholder,
  autoFocus,
  textFieldProps,
  disabled,
  onCreateOption,
  defaultOptions,
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const selectStyles = {
    input: base => ({
      ...base,
      color: theme.palette.text.primary,
      '& input': {
        font: 'inherit',
      },
    }),
  }

  const AutocompleteComponent = loadOptions ? Async : Select

  const createOption = (newValue) => {
    onCreateOption && onCreateOption(newValue)
    const option = {label: newValue, value: newValue}
    if (isMulti) {
      onChange([...value, option])
    } else {
      onChange(option)
    }
  }

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
          onCreateOption={(value) => createOption(value)}
          isDisabled={disabled || false}
          loadingMessage={() => "Carregando..."}
          noOptionsMessage={() => "Sem opções"}
          formatCreateLabel={(value) => `Adicionar "${value}"`}
        />
      </NoSsr>
    </div>
  )
}

IntegrationReactSelectCreatable.defaultProps = {
  placeholder: '',
  textFieldProps: {},
  defaultOptions: true,
}

IntegrationReactSelectCreatable.propTypes = {
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
  onCreateOption: PropTypes.func,
  defaultOptions: PropTypes.bool,
}

export default IntegrationReactSelectCreatable
