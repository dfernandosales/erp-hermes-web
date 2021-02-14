import { path, concat } from 'ramda'

const _getErrorMessage = response => path(['data', 'message'], response)

export const handlerApiError = (
  response,
  getErrorMessage = _getErrorMessage
) => {
  if (response.ok) {
    return response
  }
  switch (true) {
    case response.status === 409:
      return {
        ok: false,
        message: `Campo já foi cadastrado: ${JSON.parse(
          getErrorMessage(response)
        ).join(', ')}`,
      }
    case response.problem === 'NETWORK_ERROR':
      return {
        ok: false,
        message: 'Servidor não encontrado. Problema na conexão',
      }
    default:
      return {
        ok: false,
        message: getErrorMessage(response),
      }
  }
}
export default ({
  path,
  restApi,
  parentPath,
  relationType,
  queryTransform = {},
  getErrorMessage = _getErrorMessage,
}) => {
  if (!restApi) {
    throw Error('faltou passar restApi para o repository')
  }
  if (!path) {
    throw Error('faltou passar path para o repository')
  }
  path = path.replace('/', '')

  const buildPath = ({ parentId }) => {
    if (parentId && parentPath && relationType !== 'query') {
      return `${parentPath}/${parentId}/${path}`
    } else {
      return path
    }
  }

  const createQueryString = (query, paginate, parentId) => {
    const {sort, order, ...allQuery} = query ? query : {}
    const queryEntries = Object.entries({
      ...allQuery,
      ...(relationType === 'query' && parentId ? { parentId } : {}),
    })
      .map(([key, value]) => {
        if (queryTransform[key]) {
          return queryTransform[key](value)
        }
        return [`[${key}]`, `${value}`]
      })
      .reduce((pairs, pair) => {
        if (Array.isArray(pair[0])) {
          return [...pairs, ...pair.map(([k, v]) => [`filter[where]${k}`, v])]
        }
        pairs.push([`filter[where]${pair[0]}`, pair[1]])
        return pairs
      }, [])
    const paginateEntries = Object.entries({
      ...paginate,
      ...((sort && !order) && {sort}),
      ...(order && {order})
    })
      .map(([key, value]) => {
        if (queryTransform[key]) {
          return queryTransform[key](value)
        }
        return [`[${key}]`, `${value}`]
      })
      .reduce((pairs, pair) => {
        if (Array.isArray(pair[0])) {
          return [...pairs, ...pair.map(([k, v]) => [`filter[${k}]`, v])]
        }
        pairs.push([`filter[${pair[0]}]`, pair[1]])
        return pairs
      }, [])
    const newQuery = concat(queryEntries, paginateEntries)
    const urlSearchParams = new URLSearchParams(newQuery)
    return urlSearchParams.toString().length > 0 ? `?${urlSearchParams}` : ''
  }

  const createQueryStringCount = (query, parentId) => {
    if (query) {
      delete query.sort
      delete query.order
    }
    const queryEntries = Object.entries({
      ...query,
      ...(relationType === 'query' && parentId ? { parentId } : {}),
    })
      .map(([key, value]) => {
        if (queryTransform[key]) {
          return queryTransform[key](value)
        }
        return [`[${key}]`, `${value}`]
      })
      .reduce((pairs, pair) => {
        if (Array.isArray(pair[0])) {
          return [...pairs, ...pair.map(([k, v]) => [`where${k}`, v])]
        }
        pairs.push([`where${pair[0]}`, pair[1]])
        return pairs
      }, [])
    const urlSearchParams = new URLSearchParams(queryEntries)
    return urlSearchParams.toString().length > 0 ? `?${urlSearchParams}` : ''
  }

  const create = async (data, options) =>
    handlerApiError(
      await restApi.post(`${path}`, data, options),
      getErrorMessage
    )

  const update = async (data, options) => {
    const response = handlerApiError(
      await restApi.patch(`${path}/${data.id}`, data, options),
      getErrorMessage)
    if (response.ok) {
      return getOne({id: data.id})
    }
    return response
  }

  const getOne = ({ id, parentId, options }) => {
    if (parentId && relationType === 'path') {
      return restApi.get(`${parentPath}/${parentId}/${path}/${id}`, {}, options)
    }
    return restApi.get(`${path}/${id}`, {}, options)
  }

  const list = async ({ query, paginate, parentId, options } = {}) => {
    const queryString = createQueryString(query, paginate, parentId)
    const response = await restApi.get(buildPath({ parentId }) + queryString, {}, options)
    const responseCount = await restApi.get(
      buildPath({ parentId }) + '/count' + createQueryStringCount(query, parentId), {}, options
    )
    return {
      ok: response.ok,
      data: response.data,
      count: responseCount.ok ? responseCount.data.count : undefined,
    }
  }

  const remove = async ({ id, parentId }) => {
    if (!id) throw new Error('ID é obrigatório para delete')
    const path = buildPath({ parentId })
    const uri = `${path}/${id}`
    const response = await restApi.delete(uri)
    return {
      ok: response.ok,
      data: response.data,
    }
  }

  return {
    list,
    remove,
    create,
    update,
    getOne,
  }
}
