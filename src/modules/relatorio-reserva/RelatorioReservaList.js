import React from 'react'
import { DatePicker } from '../../Components'
import { List, Filter } from '../../lib/Components'
import { useListRepository, useFilter } from '../../lib/Hooks'
import { Field } from 'react-final-form'
import Grid from '@material-ui/core/Grid'
import relatorioReservaRepository from './relatorioReservaRepository'

const RelatorioReservaFilter = () => {
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
            name='dataFimReserva'
            label='Checkout'
            component={DatePicker}
          />
        </Grid>
      </Grid>
    </Filter>
  )
}

const RelatorioReservaList = ({ ...props }) => {

  const listOptions = {
    fields: {
      dataInicioReserva: {
        label: "Data Checkin"
      },
      dataFimReserva: {
        label: "Data Checkout"
      },
      valorReserva: {
        label: "Valor da Reserva"
      },
      user: {
        label: "Responsável",
        format: user => user.email
      },
    }
  }

  const listHook = useListRepository({
    repository: relatorioReservaRepository,
  })

  return (
    <>
      <RelatorioReservaFilter />
      <List
        {...props}
        {...listHook}
        removeItem={null}
        onClickEdit={null}
        onClickNew={null}
        onClickView={null}
        listOptions={listOptions}
      />
    </>
  )
}

export default RelatorioReservaList