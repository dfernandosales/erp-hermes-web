import React from 'react'
import { Grid } from '@material-ui/core'
import { Field } from 'react-final-form'
import { DatePicker } from '../../Components'
import { CrudForm } from '../../lib/Components'
import { useEntityManager } from '../../lib/Hooks'
import categoriaQuartoRepository from './reservaRepository'
import * as yup from 'yup'
import yupValidation from '../../lib/yupValidation'

const categoriaQuartoSchema = yup.object().shape({
})

const validate = yupValidation(categoriaQuartoSchema)

const ReservaForm = props => {

  const entityManager = useEntityManager({
    repository: categoriaQuartoRepository,
    path: 'categoria-quarto'
  })

  return (
    <CrudForm
      {...props}
      {...entityManager}
      validate={validate}
      withPaper
    >
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <Field
            fullWidth
            name='dataInicioReserva'
            label='Data Checkin'
            component={DatePicker}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            fullWidth
            name='dataFimReserva'
            label='Data Checkout'
            component={DatePicker}
          />
        </Grid>
      </Grid>
    </CrudForm>
  )
}

export default ReservaForm
