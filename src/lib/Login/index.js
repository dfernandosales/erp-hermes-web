export { default as Login } from "./Login";
export { default as LoginForm } from "./LoginForm";
export { default as PrivateRoute } from "./PrivateRoute";
export { default as RecoverPassword } from "./RecoverPassword";
export { default as Auth } from "./Auth";
export { default as withLogin } from "./withLogin";
export { default as withRecoverPassword } from "./withRecoverPassword";
export { AuthContext } from "./Auth";
export * from "./Auth";

export const loginRoutes = {
  login: "/login",
  recoverPassword: "/recuperar-senha",
  resetPassword: "/resetar-senha/:token"
};
