import * as R from 'ramda'

const getCurrentId = (params) => {
  if (params.childId) {
    return params.childId
  }
  return params.id
}

const getErrorMessage = (response) => R.path(['data', 'error', 'message'], response)


export const getWhereFilter = (where, filter, filtersConfig) => {
  const filterWhere = filter && filter.filter ? filter.filter : filter
  const finalWhere = { ...filterWhere, ...where }
  return R.keys(finalWhere)
    .map(key => {
      if (filtersConfig[key]) {
        return { [key]: filtersConfig[key](finalWhere[key]) }
      }
      return { [key]: finalWhere[key] }
    })
    .reduce(R.merge, {})
}

const isSecondLevel = pathname => /\/\w+\/\d+\/\w+/i.test(pathname)
export const getPage = async ({ api, where={}, location, ...params }) => {
  const {rowsPerPage, page, order} = params
  const options = {
    order: order,
    limit: rowsPerPage,
    skip: rowsPerPage && page && (rowsPerPage * page),
    offset: rowsPerPage && page && (rowsPerPage * page), //lb4
    where
  }
  let response
  if (isSecondLevel(location.pathname)) {
    response = await api.getRelationList({location, ...options})
  } else {
    response = await api.getList(options)
  }
  if (response.ok) {
    return response.data
  }
  return {
    ok: response.ok,
    message: getErrorMessage(response)
  }
}

export const getCount = (api, fixedWhere, filtersConfig={}) => async ({ filter, location= {} }) => {
  const options = {
    where: getWhereFilter(fixedWhere, filter, filtersConfig)
  }
  let response
  if (isSecondLevel(location.pathname)) {
    response = await api.getRelationCount({filter: options, location})
  } else {
    response = await api.getCount(options)
  }
  if (response.ok) {
    return R.path(['data', 'count'], response)
  }
  return 0
}

export const handleDelete = (api) => async (item, location = {}) => {
  let response;
  if (isSecondLevel(location.pathname)) {
    response = await api.removeRelation(item.id, { location})
  } else {
    response = await api.remove(item.id)
  }
  if (response.ok) {
    return {
      ok: true,
      message: 'Item removido. Deseja desfazer alteração?',
      item
    }
  }
  return {
    ok: response.ok,
    message: getErrorMessage(response)
  }
}

export const undo = (api) => async (item, location = {}) => {
  let response;
  if (isSecondLevel(location.pathname)) {
    response = await api.undoRemoveRelation(item.id, { location })
  } else {
    response = await api.undoRemove(item.id)
  }
  return { ok: response.ok }
}

export const handleDeleteF = (api) => async (item, location = {}) => {
  let response;
  if (isSecondLevel(location.pathname)) {
    response = await api.deleteFRelation(item.id, { location})
  } else {
    response = await api.deleteF(item.id)
  }
  if (response.ok) {
    return {
      ok: true,
      message: 'Item removido!'
    }
  }
  return {
    ok: response.ok,
    message: getErrorMessage(response)
  }
}

export const ListApi = ({ api, getPageDecorator, children, filtersConfig = {}, where: fixedWhere, transformWhere }) => {

  const getPageProxy = (filter) => {
    const where = transformWhere ? transformWhere(getWhereFilter(fixedWhere, filter, filtersConfig)) : getWhereFilter(fixedWhere, filter, filtersConfig)
    if (getPageDecorator) {
      return getPageDecorator({
        getPage: () => getPage({...filter, where, api})
      })
    }
    return getPage({...filter, api, where})
  }

  return children({
    handleDelete: handleDelete(api),
    undo: undo(api),
    handleDeleteF: handleDeleteF(api),
    getPage: getPageProxy,
    getCount: getCount(api, fixedWhere, filtersConfig)
  })

}

export const FormApi = ({ api, initialData, children, format, submitDecorator, match, location, history, getItemDecorator }) => {
  const handlerApiError = response => {
    switch (true) {
      case response.status === 409:
        const campos = JSON.parse(getErrorMessage(response)).join(', ')
        return {
          ok: false,
          message: `Campo já foi cadastrado: ${campos}`
        }
      case response.problem === 'NETWORK_ERROR':
        return {
          ok: false,
          message: 'Servidor não encontrado'
        }
      default:
        return {
          ok: false,
          message: getErrorMessage(response)
        }
    }
  }

  const handleSubmit = data => {
    const id = getCurrentId(match.params)
    if (submitDecorator) {
      return submitDecorator({ id, data, handleSubmit: handleSubmitForm })
    }
    return handleSubmitForm({ id, data })
  }

  const handleSubmitForm = async ({ id, data }) => {
    const formated = format ? format(data) : data
    if (/new/.test(id)) {
      const response = await api.create(formated)
      if (response.ok) {
        history.replace(location.pathname.replace(/new$|new-child$/, response.data.id))
        return { ok: true, data: response.data }
      }
      return handlerApiError(response)
    }
    const response = await api.update(id, formated)
    if (response.ok) {
      return { ok: true, data: response.data }
    }
    return handlerApiError(response)
  }

  const getItem = async (filter) => {
    const id = getCurrentId(match.params)
    if (/new/.test(id)) return initialData
    const response = await api.getOne(id, filter)
    if (response.ok) {
      return response.data
    }
    //todo analisar quando der erro
  }

  const getItemProxy = (filter) => {
    if (getItemDecorator) {
      return getItemDecorator({ getItem, filter })
    }
    return getItem(filter)
  }

  return children({ handleSubmit, getItem: getItemProxy })
}
