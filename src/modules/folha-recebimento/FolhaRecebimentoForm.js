import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { Field } from 'react-final-form'
import { CrudForm } from '../../lib/Components'
import { MaskedField, Select, TextField } from '../../lib/Fields'
import { DatePicker } from '../../Components'
import { useEntityManager } from '../../lib/Hooks'
import folhaRecebimentoRepository from './folhaRecebimentoRepository'
import * as yup from 'yup'
import yupValidation from '../../lib/yupValidation'
import { valRegex } from '../../utils/regex'

const useStyles = makeStyles(theme => ({
  container: {
    '@media (min-height:800px)': {
      marginTop: theme.spacing(3)
    }
  }
}))

const folhaRecebimentoSchema = yup.object().shape({
  descricao: yup.string().required('Obrigatório'),
  dataRecebimento: yup.string().required('Obrigatório'),
  valor: yup.string().required('Obrigatório'),
})

const validate = yupValidation(folhaRecebimentoSchema)

const FolhaRecebimentoForm = props => {
  const classes = useStyles()

  const entityManager = useEntityManager({
    repository: folhaRecebimentoRepository,
    path: 'folhaRecebimento'
  })

  return (
    <CrudForm
      {...props}
      {...entityManager}
      validate={validate}
      withPaper
    >
      <Grid container spacing={2}>
        <Grid item sm={12}>
          <Typography variant="h6" color="textPrimary">Cadastro de Folha de Recebimento</Typography>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <Field 
            fullWidth name='descricao' 
            label='Descrição' 
            component={TextField}
          />
        </Grid>
        <Grid item sm={3} xs={12}>
          <Field 
            fullWidth name='dataRecebimento' 
            label='Data' 
            component={DatePicker}
          />
        </Grid>
        <Grid item sm={3} xs={12}>
          <Field 
            fullWidth name='valor' 
            label='Valor' 
            component={TextField}
          />
        </Grid>
      </Grid>
    </CrudForm>
  )
}

export default FolhaRecebimentoForm