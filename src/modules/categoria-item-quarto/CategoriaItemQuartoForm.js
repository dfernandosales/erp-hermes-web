import React from 'react'
import { Grid } from '@material-ui/core'
import { Field } from 'react-final-form'
import { CrudForm } from '../../lib/Components'
import { TextField } from '../../lib/Fields'
import { useEntityManager } from '../../lib/Hooks'
import categoriaitemQuartoRepository from './categoriaitemQuartoRepository'
import * as yup from 'yup'
import yupValidation from '../../lib/yupValidation'
import ItemQuartoAutoComplete from '../item-quarto/ItemQuartoAutoComplete'

const quartoSchema = yup.object().shape({
    quantidade: yup.number().min(1, "Quantidade minima de 1.").required("Obrigatório"),
    itemQuartoId: yup.number().required("Obrigatório")
})

const validate = yupValidation(quartoSchema)

const CategoriaItemQuartoForm = props => {

    const entityManager = useEntityManager({
        repository: categoriaitemQuartoRepository,
        initialData: {
            quantidade: 1
        }
    })

    const handleSubmit = data => {
        data.categoriaQuartoId = props.match.params.id;
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
                <Grid item sm={6} xs={12}>
                    <Field
                        fullWidth
                        name='itemQuartoId'
                        label='Item'
                        component={ItemQuartoAutoComplete}
                    />
                </Grid>
                <Grid item sm={6} xs={12}>
                    <Field
                        fullWidth
                        name='quantidade'
                        label='Quantidade'
                        component={TextField}
                    />
                </Grid>
            </Grid>
        </CrudForm>
    )
}

export default CategoriaItemQuartoForm
