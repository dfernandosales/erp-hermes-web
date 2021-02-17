import { useState, useEffect } from 'react'
import { useLocation, useHistory, useParams } from 'react-router-dom'
import * as R from 'ramda'
import axios from 'axios'

export const fetchListPure = ({
  location,
  repository,
  defaultSort,
  query = [],
  parentId,
  options = {}
}) => {
  const params = new URLSearchParams(location.search)
  const { page = 0, rows = 10, sort = defaultSort, ...allQuery } = R.fromPairs([
    ...params.entries(),
    ...query
  ])
  return repository.list({
    parentId,
    paginate: {
      limit: +rows,
      skip: rows * page
    },
    query: {
      ...allQuery,
      ...(sort ? { sort } : {})
    },
    options
  })
}

export const fetchAllListPure = ({
  location,
  repository,
  defaultSort,
  query = [],
  parentId
}) => {
  const params = new URLSearchParams(location.search)
  const { sort = defaultSort, ...allQuery } = R.fromPairs([
    ...params.entries(),
    ...query
  ])
  return repository.list({
    parentId,
    paginate: {
      limit: 10000
    },
    query: {
      ...allQuery,
      ...(sort ? { sort } : {})
    }
  })
}

const _getId = R.prop('id')

export const removePure = async ({
  repository,
  getId = _getId,
  item,
  parentId,
  forceRemove = false
}) => {
  const response = await repository.remove({
    id: getId(item),
    parentId
  })
  if (response.ok) {
    return {
      message: forceRemove
        ? 'Registro removido.'
        : 'Registro removido. Deseja desfazer essa ação?',
      ok: true
    }
  }
  return {
    message: R.pathOr(
      'Não foi possível remover o registro',
      ['message'],
      response.data
    ),
    ok: false,
    data: response.data
  }
}

export const useListRepository = ({
  repository,
  getId = _getId,
  defaultSort = '',
  query,
  path,
  cancelPreviousRequest = false,
  forceRemove = false
}) => {
  const location = useLocation()
  const params = useParams()
  const history = useHistory()
  const [state, setState] = useState({
    list: [],
    count: 0
  })
  const [removedState, setRemovedState] = useState({
    removedMessage: '',
    item: undefined
  })

  const fetchAllList = () =>
    fetchAllListPure({
      parentId: params.id,
      repository,
      location,
      defaultSort,
      query
    })

  const fetchList = async ({ cancelToken } = {}) => {
    setState({ ...state, loading: true })
    const response = await fetchListPure({
      parentId: params.id,
      repository,
      location,
      defaultSort,
      query,
      options: cancelToken ? { cancelToken } : null
    })
    if (response.ok) {
      return setState({
        ...state,
        list: response.data,
        count: response.count,
        loading: false
      })
    }
    setState({
      ...state,
      loading: false
    })
  }
  const saveSession = (key, value) =>
    (sessionStorage.listCache = JSON.stringify({ [key]: value }))
  const onClickNew = () => {
    saveSession(`/${path}`, history.location.search)
    history.push(`/${path}/new`)
  }
  const onClickEdit = item => {
    saveSession(`/${path}`, history.location.search)
    history.push(`/${path}/${item.id}`)
  }
  const onClickView = item => {
    saveSession(`/${path}`, history.location.search)
    history.push(`/${path}/${item.id}/view`)
  }

  const removeItem = async item => {
    const response = await removePure({
      repository,
      item,
      parentId: params.id,
      forceRemove
    })
    if (response.ok) {
      await fetchList()
      setRemovedState({
        removedMessage: response.message,
        item
      })
    } else {
      setRemovedState({
        removedMessage: response.message
      })
    }
    return response
  }

  const undoRemove = async () => {
    setRemovedState({
      removedMessage: ''
    })
    const response = await repository.update(
      {
        id: getId(removedState.item),
        deletedAt: null
      },
      {
        parentId: params.id
      }
    )
    if (response.ok) {
      fetchList()
    } else {
      setRemovedState({
        removedMessage: response.message
      })
    }
  }

  const clearRemovedMessage = () => {
    setRemovedState({
      removedMessage: '',
      removedItem: undefined
    })
  }

  useEffect(() => {
    if (cancelPreviousRequest) {
      const source = axios.CancelToken.source()
      fetchList({ cancelToken: source.token })
      return () => source.cancel()
    } else {
      fetchList()
    }
  }, [location.search, location.pathname])

  return {
    state,
    fetchList,
    onClickNew,
    onClickEdit,
    onClickView,
    removeItem,
    removedItem: removedState.item,
    removedMessage: removedState.removedMessage,
    undoRemove,
    clearRemovedMessage,
    fetchAllList
  }
}
