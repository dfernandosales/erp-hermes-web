import React from 'react'
import { DatePicker } from '../../Components'
import { List, Filter } from '../../lib/Components'
import { useFilter, useListRepository } from '../../lib/Hooks'
import { Field } from 'react-final-form'
import Grid from '@material-ui/core/Grid'
import pagamentoRepository from './pagamentoRepository'
import { formatMoney } from '../../utils/Utils'
import { TextField } from '@material-ui/core'

const PagamentoFilter = () => {
  const filter = useFilter({})
  return (
    <Filter {...filter} labels={{ find: 'Buscar', clear: 'Limpar' }}>
      <Grid container spacing={3}>
        <Grid item sm={4} xs={12}>
          <Field
            fullWidth
            name='dataPagamento'
            label='Data do Pagamento'
            component={DatePicker}/>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Field
              fullWidth
              name='descricao'
              label='Descrição'
              component={TextField}
            />
        </Grid>
      </Grid>
    </Filter>
  )
}

const PagamentoList = ({ ...props }) => {
  const listOptions = {
    fields: {
      dataPagamento: {
        label: 'Data Pagamento'
      },
      descricao: {
        label: 'Descrição',
      },
      valor: {
        label: 'Valor',
        format: valor => formatMoney(valor),
      }
    }
  }

  const listHook = useListRepository({
    repository: pagamentoRepository,
    defaultSort: 'dataPagamento',
    path: 'pagamento'
  })

  return (
    <>
      <PagamentoFilter />
      <List
        {...props}
        {...listHook}
        onClickView={null}
        listOptions={listOptions}
      />
    </>
  )
}

export default PagamentoList