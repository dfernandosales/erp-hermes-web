import React from 'react'
import { DatePicker } from '../../Components'
import { List, Filter } from '../../lib/Components'
import Select from '../../lib/Fields/Select'
import { useListRepository, useFilter } from '../../lib/Hooks'
import reservaRepository from './reservaRepository'
import { Field } from 'react-final-form'
import Grid from '@material-ui/core/Grid'
import { situacaoReserva } from '../../utils/Utils'

const ReservaFilter = () => {
  const filter = useFilter({})
  return (
    <Filter {...filter} labels={{ find: 'Buscar', clear: 'Limpar' }}>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <Field
            fullWidth
            name='dataInicioReserva'
            label='Checkin'
            component={DatePicker}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            fullWidth
            name='status'
            component={Select}
            label='Status'
            options={situacaoReserva}
          />
        </Grid>
      </Grid>
    </Filter>
  )
}
const ReservaList = ({ ...props }) => {

  const listOptions = {
    fields: {
      id: {
        label: 'Numero da Reserva'
      },
      dataInicioReserva: {
        label: 'Checkin'
      },
      dataFimReserva: {
        label: 'Checkout',
        format: dataFimReserva => dataFimReserva ? dataFimReserva : "-"
      },
      status: {
        label: "Status da Reserva",
      }
    }
  }

  const listHook = useListRepository({
    repository: reservaRepository,
    path: 'reserva',
  })

  return (
    <>
      <ReservaFilter />
      <List
        {...props}
        {...listHook}
        removeItem={null}
        hideDownloadIcon
        listOptions={listOptions}
      />
    </>
  )
}

export default ReservaList