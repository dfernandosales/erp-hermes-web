import React from 'react'
import { Card, Grid, makeStyles, RadioGroup, Typography } from '@material-ui/core'
import { Field } from 'react-final-form'
import { CrudForm } from '../../lib/Components'
import { useEntityManager } from '../../lib/Hooks'
import reservaQuartoRepository from './reservaQuartoRepository'
import * as yup from 'yup'
import yupValidation from '../../lib/yupValidation'
import QuartoAutoComplete from '../quarto/QuartoAutoComplete'

const quartoSchema = yup.object().shape({
    quartoId : yup.number().required("Obrigatorio")
})

const validate = yupValidation(quartoSchema)

const ReservaQuartoForm = props => {

    const entityManager = useEntityManager({
        repository: reservaQuartoRepository,
        path: 'reserva-quaro'
    })

    const handleSubmit = data => {
        data.reservaId = props.match.params.id;
        return entityManager.onSubmit(data);
    };

    return (
        <>
        <CrudForm
            {...props}
            {...entityManager}
            validate={validate}
            onSubmit={handleSubmit}
            withPaper
        >
            <Grid container spacing={2}>
                <Grid item sm={6} xs={12}>
                    <Field
                        label="Quarto"
                        name="quartoId"
                        fullWidth
                        component={QuartoAutoComplete}
                    />
                </Grid>
            </Grid>
        </CrudForm>
        </>
    )
}

export default ReservaQuartoForm
