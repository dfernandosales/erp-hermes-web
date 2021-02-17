import * as R from 'ramda'

const getList = (api, path, defaultFilter) => (filter = {}) =>
  api.get(path, { filter: R.mergeDeepWith(R.join, defaultFilter, filter) })

export const apiCrudFactory = ({ api, defaultFilter, getRelationRoute }) => (
  path,
  { transformers, urls } = {}
) => {
  path = path.replace('/', '')
  return {
    getList: getList(api, path, defaultFilter),
    getOne: async (id, filter) => {
      const response = await api.get(`${path}/${id}`, { filter: filter })
      if (transformers && transformers.getOne) {
        const newData = transformers.getOne(response.data)
        response.data = newData
      }
      return response
    },
    getCount: (filter = {}) =>
      api.get(`${path}/count`, R.mergeDeepWith(R.join, defaultFilter, filter)),
    update: (id, data) => api.patch(`${path}/${id}`, data),
    create: data => {
      const endpoint = urls && urls.post ? urls.post : path
      return api.post(endpoint, data)
    },
    remove: id => api.patch(`${path}/${id}`, { removed: true }),
    removeRelation: (itemId, { location }) => {
      const relationRoute = getRelationRoute && getRelationRoute(location)
      const [relation, id] = location.pathname.split('/').reverse()
      return api.patch(`${path}/${id}/${relationRoute || relation}/${itemId}`, {
        removed: true
      })
    },
    deleteF: id => api.delete(`${path}/${id}`),
    deleteFRelation: (itemId, { location }) => {
      const relationRoute = getRelationRoute && getRelationRoute(location)
      const [relation, id] = location.pathname.split('/').reverse()
      return api.delete(`${path}/${id}/${relationRoute || relation}/${itemId}`)
    },
    undoRemove: id => api.patch(`${path}/${id}`, { removed: false }),
    undoRemoveRelation: (itemId, { location }) => {
      const relationRoute = getRelationRoute && getRelationRoute(location)
      const [relation, id] = location.pathname.split('/').reverse()
      return api.patch(`${path}/${id}/${relationRoute || relation}/${itemId}`, {
        removed: false
      })
    },
    getRelationList: ({ location, ...filter }) => {
      const relationRoute = getRelationRoute && getRelationRoute(location)
      const [relation, id] = location.pathname.split('/').reverse()
      return getList(
        api,
        `${path}/${id}/${relationRoute || relation}`,
        defaultFilter
      )(filter)
    },
    getRelationCount: ({ location, filter }) => {
      const relationRoute = getRelationRoute && getRelationRoute(location)
      const [relation, id] = location.pathname.split('/').reverse()
      return api.get(
        `${path}/${id}/${relationRoute || relation}/count`,
        R.mergeDeepWith(R.join, defaultFilter, filter)
      )
    }
  }
}
