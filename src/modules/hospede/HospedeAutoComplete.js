import React from "react";
import { autocompleteHelpers } from "../../lib/Common";
import hospedeRepository from "./hospedeRepository";
import Autocomplete from "../../Components/Autocomplete";
const { toOption } = autocompleteHelpers;

export const loadHospede = async inputValue => {
  const response = await hospedeRepository.list({
    query: {
      nomeCompleto: inputValue,
      order: "createdAt desc",
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

const HospedeAutoComplete = props => {
  return (
    <Autocomplete
      repository={hospedeRepository}
      labelOption="nomeCompleto"
      loadOptions={loadHospede}
      {...props}
    />
  );
};

export default HospedeAutoComplete;