import config from "../config";
import { create } from "apisauce";

export const restApi = create({
  baseURL: config.baseURL,
});

const getApi = () => {
  return {
    setToken: token => restApi.setHeader("Authorization", `Bearer ${token}`),
    ping: idUsuario => restApi.get(`/usuarios/${idUsuario}`),
    login: credentials =>
      restApi.post("/authentication", {
        strategy: "microsoft",
        ...credentials,
      }),
    logout: () => restApi.delete("/authentication"),
    resetPassword: data => restApi.post("/account", data),
    getViagens: cpf => restApi.get("/viagens", { cpf }),
  };
};

export default getApi();
