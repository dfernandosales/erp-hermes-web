import { restApi } from '../../services/api'
import { createBasicRepository as createRepository } from '../../lib/Repository'
import { query, paginate } from '../../lib/feathers'

const reservaQuartoRepository = createRepository({
  path: 'reserva-quarto',
  restApi,
  queryTransform: {
    ...paginate
  }
})

export default reservaQuartoRepository
