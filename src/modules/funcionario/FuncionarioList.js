import React from 'react'
import { MaskedField, TextField } from '../../lib/Fields'
import { List, Filter } from '../../lib/Components'
import { useFilter, useListRepository } from '../../lib/Hooks'
import { Field } from 'react-final-form'
import Grid from '@material-ui/core/Grid'
import funcionarioRepository from './funcionarioRepository'
import { formatCpf } from '../../utils/Utils'
import { Typography } from "@material-ui/core";
import { cpfRegex } from '../../utils/regex'

export const SEXOS = [
  { label: 'Masculino', value: 'MASCULINO' },
  { label: 'Feminino', value: 'FEMININO' },
  { label: 'Outros', value: 'OUTROS' }
]

export const ESTCIVIL = [
  { label: 'Casado', value: 'CASADO' },
  { label: 'Solteiro', value: 'SOLTEIRO' },
  { label: 'Viúvo', value: 'VIUVO' },
  { label: 'Divorciado', value: 'DIVORCIADO' }
]

export const TURNOS = [
  { label: 'Diurno', value: 'DIA'},
  { label: 'Noturno', value: 'NOITE'},
]

const FuncionarioFilter = () => {
  const filter = useFilter({})
  return (
    <Filter {...filter} labels={{ find: 'Buscar', clear: 'Limpar' }}>
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <Field name='nomeCompleto' label='Nome Completo' fullWidth component={TextField} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <Field name='cpf' label='CPF' fullWidth component={MaskedField} mask={cpfRegex}/>
        </Grid>
      </Grid>
    </Filter>
  )
}

const FuncionarioList = ({ ...props }) => {
  const listOptions = {
    fields: {
      nomeCompleto: {
        label: 'Nome Completo'
      },
      cpf: {
        label: 'CPF',
        format: cpf => formatCpf(cpf)
      },
      telefone: {
        label: 'Telefone'
      },
      email: {
        label: 'E-mail',
      },
    }
  }

  const listHook = useListRepository({
    repository: funcionarioRepository,
    defaultSort: 'nomeCompleto',
    path: 'funcionario'
  })

  return (
    <>
      <FuncionarioFilter />
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Typography variant="h6" color="textPrimary">
            Lista de Funcionários
          </Typography>
        </Grid>
      </Grid>
      <List
        {...props}
        {...listHook}
        onClickView={null}
        hideDownloadIcon
        listOptions={listOptions}
      />
    </>
  )
}

export default FuncionarioList 