import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { Field } from 'react-final-form'
import { CrudForm } from '../../lib/Components'
import { TextField } from '../../lib/Fields'
import { useEntityManager } from '../../lib/Hooks'
import quartoRepository from './quartoRepository'
import * as yup from 'yup'
import yupValidation from '../../lib/yupValidation'
import CategoriaQuartoAutocomplete from '../categoria-quarto/CategoriaQuartoAutoComplete'

const useStyles = makeStyles(theme => ({
    container: {
        '@media (min-height:800px)': {
            marginTop: theme.spacing(3)
        }
    }
}))

const quartoSchema = yup.object().shape({
    categoriaQuartoId: yup.number().required('Obrigatório'),
})

const validate = yupValidation(quartoSchema)

const QuartoForm = props => {
    const entityManager = useEntityManager({
        repository: quartoRepository,
        path: 'quarto'
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
                        name='numero'
                        type="number"
                        label='Número Quarto'
                        component={TextField}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Field
                        label="Categoria do Quarto"
                        name="categoriaQuartoId"
                        fullWidth
                        component={CategoriaQuartoAutocomplete}
                    />
                </Grid>
            </Grid>
        </CrudForm>
    )
}

export default QuartoForm
