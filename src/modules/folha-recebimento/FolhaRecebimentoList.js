import React from 'react'
import { MaskedField, TextField } from '../../lib/Fields'
import { List, Filter } from '../../lib/Components'
import { useFilter, useListRepository } from '../../lib/Hooks'
import { Field } from 'react-final-form'
import Grid from '@material-ui/core/Grid'
import folhaRecebimentoRepository from './folhaRecebimentoRepository'

const FolhaRecebimentoFilter = () => {
    const filter = useFilter({})
    return (
      <Filter {...filter} labels={{ find: 'Buscar', clear: 'Limpar' }}>
        <Grid container spacing={2}>
          <Grid item sm={4} xs={12}>
            <Field name='nomeCompleto' label='Nome Completo' fullWidth component={TextField} />
          </Grid>
          <Grid item sm={4} xs={12}>
            <Field name='cpf' label='CPF' fullWidth component={TextField}/>
          </Grid>
        </Grid>
      </Filter>
    )
  }
  
  const FolhaRecebimentoList = ({ ...props }) => {
    const listOptions = {
      fields: {
        nomeCompleto: {
          label: 'Nome Completo'
        },
        cpf: {
          label: 'CPF',
        },
      }
    }
  
    const listHook = useListRepository({
      repository: folhaRecebimentoRepository,
      defaultSort: 'nomeCompleto',
      path: 'folhaRecebimento'
    })
  
    return (
      <>
        <FolhaRecebimentoFilter />
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
  
  export default FolhaRecebimentoList 