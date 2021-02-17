import { restApi } from "../../services/api";
import { createBasicRepository as createRepository } from "../../lib/Repository";
import { query, paginate } from "../../lib/feathers";

const usuariosRepository = createRepository({
  path: "users",
  restApi,
  queryTransform: {
    name: query.ilike("name"),
    email: query.ilike("email"),
    ...paginate
  }
});

export default usuariosRepository;
