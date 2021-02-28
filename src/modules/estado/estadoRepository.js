import { restApi } from '../../services/api'
import { createBasicRepository as createRepository } from '../../lib/Repository'
import { query, paginate } from '../../lib/feathers'

const estadoRepository = createRepository({
  path: 'estados',
  restApi,
  queryTransform: {
    name: query.ilike('name'),
    ...paginate
  }
})

export default estadoRepository
