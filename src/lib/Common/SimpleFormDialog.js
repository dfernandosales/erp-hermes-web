import React, { useState } from 'react'
import * as R from 'ramda'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'

function TextFieldFormDialog (props) {
  const {
    formLabel = '',
    formValue = '',
    disabled = false,
    onChange = () => R.empty()
  } = props

  return (
    <TextField
      autoFocus
      margin='dense'
      label={formLabel}
      value={formValue}
      onChange={onChange}
      disabled={disabled}
      fullWidth
    />
  )
}

export default function SimpleFormDialog (props) {
  const {
    open = false,
    buttonLabel = 'Ok',
    handleClose = () => R.empty(),
    primaryAction = () => R.empty(),
    primaryActionButtonLabel = '',
    firstFormLabel = '',
    firstDefaultValue = '',
    secondFormLabel = '',
    secondDefaultValue = '',
    title = '',
    disabledText = ''
  } = props

  const disabledPrimaryAction = !R.isNil(disabledText)

  const [formValues, setFormValues] = useState({
    firstTextField: firstDefaultValue,
    secondTextField: secondDefaultValue
  })

  const setValueHook = property => event =>
    setFormValues({
      ...formValues,
      [property]: event.target.value
    })

  const handlePrimaryAction = () => {
    primaryAction(formValues.firstTextField, formValues.secondTextField)
    handleClose()
  }

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='form-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='form-dialog-title'>{title}</DialogTitle>
        <DialogContent>
          <TextFieldFormDialog
            formLabel={firstFormLabel}
            formValue={formValues.firstTextField}
            disabled={disabledPrimaryAction}
            onChange={setValueHook('firstTextField')}
          />
          <TextFieldFormDialog
            formLabel={secondFormLabel}
            formValue={formValues.secondTextField}
            disabled={disabledPrimaryAction}
            onChange={setValueHook('secondTextField')}
          />
          {disabledPrimaryAction ? (
            <DialogContentText id='alert-dialog-description'>
              {disabledText}
            </DialogContentText>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            color={primaryAction ? null : 'primary'}
            autoFocus
          >
            {buttonLabel}
          </Button>
          {primaryAction ? (
            <Button
              onClick={handlePrimaryAction}
              color='primary'
              autoFocus
              disabled={disabledPrimaryAction}
            >
              {primaryActionButtonLabel}
            </Button>
          ) : null}
        </DialogActions>
      </Dialog>
    </div>
  )
}
