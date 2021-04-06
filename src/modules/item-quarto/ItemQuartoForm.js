import React, { useState } from 'react'
import { Button, Grid, makeStyles, Modal, Typography } from '@material-ui/core'
import { Field } from 'react-final-form'
import { CrudForm } from '../../lib/Components'
import { TextField } from '../../lib/Fields'
import { useEntityManager } from '../../lib/Hooks'
import quartoRepository from './itemQuartoRepository'
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


const quartoSchema = yup.object().shape({
  nome: yup.string().required("Obrigatório"),
})

const validate = yupValidation(quartoSchema)

const ItemQuartoForm = props => {
  const classes = useStyles()
  const [open, setOpen] = useState(false)
  const entityManager = useEntityManager({
    repository: quartoRepository,
    path: 'quarto'
  })
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
          Esse formulario é resposavel por criar um item que existira no quarto do hotel.
                </li>
        <li>
          Digite o nome do item corretamente.
                </li>
      </Typography>
    )
  }
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
                Cadastro item de quarto
              </Typography>
              <Button onClick={() => handleOpen()}><HelpOutlineIcon /></Button>
            </Grid>
          </Grid>
          <Grid item sm={12} xs={12}>
            <Field
              fullWidth
              name='nome'
              label='Nome do item'
              component={TextField}
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

export default ItemQuartoForm
