import React, { useState } from 'react'
import { Button, Grid, makeStyles, Modal, Typography } from '@material-ui/core'
import { Field } from 'react-final-form'
import { CrudForm } from '../../lib/Components'
import { Select, TextField } from '../../lib/Fields'
import { useEntityManager } from '../../lib/Hooks'
import usuariosRepository from './usuariosRepository'
import { ROLES } from './UsuariosList'
import { useAbility } from '.'
import { Email } from '../../Components'
import * as yup from 'yup'
import yupValidation from '../../lib/yupValidation'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import FuncionarioAutoComplete from '../funcionario/FuncionarioAutoComplete'

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

const usuarioSchema = yup.object().shape({
  email: yup
    .string()
    .email('Email Inválido')
    .matches('@hermes.com.br', 'O email deve ser do formato nome_funcionario@hermes.com.br.')
    .required('Obrigatório'),
  name: yup.string().required('Obrigatório'),
  role: yup.string().required('Obrigatório'),
  password: yup
    .string()
    .notRequired()
    .when('isNew', (isNew, passwordSchema) =>
      isNew ? passwordSchema.required('Obrigatório') : passwordSchema
    )
})

const validate = yupValidation(usuarioSchema)

const UsuarioForm = props => {
  const [open, setOpen] = useState(false)
  const abilities = useAbility()
  const classes = useStyles()

  const entityManager = useEntityManager({
    repository: usuariosRepository
  })
  const cannotUpdate =
    abilities.cannot('update', 'usuarios') && !entityManager.isNew

  const renderContent = () => {
    return (
      <Typography className={classes.paddingAll}>
        <li>
          Esse formulario eh resposavel por criar um usario que tera acesso ao sistema.
        </li>
        <li>
          Lembre-se de escolher corretamente o cargo do usuario.
        </li>
        <li>
          A senha tem um formato padrao para todo usuario (primeiros 3 digitos do cpf+nome) . 
        </li>
      </Typography>
    )
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <Grid className={classes.container}> 
      <CrudForm
        {...props}
        {...entityManager}
        validate={validate}
        disableSubmit={cannotUpdate}
        withPaper
      >
        <Grid container spacing={2}>
          <Grid item sm={12} xs={12} >
            <Grid container sm={12} xs={12} justify='space-between'>
            <Typography variant="h6">
                Cadastro de usuarios
              </Typography>
              <Button onClick={() => handleOpen()}><HelpOutlineIcon /></Button>
            </Grid>
          </Grid>
          <Grid item sm={12} xs={12}>
            <Field fullWidth name='name' label='Nome' component={TextField} />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Email />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Field
              type='password'
              fullWidth
              name='password'
              label='Senha'
              hideEmpty
              component={TextField}
            />
          </Grid>
          <Grid item sm={6} xs={12}>
            <Field
              fullWidth
              name='role'
              label='Cargo'
              component={Select}
              options={ROLES}
              hideEmpty
            />
          </Grid>
          <Grid item sm={6} xs={12}>
          <Field
            fullWidth
            name='funcionarioId'
            label='Funcionario'
            component={FuncionarioAutoComplete}
            hideEmpty
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

export default UsuarioForm
