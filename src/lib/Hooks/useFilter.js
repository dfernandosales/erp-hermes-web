import { useHistory } from 'react-router-dom'
import { fromPairs } from 'ramda'

export const recoverValues = search => {
  return fromPairs(
    [... new URLSearchParams(search).entries()].map(
      ([key, value]) => [key, handleValue(value)]
    )
  )
}

const handleValue = (value) => {
  if (value === 'true') return true;
  if (value === 'false') return false;
  if (value === 'null') return null;
  return value;
}

export const makeUrl = ({location: {pathname, search}}, values, format) => {
  const formated = format ? format(values) : values
  const newParams = new URLSearchParams(formated)
  const params = new URLSearchParams(search)
  params.get('sort') && newParams.set('sort', params.get('sort'))
  params.get('skip') && newParams.set('skip', params.get('skip'))
  params.get('limit') && newParams.set('limit', params.get('limit'))
  params.get('page') && newParams.set('page', '0')
  return `${pathname}?${newParams}`
}

const useFilter = ({format}) => {

  const history = useHistory()

  const onSubmit = values => history.push(makeUrl(history, values, format))

  const onClear = () => {
    history.push(history.location.pathname)
  }

  return {
    initialValues: recoverValues(history.location.search),
    onClear,
    onSubmit
  }
}

export default useFilter
