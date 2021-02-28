import React from 'react'
import { TextField } from '../../lib/Fields'
import { List, Filter } from '../../lib/Components'
import { useFilter, useListRepository } from '../../lib/Hooks'
import { Field } from 'react-final-form'
import Grid from '@material-ui/core/Grid'
import hospedeRepository from './hospedeRepository'

export const SEXOS = [
  { label: 'Masculino', value: 'MASC' },
  { label: 'Femino', value: 'FEM' },
  { label: 'Outros', value: 'OUTROS' }
]

export const ESTCIVIL = [
  { label: 'Casado', value: 'CAS' },
  { label: 'Solteiro', value: 'SOL' },
  { label: 'Viúvo', value: 'VIUVO' },
  { label: 'Divorciado', value: 'DIV' }
]

const HospedeFilter = () => {
  const filter = useFilter({})
  return (
    <Filter {...filter} labels={{ find: 'Buscar', clear: 'Limpar' }}>
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <Field name='nomeCompleto' label='Nome Completo' fullWidth component={TextField} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <Field name='cpf' label='CPF' fullWidth component={TextField} />
        </Grid>
      </Grid>
    </Filter>
  )
}

const HospedeList = ({ ...props }) => {
  const listOptions = {
    fields: {
      nomeCompleto: {
        label: 'Nome Completo'
      },
      cpf: {
        label: 'CPF',
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
    repository: hospedeRepository,
    defaultSort: 'nomeCompleto',
    path: 'hospede'
  })

  return (
    <>
      <HospedeFilter />
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

export default HospedeList 