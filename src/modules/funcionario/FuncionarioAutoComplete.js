import React from "react";
import { autocompleteHelpers } from "../../lib/Common";
import funcionarioRepository from "./funcionarioRepository";
import Autocomplete from "../../Components/Autocomplete";
const { toOption } = autocompleteHelpers;

export const loadFunc = async inputValue => {
  const response = await funcionarioRepository.list({
    query: {
      nomeCompleto: inputValue,
      order: "nomeCompleto desc",
    },
    paginate: {
      limit: 10,
    },
  });

  if (response.ok) {
    return response.data.map(toOption("nomeCompleto"));
  }
  return [];
};

const FuncionarioAutoComplete = props => {
  return (
    <Autocomplete
      repository={funcionarioRepository}
      labelOption="nomeCompleto"
      loadOptions={loadFunc}
      {...props}
    />
  );
};

export default FuncionarioAutoComplete;