import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { Field } from 'react-final-form'
import { CrudForm } from '../../lib/Components'
import { MaskedField, Select, TextField } from '../../lib/Fields'
import { DatePicker } from '../../Components'
import { useEntityManager } from '../../lib/Hooks'
import funcionarioRepository from './funcionarioRepository'
import * as yup from 'yup'
import yupValidation from '../../lib/yupValidation'
import { SEXOS, ESTCIVIL, TURNOS } from './FuncionarioList'
import EstadoAutocomplete from '../estado/EstadoAutoComplete'
import { cpfRegex, telRegex } from '../../utils/regex'

const useStyles = makeStyles(theme => ({
  container: {
    '@media (min-height:800px)': {
      marginTop: theme.spacing(3)
    }
  }
}))

const funcionarioSchema = yup.object().shape({
  nomeCompleto: yup.string().required('Obrigatório'),
  cpf: yup.string().required('Obrigatório'),
  email: yup.string().required('Obrigatório'),
  dataNascimento: yup.string().required('Obrigatório'),
  sexo: yup.string().required('Obrigatório'),
  estadoCivil: yup.string().required('Obrigatório'),
  cargo: yup.string().required('Obrigatório'),
  telefone: yup.string().required('Obrigatório'),
  turnoTrabalho: yup.string().required('Obrigatório'),
  rua: yup.string().required('Obrigatório'),
  bairro: yup.string().required('Obrigatório'),
  numEndereco: yup.string().required('Obrigatório'),
  cep: yup.string().required('Obrigatório'),
  cidade: yup.string().required('Obrigatório'),
  estado: yup.string().required('Obrigatório'),
})

const validate = yupValidation(funcionarioSchema)

const FuncionarioForm = props => {
  const classes = useStyles()

  const entityManager = useEntityManager({
    repository: funcionarioRepository,
    path: 'funcionario'
  })

  return (
    <CrudForm
      {...props}
      {...entityManager}
      validate={validate}
      withPaper
    >
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Typography variant="h6" color="textPrimary">Cadastro de Funcionário</Typography>
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
            fullWidth name='cargo' 
            label='Cargo' 
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
        <Grid item sm={4} xs={12}>
          <Field
            fullWidth
            name='turnoTrabalho'
            label='Turno de Trabalho'
            component={Select}
            options={TURNOS}
            hideEmpty
          />
        </Grid>
        <Grid item sm={4} xs={12}>
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
  )
}

export default FuncionarioForm