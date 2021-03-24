import { restApi } from '../../services/api'
import { createBasicRepository as createRepository } from '../../lib/Repository'
import { query, paginate } from '../../lib/feathers'

const categoriaitemQuartoRepository = createRepository({
  path: 'categoria-item-quarto',
  restApi,
  queryTransform: {
    ...paginate
  }
})

export default categoriaitemQuartoRepository
