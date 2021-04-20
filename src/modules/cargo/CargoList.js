import React from 'react'
import { TextField } from '../../lib/Fields'
import { List, Filter } from '../../lib/Components'
import { useFilter, useListRepository } from '../../lib/Hooks'
import { Field } from 'react-final-form'
import Grid from '@material-ui/core/Grid'
import cargoRepository from './cargoRepository'
import { formatMoney } from '../../utils/Utils'

const CargoFilter = () => {
  const filter = useFilter({})
  return (
    <Filter {...filter} labels={{ find: 'Buscar', clear: 'Limpar' }}>
      <Grid container spacing={3}>
        <Grid item sm={4} xs={12}>
          <Field
            name='nomeCargo'
            label='Nome do cargo'
            fullWidth
            component={TextField} />
        </Grid>
      </Grid>
    </Filter>
  )
}

const CargoList = ({ ...props }) => {
  const listOptions = {
    fields: {
      nomeCargo: {
        label: 'Nome do cargo'
      },
      salario: {
        label: 'Salario',
        format: (salario) => formatMoney(salario),
      }
    }
  }

  const listHook = useListRepository({
    repository: cargoRepository,
    defaultSort: 'nomeCargo',
    path: 'cargo'
  })

  return (
    <>
      <CargoFilter />
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

export default CargoList