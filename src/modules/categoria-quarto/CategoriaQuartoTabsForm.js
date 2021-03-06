import React from 'react'
import { Grid, makeStyles } from '@material-ui/core'
import { Field } from 'react-final-form'
import { CrudForm } from '../../lib/Components'
import { TextField } from '../../lib/Fields'
import { useTabsNavigation, CrudRoute, CrudTabs } from '../../lib/CrudComponents'
import { useEntityManager } from '../../lib/Hooks'
import categoriaQuartoRepository from './categoriaQuartoRepository'
import * as yup from 'yup'
import yupValidation from '../../lib/yupValidation'
import CategoriaQuartoForm from './CategoriaQuartoForm'
import CategoriaItemQuartoForm from '../categoria-item-quarto/CategoriaItemQuartoForm'
import CategoriaItemQuartoList from '../categoria-item-quarto/CategoriaItemQuartoList'


const CategoriaQuartoTabsForm = () => {
    const tabsNavigation = useTabsNavigation({
        mainPath: "categoria-quarto",
        withPaper: false,
        tabs: [
          { value: "", label: "Categoria Quarto" },
          { value: "categoriaItemQuarto", label: "Itens da Categoria" },
        ],
      });
    

  return (
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
  );
};

export default CategoriaQuartoTabsForm;
