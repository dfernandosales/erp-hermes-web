import { restApi } from '../../services/api'
import { createBasicRepository as createRepository } from '../../lib/Repository'
import { query, paginate } from '../../lib/feathers'

const itemQuartoRepository = createRepository({
  path: 'item-quarto',
  restApi,
  queryTransform: {
    nome: query.ilike('nome'),
    ...paginate
  }
})

export default itemQuartoRepository
