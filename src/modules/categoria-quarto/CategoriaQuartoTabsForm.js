import React from 'react'
import { useTabsNavigation, CrudRoute, CrudTabs } from '../../lib/CrudComponents'
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
