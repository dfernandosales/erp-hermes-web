import React from 'react'
import { Grid } from '@material-ui/core'
import { Field } from 'react-final-form'
import { CrudForm } from '../../lib/Components'
import { useEntityManager } from '../../lib/Hooks'
import reservaHospedeRepository from './reservaHospedeRepository'
import * as yup from 'yup'
import yupValidation from '../../lib/yupValidation'
import HospedeAutoComplete from '../hospede/HospedeAutoComplete'

const quartoSchema = yup.object().shape({
    hospedeId : yup.number().required("Obrigatorio")
})

const validate = yupValidation(quartoSchema)

const ReservaHospedeForm = props => {

    const entityManager = useEntityManager({
        repository: reservaHospedeRepository,
        path: 'reserva-hospede'
    })

    const handleSubmit = data => {
        data.reservaId = props.match.params.id;
        return entityManager.onSubmit(data);
    };

    return (
        <CrudForm
            {...props}
            {...entityManager}
            validate={validate}
            onSubmit={handleSubmit}
            withPaper
        >
            <Grid container spacing={2}>
                <Grid item sm={12} xs={12}>
                    <Field
                        label="Hospede"
                        name="hospedeId"
                        fullWidth
                        component={HospedeAutoComplete}
                    />
                </Grid>
            </Grid>
        </CrudForm>
    )
}

export default ReservaHospedeForm
