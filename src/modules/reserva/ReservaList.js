import React from 'react'
import { useHistory } from 'react-router'
import { TextField } from '../../lib/Fields'
import { DatePicker } from '../../Components'
import { List, Filter } from '../../lib/Components'
import { useListRepository, useFilter } from '../../lib/Hooks'
import reservaRepository from './reservaRepository'
import { Field } from 'react-final-form'
import Grid from '@material-ui/core/Grid'

const ReservaFilter = () => {
  const filter = useFilter({})
  return (
    <Filter {...filter} labels={{ find: 'Buscar', clear: 'Limpar' }}>
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <Field
            fullWidth
            name='dataInicioReserva'
            label='Checkin'
            component={DatePicker}
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
      status:{
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