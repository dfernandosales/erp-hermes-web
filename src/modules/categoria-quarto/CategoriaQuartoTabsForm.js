import React, {useState} from 'react'
import { useTabsNavigation, CrudRoute, CrudTabs } from '../../lib/CrudComponents'
import CategoriaQuartoForm from './CategoriaQuartoForm'
import CategoriaItemQuartoForm from '../categoria-item-quarto/CategoriaItemQuartoForm'
import CategoriaItemQuartoList from '../categoria-item-quarto/CategoriaItemQuartoList'
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import { Button, Grid, makeStyles, Modal, Typography } from '@material-ui/core'


const useStyles = makeStyles(theme => ({
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

const CategoriaQuartoTabsForm = () => {
  const [open, setOpen] = useState(false)
  const classes = useStyles()
  const tabsNavigation = useTabsNavigation({
      mainPath: "categoria-quarto",
      withPaper: false,
      tabs: [
        { value: "", label: "Categoria Quarto" },
        { value: "categoriaItemQuarto", label: "Itens da Categoria" },
      ],
    });
    
  const renderContent = () => {
    return (
      <Typography className={classes.paddingAll}>
        <li>
          Esse formulario é resposavel por criar uma categoria de quarto.
        </li>
        <li>
          Lembre-se de que para adicionar itens de quarto, os itens devem estar cadastrados no sistema.
        </li>
        <li>
          Navegue pelas abas abaixo para editar os dados da categoria de quarto e seus itens.
        </li>
      </Typography>
    )
  }
  const handleOpen = () => {
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
    <Grid item sm={12} xs={12} >
      <Grid container sm={12} xs={12} justify='space-between'>
      <Typography variant="h6">
          Cadastro de Categoria de Quarto
        </Typography>
        <Button onClick={() => handleOpen()}><HelpOutlineIcon /></Button>
      </Grid>
    </Grid>
    <CrudTabs {...tabsNavigation}>
      <CrudRoute render={props => <CategoriaQuartoForm {...props} />} />
      <CrudRoute
      name="categoriaItemQuarto"
      render={props => (
        <CategoriaItemQuartoList
          onClickNew={tabsNavigation.toNewChild}
          onClickEdit={tabsNavigation.toEditChild}
          {...props}
        />
        )}
      />
      <CrudRoute
        name="categoriaItemQuarto"
        isForm
        render={props => <CategoriaItemQuartoForm {...props} />}
      />
      
      </CrudTabs>
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
    </>
  );
};

export default CategoriaQuartoTabsForm;
