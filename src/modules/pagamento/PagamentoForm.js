import React from 'react'
import { Grid, makeStyles, Typography } from '@material-ui/core'
import { Field } from 'react-final-form'
import { CrudForm } from '../../lib/Components'
import { TextField } from '../../lib/Fields'
import { useEntityManager } from '../../lib/Hooks'
import pagamentoRepository from './pagamentoRepository'
import * as yup from 'yup'
import yupValidation from '../../lib/yupValidation'
import { DatePicker } from '../../Components'

const useStyles = makeStyles(theme => ({
    container: {
        '@media (min-height:800px)': {
            marginTop: theme.spacing(3)
        }
    }
}))

const pagamentoSchema = yup.object().shape({
    descricao: yup.string().required('Obrigatório'),
    dataPagamento: yup.date().required('Obrigatório'),
    valor: yup.number().positive().required('Obrigatório'),
})

const validate = yupValidation(pagamentoSchema)

const PagamentoForm = props => {
    const classes = useStyles()
    const entityManager = useEntityManager({
        repository: pagamentoRepository,
        path: 'pagamento'
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
                        fullWidth
                        name='descricao'
                        label='Descrição do Pagamento'
                        component={TextField}
                    />
                </Grid>
                <Grid item sm={3} xs={12}>
                    <Field
                        fullWidth
                        name="dataPagamento"
                        label="Data do Pagamento"                        
                        component={DatePicker}
                    />
                </Grid>
                <Grid item sm={3} xs={12}>
                    <Field
                        fullWidth
                        name="valor"
                        label="Valor do Pagamento"                        
                        type='number'
                        component={TextField}
                    />
                </Grid>
            </Grid>
        </CrudForm>
    )
}

export default PagamentoForm
