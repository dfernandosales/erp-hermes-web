import React from 'react'
import { Grid } from '@material-ui/core'
import { Field } from 'react-final-form'
import { CrudForm } from '../../lib/Components'
import { TextField } from '../../lib/Fields'
import { useEntityManager } from '../../lib/Hooks'
import cargoRepository from './cargoRepository'
import * as yup from 'yup'
import yupValidation from '../../lib/yupValidation'

const quartoSchema = yup.object().shape({
    nomeCargo: yup.string().required('O nome do cargo é obrigatório'),
    salario: yup.number().moreThan(0).required('O salário do cargo é obrigatório'),
})

const validate = yupValidation(quartoSchema)

const CargoForm = props => {

    const entityManager = useEntityManager({
        repository: cargoRepository,
        path: 'cargo'
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
                        name='nomeCargo'
                        label='Nome do cargo'
                        component={TextField}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Field
                        fullWidth
                        name='salario'
                        label='Salário do cargo'
                        component={TextField}
                        type='numeric'
                    />
                </Grid>
            </Grid>
        </CrudForm>
    )
}

export default CargoForm
