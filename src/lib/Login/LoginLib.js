import validation from "../Utils/Validation";

export const validate = label => values => {
  return {
    username: validation.required(values.username, label),
    password: validation.required(values.password, label)
  };
};

export const handleSubmit = async ({
  handleUserLogin,
  credentials,
  console,
  onSubmit
}) => {
  const data = (await onSubmit(credentials)) || { ok: false };
  if (data.ok) {
    if (!handleUserLogin) {
      return console.warn("Login Context not found");
    }
    return handleUserLogin(data);
  }
  return {
    error: data.message || "Usuário ou senha inválidos"
  };
};
