import * as R from 'ramda'

const MountEntityEmpty = (item = {}) => {
  return {
    populate: () => MountEntityEmpty(item),
    map: () => MountEntityEmpty(item),
    clean: () => MountEntityEmpty(item),
    getItem: async () => item,
  }
}

export const MountEntity = (props, fetchMainEntity, initialData) => {
  const {params} = props.match
  let id = params.id
  if (params.id === 'new') return MountEntityEmpty(initialData)
  if (params.childId === 'new-child') return MountEntityEmpty(initialData)
  if (params.childId) {
    id = params.childId
  }
  const responsePromise = fetchMainEntity(id)
  return MountEntityPopulate({id, responsePromise})
}

const populate = (fn, id) => async (response) => {
  if (!response.ok) return response
  const {data} = response
  const responsesMap = fn({id, data})
  const promises = R.keys(responsesMap).map(async key => {
    if (Array.isArray(responsesMap[key])) {
      const responses = await Promise.all(responsesMap[key])
      return {key, data: responses.map(R.prop('data')), ok: true}
    }
    const response = await responsesMap[key]
    return {key, data: response.data, ok: response.ok}
  })
  const results = await Promise.all(promises)
  if (!R.all(R.prop('ok'), results)) {
    return {ok: false}
  }
  const newData = results.reduce((newData, result) => {
    newData[result.key] = result.data
    return  newData
  }, {...data})
  return {ok: true, data: newData}
}

const MountEntityPopulate = ({id, responsePromise}) => {
  return {
    populate: fn => {
      const newResponsePromise = responsePromise.then(populate(fn, id))
      return MountEntityPopulate({id, responsePromise: newResponsePromise})
    },
    clean: props => {
      const newResponsePromise = responsePromise.then(response => {
        if (!response.ok) return response
        const copy = {...response.data}
        R.keys(copy)
          .forEach(key => props.includes(key) ? delete copy[key] : null)
        return {data: copy, ok: true}
      })
      return MountEntityPopulate({id, responsePromise: newResponsePromise})
    },
    map: (fn) => {
      const newResponsePromise = responsePromise.then(response =>
        response.ok ? {data: fn(response.data), ok: true} : response
      )
      return MountEntityPopulate({id, responsePromise: newResponsePromise})
    },
    getItem: async () => {
      const response = await responsePromise
      if (response.ok) return response.data
    }
  }
}
