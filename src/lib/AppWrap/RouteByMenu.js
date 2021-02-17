import React from 'react'
import { Route } from 'react-router-dom'

const RouteByMenu = ({ menuItems = [] }) => {
  menuItems.forEach(item => {
    if (item.group) {
      return
    }

    if (!item.pathname) {
      console.error('Não foi encontrado a propriedade pathname no item', item)
    }

    if (!item.list || !item.form) {
      console.error('Verifique as propriedades list e form do item', item)
    }
  })

  return menuItems
    .flatMap(menuItem => (menuItem.group ? menuItem.items : menuItem))
    .map((item, index) => (
      <React.Fragment key={`${item.pathname}:${index}`}>
        <Route path={`${item.pathname}`} exact component={item.list} />
        <Route path={`${item.pathname}/:id`} component={item.form} />
      </React.Fragment>
    ))
}

export default RouteByMenu
