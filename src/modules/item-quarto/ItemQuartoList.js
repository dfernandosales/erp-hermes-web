import React from 'react'
import { TextField } from '../../lib/Fields'
import { List, Filter } from '../../lib/Components'
import { useFilter, useListRepository } from '../../lib/Hooks'
import { Field } from 'react-final-form'
import Grid from '@material-ui/core/Grid'
import itemQuartoRepository from './itemQuartoRepository'

const ItemQuartoFilter = () => {
  const filter = useFilter({})
  return (
    <Filter {...filter} labels={{ find: 'Buscar', clear: 'Limpar' }}>
      <Grid container spacing={3}>
        <Grid item sm={12} xs={12}>
          <Field
            name='nome'
            label='Nome do item'
            fullWidth
            component={TextField} />
        </Grid>
      </Grid>
    </Filter>
  )
}

const ItemQuartoList = ({ ...props }) => {
  const listOptions = {
    fields: {
      nome: {
        label: 'Nome do item'
      },
    }
  }

  const listHook = useListRepository({
    repository: itemQuartoRepository,
    defaultSort: 'nome',
    path: 'item-quarto'
  })

  return (
    <>
      <ItemQuartoFilter />
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

export default ItemQuartoList