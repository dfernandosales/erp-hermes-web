import { restApi } from '../../services/api'
import { createBasicRepository as createRepository } from '../../lib/Repository'
import { query, paginate } from '../../lib/feathers'

const quartoRepository = createRepository({
  path: 'quarto',
  restApi,
  queryTransform: {
    nome: query.ilike('numero'),
    ...paginate
  }
})

export default quartoRepository
