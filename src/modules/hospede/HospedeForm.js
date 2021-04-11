import React, { useState } from 'react'
import { Button, Grid, makeStyles, Modal, Typography } from '@material-ui/core'
import { Field } from 'react-final-form'
import { CrudForm } from '../../lib/Components'
import { MaskedField, Select, TextField } from '../../lib/Fields'
import { DatePicker } from '../../Components'
import { useEntityManager } from '../../lib/Hooks'
import hospedeRepository from './hospedeRepository'
import * as yup from 'yup'
import yupValidation from '../../lib/yupValidation'
import { SEXOS, ESTCIVIL } from './HospedeList'
import EstadoAutocomplete from '../estado/EstadoAutoComplete'
import { cpfRegex, telRegex } from '../../utils/regex'
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

const hospedeSchema = yup.object().shape({
  nomeCompleto: yup.string().required('Obrigatório'),
  cpf: yup.string().required('Obrigatório'),
  email: yup.string().required('Obrigatório'),
  dataNascimento: yup.string().required('Obrigatório'),
  sexo: yup.string().required('Obrigatório'),
  estadoCivil: yup.string().required('Obrigatório'),
  profissao: yup.string().required('Obrigatório'),
  telefone: yup.string().required('Obrigatório'),
  rua: yup.string().required('Obrigatório'),
  bairro: yup.string().required('Obrigatório'),
  numEndereco: yup.string().required('Obrigatório'),
  cep: yup.string().required('Obrigatório'),
  cidade: yup.string().required('Obrigatório'),
  estado: yup.string().required('Obrigatório'),
})

const validate = yupValidation(hospedeSchema)

const HospedeForm = props => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()

  const entityManager = useEntityManager({
    repository: hospedeRepository,
    path: 'hospede'
  })

  const renderContent = () => {
    return (
      <Typography className={classes.paddingAll}>
        <li>
          Esse formulário é resposável por criar um hóspede que tera acesso ao sistema.
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
  <>
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
            Cadastro de usuarios
          </Typography>
          <Button onClick={() => handleOpen()}><HelpOutlineIcon /></Button>
        </Grid>
      </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={8} xs={12}>
          <Field 
            fullWidth name='nomeCompleto' 
            label='Nome Completo' 
            component={TextField} 
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <Field
            fullWidth
            name='email'
            label='E-mail'
            component={TextField}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <Field 
            fullWidth name='cpf' 
            label='CPF' 
            component={MaskedField}
            mask={cpfRegex} 
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <Field
            fullWidth
            name='dataNascimento'
            label='Data de nascimento'
            component={DatePicker}
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <Field
            fullWidth
            name='sexo'
            label='Sexo'
            component={Select}
            options={SEXOS}
            hideEmpty
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <Field
            fullWidth
            name='estadoCivil'
            label='Estado civil'
            component={Select}
            options={ESTCIVIL}
            hideEmpty
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <Field 
            fullWidth name='profissao' 
            label='Profissão' 
            component={TextField} 
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <Field 
            fullWidth name='telefone' 
            label='Telefone' 
            component={MaskedField}
            mask={telRegex} 
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={7} xs={12}>
          <Field
            fullWidth
            name='rua'
            label='Rua'
            component={TextField}
          />
        </Grid>
        <Grid item sm={3} xs={12}>
          <Field
            fullWidth
            name='bairro'
            label='Bairro'
            component={TextField}
          />
        </Grid>
        <Grid item sm={1} xs={12}>
          <Field
            fullWidth
            name='numEndereco'
            label='Número'
            component={TextField}
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <Field
            fullWidth
            name='complemento'
            label='Complemento*'
            component={TextField}
          />
        </Grid>
        <Grid item sm={3} xs={12}>
          <Field
            fullWidth
            name='cep'
            label='CEP'
            component={TextField}
          />
        </Grid>
        <Grid item sm={3} xs={12}>
          <Field
            fullWidth
            name='cidade'
            label='Cidade'
            component={TextField}
          />
        </Grid>
        <Grid item sm={2} xs={12}>
          <Field
            fullWidth
            name='estado'
            label='Estado'
            component={EstadoAutocomplete}
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
  </>
  )
}

export default HospedeForm