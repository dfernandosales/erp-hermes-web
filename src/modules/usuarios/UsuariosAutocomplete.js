import React from "react";
import { autocompleteHelpers } from "elentari";
import usuariosRepository from "./usuariosRepository";
import Autocomplete from "../../Components/Autocomplete";
const { toOption } = autocompleteHelpers;

export const loadUsuarios = async inputValue => {
  const response = await usuariosRepository.list({
    query: {
      name: inputValue,
      order: "name desc"
    },
    paginate: {
      limit: 10
    }
  });
  if (response.ok) {
    return response.data.map(toOption("name"));
  }

  return [];
};

const UsuarioAutocomplete = props => {
  return (
    <Autocomplete
      repository={usuariosRepository}
      labelOption="name"
      loadOptions={loadUsuarios}
      {...props}
    />
  );
};

export default UsuarioAutocomplete;
