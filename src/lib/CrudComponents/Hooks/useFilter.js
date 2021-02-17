import { useHistory } from 'react-router-dom'
import { toPairs, splitEvery } from 'ramda'

const recoverValues = search => {
  const searchParams = new URLSearchParams(search)
  const filters = searchParams.get('filters')
  if (!filters) return {}
  return splitEvery(2, filters.split(/[,=]/g)).reduce(
    (values, [key, value]) => ({
      ...values,
      [key]: value
    }),
    {}
  )
}

const getValue = (key, value, format) => {
  if (format && format[key]) {
    return format[key](value)
  }
  return value
}

const useFilter = ({ formatFilters }) => {
  const history = useHistory()

  const createFilters = (format, values) =>
    toPairs(values)
      .map(([key, value]) => `${key}=${getValue(key, value, format)}`)
      .join(',')

  const handleSubmit = values => {
    history.push(
      `${history.location.pathname}?filters=${createFilters(
        formatFilters,
        values
      )}`
    )
  }

  const handleClear = () => {
    history.push(history.location.pathname)
  }

  return {
    initialValues: recoverValues(history.location.search),
    handleClear,
    handleSubmit
  }
}

export default useFilter
