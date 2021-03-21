import { restApi } from '../../services/api'
import { createBasicRepository as createRepository } from '../../lib/Repository'
import { query, paginate } from '../../lib/feathers'

const reservaRepository = createRepository({
  path: 'reserva',
  restApi,
  queryTransform: {
    ...paginate
  }
})

export default reservaRepository
