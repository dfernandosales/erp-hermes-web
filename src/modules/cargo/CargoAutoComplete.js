import React from "react";
import { autocompleteHelpers } from "../../lib/Common";
import cargoRepository from "./cargoRepository";
import Autocomplete from "../../Components/Autocomplete";
const { toOption } = autocompleteHelpers;

export const loadCargo = async inputValue => {
  const response = await cargoRepository.list({
    query: {
      nomeCargo: inputValue,
      order: "createdAt desc",
    },
    paginate: {
      limit: 10,
    },
  });

  if (response.ok) {
    return response.data.map(toOption("nomeCargo"));
  }
  return [];
};

const CargoAutoComplete = props => {
  return (
    <Autocomplete
      repository={cargoRepository}
      labelOption="nomeCargo"
      loadOptions={loadCargo}
      {...props}
    />
  );
};

export default CargoAutoComplete;