import React from 'react'
import { Grid } from '@material-ui/core'
import { Field } from 'react-final-form'
import { CrudForm } from '../../lib/Components'
import { TextField } from '../../lib/Fields'
import { useEntityManager } from '../../lib/Hooks'
import categoriaitemQuartoRepository from './categoriaitemQuartoRepository'
import * as yup from 'yup'
import yupValidation from '../../lib/yupValidation'

const quartoSchema = yup.object().shape({
    nome: yup.string().required("Obrigatório"),
})

const validate = yupValidation(quartoSchema)

const CategoriaItemQuartoForm = props => {

    const entityManager = useEntityManager({
        repository: categoriaitemQuartoRepository,
    })

    return (
        <CrudForm
            {...props}
            {...entityManager}
            validate={validate}
            withPaper
        >
            <Grid container spacing={2}>
                <Grid item sm={12} xs={12}>
                    <Field
                        fullWidth
                        name='nome'
                        label='Nome do item'
                        component={TextField}
                    />
                </Grid>
            </Grid>
        </CrudForm>
    )
}

export default CategoriaItemQuartoForm
