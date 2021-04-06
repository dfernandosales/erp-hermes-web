import React from 'react'
import { TextField } from '../../lib/Fields'
import { List, Filter } from '../../lib/Components'
import { useFilter, useListRepository } from '../../lib/Hooks'
import { Field } from 'react-final-form'
import Grid from '@material-ui/core/Grid'
import folhaPagamentoFuncionarioRepository from './folhaPagamentoFuncionarioRepository'
import { formatMoney } from '../../utils/Utils'
import CargoAutocomplete from '../cargo/CargoAutoComplete'

const FolhaPagamentoFuncionarioFilter = () => {
  const filter = useFilter({})
  return (
    <Filter {...filter} labels={{ find: 'Buscar', clear: 'Limpar' }}>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <Field name='nomeCompleto' label='Nome Completo' fullWidth component={TextField} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field name='cargoId' label='Cargo' fullWidth component={CargoAutocomplete}/>
        </Grid>
      </Grid>
    </Filter>
  )
}

const FolhaPagamentoFuncionarioList = ({ ...props }) => {
  const listOptions = {
    fields: {
      nomeCompleto: {
        label: 'Nome Completo'
      },
      cargoNome: {
        label: 'Cargo',
      },
      cargoSalario: {
        label: 'Salário',
        format: (cargoSalario) => formatMoney(cargoSalario),
      },
    }
  }

  const listHook = useListRepository({
    repository: folhaPagamentoFuncionarioRepository,
    defaultSort: 'nomeCompleto',
    path: 'funcionario'
  })

  if(!listHook.state.loading){
    listHook.state.list = listHook.state.list.map(
      (item) => {return {
        ...item,
        cargoNome: item.cargo.nomeCargo,
        cargoSalario: item.cargo.salario
      }}
    )
  }
  
  return (
    <>
      <FolhaPagamentoFuncionarioFilter />
      <List
        {...props}
        {...listHook}
        onClickView={null}
        onClickNew={null}
        onClickEdit={null}
        onClickRow={null}
        removeItem={null}
        listOptions={listOptions}
      />
    </>
  )
}

export default FolhaPagamentoFuncionarioList 