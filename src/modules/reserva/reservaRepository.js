import { restApi } from '../../services/api'
import { createBasicRepository as createRepository } from '../../lib/Repository'
import { query, paginate } from '../../lib/feathers'

const reservaRepository = createRepository({
  path: 'reserva',
  restApi,
  queryTransform: {
    ...paginate
  }
});

reservaRepository.checkout = id => {
  return restApi.patch(`reserva/${id}`, {checkout:true, dataFimReserva:new Date()});
};

export default reservaRepository
