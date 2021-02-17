import React, { useEffect, useState } from "react";
import { PureAutocomplete, autocompleteHelpers } from "../lib/Common";
import { CancelToken } from "apisauce";
const { toOption } = autocompleteHelpers;

const Autocomplete = ({
  input,
  meta,
  repository,
  labelOption,
  loadOptions,
  labelFormat,
  ...props
}) => {
  const [value, setValue] = useState();

  useEffect(() => {
    const source = CancelToken.source();
    const fetch = async () => {
      if (input.value) {
        const response = await repository.getOne({
          id: input.value,
          options: {
            cancelToken: source.token
          }
        });
        if (response.ok) {
          if (labelFormat) {
            const option = labelFormat(response.data);
            setValue(option);
          } else {
            const option = toOption(labelOption)(response.data);
            setValue(option);
          }
        }
      } else {
        setValue(null);
      }
    };
    fetch();
    return () => source.cancel();
  }, [input.value, labelOption, repository, labelFormat]);

  const onChange = item => {
    setValue(item);
    input.onChange(item ? item.id : undefined);
  };

  const touched = meta.touched || props.showError;

  return (
    <PureAutocomplete
      {...props}
      meta={meta}
      error={meta.error && touched}
      textFieldProps={{
        onBlur: input.onBlur,
        helperText: touched && meta.error,
        error: meta.error && touched
      }}
      helperText={touched && meta.error}
      loadOptions={loadOptions}
      onChange={onChange}
      value={value}
    />
  );
};

export default Autocomplete;
