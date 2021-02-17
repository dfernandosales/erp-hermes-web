import { useState, useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import * as R from 'ramda'

const isNew = id => /new/.test(id)

const defaultGetId = data => data.id

export const getIds = (id, childId) => ({
  id: childId || id,
  parentId: childId ? id : undefined
})

export const save = async ({
  id,
  childId,
  repository,
  relationKey,
  data,
  ...options
}) => {
  const getId = options?.getId || defaultGetId
  const ids = getIds(id, childId)
  id = ids.id
  const dataCopy = { ...data }
  if (relationKey) {
    dataCopy[relationKey] = ids.parentId
  }
  if (isNew(id)) {
    if (ids.parentId) {
      return repository.create(dataCopy, { parentId: ids.parentId })
    }
    return repository.create(dataCopy)
  }
  if (ids.parentId) {
    return repository.update(
      { id: +id, ...dataCopy },
      { parentId: ids.parentId, getId }
    )
  }
  return repository.update({ id: +id, ...dataCopy }, { getId })
}

export default ({
  repository,
  relationKey,
  handleError,
  goBackAfterSave,
  onGoBack,
  initialData = {}
}) => {
  const { id, childId } = useParams()
  const history = useHistory()
  const [message, setMessage] = useState('')
  const [item, setItem] = useState(initialData)
  const [status, setStatus] = useState('edit')

  const getItem = async () => {
    if (isNew(id) || isNew(childId)) {
      setItem(initialData)
      return
    }
    const response = await repository.getOne(getIds(id, childId))
    if (response.ok) {
      setItem(response.data)
    }
  }

  const setError = message => setMessage(message)

  const onSubmit = async (data, options) => {
    const getId = options?.getId || defaultGetId
    const response = await save({
      data,
      repository,
      id,
      childId,
      relationKey,
      getId
    })
    if (response.ok) {
      history.replace(
        history.location.pathname.replace(
          /new$|new-child$/,
          getId(response.data)
        )
      )
    }
    if (response.ok) {
      setItem(response.data)
    } else {
      const message = handleError
        ? handleError(response)
        : R.path(['data', 'message'], response)
      setMessage(message)
    }
    setStatus(response.ok ? 'success' : 'error')
    if (response.ok && goBackAfterSave) {
      setTimeout(() => history.goBack(), 50)
      return response
    }
    setTimeout(() => setStatus('edit'), 4000)
    return response
  }

  const clearMessage = () => setMessage('')

  const handleGoBack = () => {
    if (onGoBack) {
      onGoBack()
      return
    }
    let pathname = history.location.pathname
    if (pathname[pathname.length - 1] === '/') { pathname = pathname.substring(0, pathname.length - 1) }
    const path = /\/.+\//.exec(pathname)
    const goBack = path[0].substring(0, path[0].length - 1)
    if (sessionStorage.listCache) {
      const listCache = JSON.parse(sessionStorage.listCache)
      if (!R.isNil(listCache[goBack])) {
        history.push(goBack + listCache[goBack])
        return
      }
    }
    history.push(goBack + history.location.search)
  }

  useEffect(() => {
    getItem()
  }, [history.location.pathname])

  return {
    onSubmit,
    getItem,
    status,
    item,
    message,
    clearMessage,
    isNew: isNew(getIds(id, childId).id),
    setError,
    onGoBack: handleGoBack
  }
}
