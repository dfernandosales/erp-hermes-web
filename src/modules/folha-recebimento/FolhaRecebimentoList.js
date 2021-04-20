import React from 'react'
import { MaskedField, TextField } from '../../lib/Fields'
import { List, Filter } from '../../lib/Components'
import { useFilter, useListRepository } from '../../lib/Hooks'
import { Field } from 'react-final-form'
import Grid from '@material-ui/core/Grid'
import folhaRecebimentoRepository from './folhaRecebimentoRepository'
import { formatMoney } from '../../utils/Utils'
import { DatePicker } from '../../Components'

const FolhaRecebimentoFilter = () => {
    const filter = useFilter({})
    return (
      <Filter {...filter} labels={{ find: 'Buscar', clear: 'Limpar' }}>
        <Grid container spacing={2}>
          <Grid item sm={8} xs={12}>
            <Field name='descricao' label='Descricao' fullWidth component={TextField} />
          </Grid>
          <Grid item sm={4} xs={12}>
            <Field name='dataRecebimento' label='Data do Recebimento' fullWidth component={DatePicker}/>
          </Grid>
        </Grid>
      </Filter>
    )
  }
  
  const FolhaRecebimentoList = ({ ...props }) => {
    const listOptions = {
      fields: {
        dataRecebimento: {
          label: 'Data do Recebimento',
        },
        descricao: {
          label: 'Descricao'
        },
        valor: {
          label: 'Valor',
          format: valor => formatMoney(valor)
        },
      }
    }
  
    const listHook = useListRepository({
      repository: folhaRecebimentoRepository,
      defaultSort: 'dataRecebimento',
      path: 'folhaRecebimento'
    })
  
    return (
      <>
        <FolhaRecebimentoFilter />
        <List
          {...props}
          {...listHook}
          onClickView={null}
          listOptions={listOptions}
        />
      </>
    )
  }
  
  export default FolhaRecebimentoList 