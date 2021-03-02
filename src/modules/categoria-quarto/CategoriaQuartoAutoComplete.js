import React from "react";
import { autocompleteHelpers } from "../../lib/Common";
import categoriaQuartoRepository from "./categoriaQuartoRepository";
import Autocomplete from "../../Components/Autocomplete";
const { toOption } = autocompleteHelpers;

export const loadCategoriaQuarto = async inputValue => {
  const response = await categoriaQuartoRepository.list({
    query: {
      nome: inputValue,
      order: "createdAt desc",
    },
    paginate: {
      limit: 10,
    },
  });

  if (response.ok) {
    return response.data.map(toOption("nome"));
  }
  return [];
};

const CategoriaQuartoAutocomplete = props => {
  return (
    <Autocomplete
      repository={categoriaQuartoRepository}
      labelOption="nome"
      loadOptions={loadCategoriaQuarto}
      {...props}
    />
  );
};

export default CategoriaQuartoAutocomplete;