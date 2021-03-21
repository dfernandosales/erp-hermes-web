import { restApi } from '../../services/api'
import { createBasicRepository as createRepository } from '../../lib/Repository'
import { query, paginate } from '../../lib/feathers'

const reservaHospedeRepository = createRepository({
  path: 'reserva-hospede',
  restApi,
  queryTransform: {
    ...paginate
  }
})

export default reservaHospedeRepository
