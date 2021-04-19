import React from 'react'
import { DatePicker } from '../../Components'
import { List, Filter } from '../../lib/Components'
import Select from '../../lib/Fields/Select'
import { useListRepository, useFilter } from '../../lib/Hooks'
import relatorioHospedeRepository from './relatorioHospedeRepository'
import { Field } from 'react-final-form'
import Grid from '@material-ui/core/Grid'

const RelatorioHospedeFilter = () => {
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

const RelatorioHospedeList = ({ ...props }) => {

  const listOptions = {
    fields: {
      nomeCompleto: {
        label: "Nome Completo",
      },
      cpf: {
        label: "CPF",
      },
      telefone: {
        label: "Telefone",
      },
      email: {
        label: "E-mail",
      },
    }
  }

  const listHook = useListRepository({
    repository: relatorioHospedeRepository,
    path: 'relatorio-hospede',
  })

  console.log(listHook.state.list)

  return (
    <>
      <RelatorioHospedeFilter />
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

export default RelatorioHospedeList