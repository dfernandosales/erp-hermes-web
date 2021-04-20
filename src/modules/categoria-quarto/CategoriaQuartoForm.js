import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { Field } from 'react-final-form'
import { CrudForm } from '../../lib/Components'
import { TextField } from '../../lib/Fields'
import { useEntityManager } from '../../lib/Hooks'
import categoriaQuartoRepository from './categoriaQuartoRepository'
import * as yup from 'yup'
import yupValidation from '../../lib/yupValidation'

const useStyles = makeStyles(theme => ({
  container: {
    '@media (min-height:800px)': {
      marginTop: theme.spacing(3)
    }
  }
}))

const categoriaQuartoSchema = yup.object().shape({
  nome: yup.string().required('Obrigatório'),
  valor: yup.number().positive('O valor da categoria de quarto deve ser positivo').required('Obrigatório'),
})

const validate = yupValidation(categoriaQuartoSchema)

const CategoriaQuartoForm = props => {
  const classes = useStyles()

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
            fullWidth name='nome'
            label='Nome Categoria'
            component={TextField}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Field
            fullWidth
            name='valor'
            type='numeric'
            label='Valor da Categoria'
            component={TextField}
          />
        </Grid>
      </Grid>
    </CrudForm>
  )
}

export default CategoriaQuartoForm
