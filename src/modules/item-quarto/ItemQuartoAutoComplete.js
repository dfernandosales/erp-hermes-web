import React from "react";
import { autocompleteHelpers } from "../../lib/Common";
import itemQuartoRepository from "./itemQuartoRepository";
import Autocomplete from "../../Components/Autocomplete";
const { toOption } = autocompleteHelpers;

export const loadItemQuarto = async inputValue => {
  const response = await itemQuartoRepository.list({
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

const ItemQuartoAutoComplete = props => {
  return (
    <Autocomplete
      repository={itemQuartoRepository}
      labelOption="nome"
      loadOptions={loadItemQuarto}
      {...props}
    />
  );
};

export default ItemQuartoAutoComplete;