import { restApi } from '../../services/api'
import { createBasicRepository as createRepository } from '../../lib/Repository'
import { query, paginate } from '../../lib/feathers'

const cargoRepository = createRepository({
  path: 'cargo',
  restApi,
  queryTransform: {
    nomeCargo: query.ilike('nomeCargo'),
    ...paginate
  }
})

export default cargoRepository
