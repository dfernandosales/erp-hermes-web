import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function AlertDialog ({
  title = 'Atenção!',
  open = false,
  handleClose,
  message = 'Este é um alerta! Faça alguma coisa',
  closeButtonText = 'Cancelar',
  primaryButtonText = 'Confirmar',
  primaryAction
}) {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color='primary'>
          {closeButtonText}
        </Button>
        <Button onClick={primaryAction} color='primary' autoFocus>
          {primaryButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
