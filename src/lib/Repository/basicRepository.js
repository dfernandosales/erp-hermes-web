import { pathOr } from "ramda";

export const handlerApiError = response => {
  if (response.ok) {
    return response;
  }
  switch (true) {
    case response.status === 409:
      return {
        ok: false,
        data: {
          message: `Campo já foi cadastrado`
        }
      };
    case response.problem === "NETWORK_ERROR":
      return {
        ok: false,
        data: {
          message: "Servidor não encontrado. Problema na conexão"
        }
      };
    default:
      return response;
  }
};
export default ({
  path,
  restApi,
  parentPath,
  relationType,
  queryTransform = {},
  listResponsePath = {
    pathData: ["data", "data"],
    pathCount: ["data", "total"]
  }
}) => {
  if (!restApi) {
    throw Error("faltou passar restApi para o repository");
  }
  if (!path) {
    throw Error("faltou passar path para o repository");
  }
  path = path.replace("/", "");

  const buildPath = ({ parentId }) => {
    if (parentId && parentPath && relationType !== "query") {
      return `${parentPath}/${parentId}/${path}`;
    } else {
      return path;
    }
  };

  const createQueryString = (query, paginate, parentId) => {
    const newQuery = Object.entries({
      ...query,
      ...paginate,
      ...(relationType === "query" && parentId ? { parentId } : {})
    })
      .map(([key, value]) => {
        if (queryTransform[key]) {
          return queryTransform[key](value);
        }
        return [key, value];
      })
      .reduce((pairs, pair) => {
        if (Array.isArray(pair[0])) {
          return [...pairs, ...pair];
        }
        pairs.push(pair);
        return pairs;
      }, []);
    const urlSearchParams = new URLSearchParams(newQuery);
    return urlSearchParams.toString().length > 0 ? `?${urlSearchParams}` : "";
  };

  const create = async (data, options) =>
    handlerApiError(
      await restApi.post(
        buildPath({ parentId: options && options.parentId }),
        data,
        options
      )
    );

  const update = async (data, options) => {
    const getId = options?.getId || (data => data.id);
    return handlerApiError(
      await restApi.patch(
        `${buildPath({ parentId: options && options.parentId })}/${getId(
          data
        )}`,
        data,
        options
      )
    );
  };

  const getOne = ({ id, parentId, query }) => {
    const queryString = createQueryString(query, {}, parentId);
    return restApi.get(buildPath({ parentId }) + "/" + id + queryString);
  };

  const list = async ({ query, paginate, parentId } = {}) => {
    const queryString = createQueryString(query, paginate, parentId);
    const response = await restApi.get(buildPath({ parentId }) + queryString);
    return {
      ok: response.ok,
      data: pathOr({}, listResponsePath.pathData, response),
      count: pathOr(undefined, listResponsePath.pathCount, response)
    };
  };

  const remove = async ({ id, parentId }) => {
    if (!id) throw new Error("ID é obrigatório para delete");
    const path = buildPath({ parentId });
    const uri = `${path}/${id}`;
    const response = await restApi.delete(uri);
    return {
      ok: response.ok,
      data: response.ok ? undefined : response.data
    };
  };

  return {
    list,
    remove,
    create,
    update,
    getOne
  };
};
