import React, { useState } from 'react'
import { Button, Grid, makeStyles, Modal, Typography } from '@material-ui/core'
import { Field } from 'react-final-form'
import { CrudForm } from '../../lib/Components'
import { TextField } from '../../lib/Fields'
import { useEntityManager } from '../../lib/Hooks'
import categoriaitemQuartoRepository from './categoriaitemQuartoRepository'
import * as yup from 'yup'
import yupValidation from '../../lib/yupValidation'
import ItemQuartoAutoComplete from '../item-quarto/ItemQuartoAutoComplete'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';

const useStyles = makeStyles(theme => ({
    container: {
        '@media (min-height:800px)': {
            marginTop: theme.spacing(3)
        }
    },
    textoHistorico: {
        marginRight: 8,
    },
    negrito: {
        fontWeight: "bold",
    },
    paddingAll: {
        padding: "5px"
    },
    status: {
        paddingLeft: "10px"
    },
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        position: 'absolute',
        width: 800,
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))


const quartoSchema = yup.object().shape({
    quantidade: yup.number().min(1, "Quantidade minima de 1.").required("Obrigatório"),
    itemQuartoId: yup.number().required("Obrigatório")
})

const validate = yupValidation(quartoSchema)

const CategoriaItemQuartoForm = props => {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const entityManager = useEntityManager({
        repository: categoriaitemQuartoRepository,
        initialData: {
            quantidade: 1
        }
    })

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = data => {
        data.categoriaQuartoId = props.match.params.id;
        return entityManager.onSubmit(data);
    };

    const renderContent = () => {
        return (
            <Typography className={classes.paddingAll}>
                <li>
                    Esse formulario é resposavel por adicionar um item a categoria de quarto.
                </li>
                <li>
                    Selecione o item desejado e informe a quantidade que esse item aparece na categoria de quarto.
                </li>
            </Typography>
        )
    }

    return (
        <Grid className={classes.container}>
            <CrudForm
                {...props}
                {...entityManager}
                validate={validate}
                onSubmit={handleSubmit}
                withPaper
            >
                <Grid container spacing={2}>
                    <Grid item sm={12} xs={12} >
                        <Grid container sm={12} xs={12} justify='space-between'>
                            <Typography variant="h6">
                                Cadastro de item na categoria quarto
                            </Typography>
                            <Button onClick={() => handleOpen()}><HelpOutlineIcon /></Button>
                        </Grid>
                    </Grid>
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
            <Modal
                className={classes.modal}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                open={open}
                onClose={handleClose}
                fullWidth={true}
            >
                <div className={classes.paper}>
                    <h2 >Ajuda</h2>
                    {renderContent()}
                </div>
            </Modal>
        </Grid>
    )
}

export default CategoriaItemQuartoForm
