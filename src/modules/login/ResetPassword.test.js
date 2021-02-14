import "babel-polyfill";
import { handleSubmit } from "./ResetPassword";

describe("ResetPassword", () => {
  it("Deve resetar senha com sucesso", async () => {
    const resetPassword = jest.fn(() => Promise.resolve({ ok: true }));
    const location = { search: "?token=abcd&action=init" };
    const result = await handleSubmit(
      resetPassword,
      location
    )({ username: "1234" });
    expect(resetPassword).toBeCalledWith({
      action: "init",
      password: "1234",
      token: "abcd",
    });
    expect(result).toEqual({
      ok: true,
      message: "Senha redefinida com sucesso!",
    });
  });

  it("Deve falhar ao tenta resetar senha", async () => {
    const resetPassword = jest.fn(() => Promise.resolve({ ok: false }));
    const location = { search: "?token=abcd&action=init" };
    const result = await handleSubmit(
      resetPassword,
      location
    )({ username: "1234" });
    expect(resetPassword).toBeCalledWith({
      password: "1234",
      action: "init",
      token: "abcd",
    });
    expect(result).toEqual({
      ok: false,
      message: "Token inválido",
    });
  });
});
