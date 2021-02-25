import React from 'react'
import { TextField } from '../../lib/Fields'
import { List, Filter } from '../../lib/Components'
import { useFilter, useListRepository } from '../../lib/Hooks'
import { Field } from 'react-final-form'
import Grid from '@material-ui/core/Grid'
import categoriaQuartoRepository from './categoriaQuartoRepository'
import { formatMoney } from '../../utils/Utils'

const CategoriaQuartoFilter = () => {
  const filter = useFilter({})
  return (
    <Filter {...filter} labels={{ find: 'Buscar', clear: 'Limpar' }}>
      <Grid container spacing={3}>
        <Grid item sm={4} xs={12}>
          <Field name='nome' label='Nome' fullWidth component={TextField} />
        </Grid>
      </Grid>
    </Filter>
  )
}

const CategoriaQuartoList = ({ ...props }) => {
  const listOptions = {
    fields: {
      nome: {
        label: 'Nome Categoria'
      },
      valor: {
        label: 'Valor Categoria',
        format: (valor) => formatMoney(valor),
      },
    }
  }

  const listHook = useListRepository({
    repository: categoriaQuartoRepository,
    defaultSort: 'nome',
    path: 'categoria-quarto'
  })

  return (
    <>
      <CategoriaQuartoFilter />
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

export default CategoriaQuartoList