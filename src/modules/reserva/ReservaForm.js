import React, { useState } from 'react'
import { Button, Grid, makeStyles, Modal, Typography } from '@material-ui/core'
import { Field } from 'react-final-form'
import { DatePicker } from '../../Components'
import { CrudForm } from '../../lib/Components'
import { useEntityManager } from '../../lib/Hooks'
import categoriaQuartoRepository from './reservaRepository'
import * as yup from 'yup'
import yupValidation from '../../lib/yupValidation'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles(theme => ({
  container: {
    '@media (min-height:800px)': {
      marginTop: theme.spacing(3)
    }
  },
  textoHistorico: {
    marginRight: 8,
  },
  negrito: {
    fontWeight: "bold",
  },
  paddingAll: {
    padding: "5px"
  },
  status: {
    paddingLeft: "10px"
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    position: 'absolute',
    width: 800,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}))


const categoriaQuartoSchema = yup.object().shape({
  dataInicioReserva: yup.date().required("Obrigatoria"),
  dataFimReserva: yup.date().nullable().when("dataInicioReserva",
    (dataInicioReserva, yup) => dataInicioReserva && yup.min(dataInicioReserva, "A data final deve ser maior que a data inicial."))

})

const validate = yupValidation(categoriaQuartoSchema)

const ReservaForm = props => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const renderContent = () => {
    return (
      <Typography className={classes.paddingAll}>
        <li>
          Esse formulario é resposavel por criar uma reserva.
        </li>
        <li>
          Por favor digite uma data de Check-in. A data de Check-out nao eh obrigatoria.
        </li>
      </Typography>
    )
  }

  const entityManager = useEntityManager({
    repository: categoriaQuartoRepository,
    path: 'categoria-quarto'
  })

  return (
    <Grid className={classes.container}>
      <CrudForm
        {...props}
        {...entityManager}
        validate={validate}
        withPaper
      >
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12} >
            <Grid container sm={12} xs={12} justify='space-between'>
              <Typography variant="h6">
                Reserva
              </Typography>
              <Button onClick={() => handleOpen()}><HelpOutlineIcon /></Button>
            </Grid>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Field
              fullWidth
              name='dataInicioReserva'
              label='Data Checkin'
              component={DatePicker}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Field
              fullWidth
              name='dataFimReserva'
              label='Data Checkout'
              component={DatePicker}
            />
          </Grid>
        </Grid>
      </CrudForm>
      <Modal
        className={classes.modal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        open={open}
        onClose={handleClose}
        fullWidth={true}
      >
        <div className={classes.paper}>
          <h2 >Ajuda</h2>
          {renderContent()}
        </div>
      </Modal>
    </Grid>
  )
}

export default ReservaForm
