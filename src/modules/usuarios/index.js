import { useContext } from "react";
import { AbilityContext } from "./AbilityContext";
export { AbilityContext };
export { default as abilityFor } from "./ability";
export { default as UsuariosList } from "./UsuariosList";
export { default as UsuarioForm } from "./UsuarioForm";
export const useAbility = () => useContext(AbilityContext);
