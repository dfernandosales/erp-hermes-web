import React from 'react'
import { TextField, Select } from '../../lib/Fields'
import { List, Filter } from '../../lib/Components'
import { useFilter, useListRepository } from '../../lib/Hooks'
import { Field } from 'react-final-form'
import Grid from '@material-ui/core/Grid'
import quartoRepository from './quartoRepository'
import CategoriaQuartoAutocomplete from '../categoria-quarto/CategoriaQuartoAutoComplete'
import { InputLabel } from '@material-ui/core'

export const VACANCIA = [
  { label: 'Vago', value: true },
  { label: 'Ocupado', value: false }
]

const QuartoFilter = () => {
  const filter = useFilter({})
  return (
    <Filter {...filter} labels={{ find: 'Buscar', clear: 'Limpar' }}>
      <Grid container spacing={3}>
        <Grid item sm={4} xs={12}>
          <Field
            name='numero'
            label='Número'
            fullWidth
            component={TextField}
            type="number" />
        </Grid>
        <Grid item sm={4} xs={12}>
          <Field
            name='categoria'
            label='Categoria'
            fullWidth
            component={CategoriaQuartoAutocomplete} />
        </Grid>
        <Grid item sm={4} xs={12}>
          <Field
              fullWidth
              name='vacancia'
              label='Vacancia'
              component={Select}
              options={VACANCIA}
              hideEmpty
            />
        </Grid>
      </Grid>
    </Filter>
  )
}

const QuartoList = ({ ...props }) => {
  const listOptions = {
    fields: {
      numero: {
        label: 'Número'
      },
      vacancia: {
        label: 'Vacância',
        format: vacancia => vacancia ? 'Vago' : 'Ocupado'
      },
      categoriaQuarto: {
        label: 'Categoria',
        format: categoriaQuarto => categoriaQuarto.nome
      }
    }
  }

  const listHook = useListRepository({
    repository: quartoRepository,
    defaultSort: 'numero',
    path: 'quarto'
  })

  console.log(listHook.state)
  return (
    <>
      <QuartoFilter />
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

export default QuartoList