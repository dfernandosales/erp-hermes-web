import React from "react";
import { autocompleteHelpers } from "../../lib/Common";
import quartoRepository from "./quartoRepository";
import Autocomplete from "../../Components/Autocomplete";
const { toOption } = autocompleteHelpers;

export const loadItemQuarto = async inputValue => {
  const response = await quartoRepository.list({
    query: {
      nome: inputValue,
      vacancia: true,
      order: "createdAt desc",
    },
    paginate: {
      limit: 10,
    },
  });

  if (response.ok) {
    return response.data.map(toOption("id"));
  }
  return [];
};

const QuartoAutoComplete = props => {
  return (
    <Autocomplete
      repository={quartoRepository}
      labelOption="numero"
      loadOptions={loadItemQuarto}
      {...props}
    />
  );
};

export default QuartoAutoComplete;