import "babel-polyfill";
import { handleSubmit } from "./RecoverPassword";

describe("RecoverPassword", () => {
  it("Deve recuper senha com sucesso", async () => {
    const recoverPassword = jest.fn(() => Promise.resolve({ ok: true }));
    const result = await handleSubmit(recoverPassword)({
      username: "teste@email.com",
    });
    expect(recoverPassword).toBeCalledWith({
      email: "teste@email.com",
      action: "resetSend",
    });
    expect(result).toEqual({
      ok: true,
      message: "E-mail enviado, verifique sua caixa de entrada",
    });
  });
});

describe("RecoverPassword", () => {
  it("Deve falhar ao tentar recuperar senha", async () => {
    const recoverPassword = jest.fn(() => Promise.resolve({ ok: false }));
    const result = await handleSubmit(recoverPassword)({
      username: "teste@email.com",
    });
    expect(recoverPassword).toBeCalledWith({
      email: "teste@email.com",
      action: "resetSend",
    });
    expect(result).toEqual({
      ok: false,
      message: "E-mail inválido",
    });
  });
});
