import React from "react";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const CustomSelect = ({
  input,
  hideEmpty,
  width,
  onChange,
  label,
  meta,
  options,
  emptyValue = { label: "Selecione", value: null },
  ...props
}) => {
  if (!input || !meta) {
    throw Error("Sorry my friend. Did you forget field from final form?");
  }

  const handleChange = event => {
    onChange && onChange(event);
    input.onChange(event);
  };

  return (
    <FormControl
      style={{ width, height: meta.error && meta.touched ? 70 : 48 }}
    >
      <InputLabel htmlFor="age-simple" error={meta.error && meta.touched}>
        {label}
      </InputLabel>
      <Select
        {...props}
        error={meta.error && meta.touched}
        value={input.value}
        onChange={handleChange}
        onBlur={input.onBlur}
      >
        {hideEmpty ? null : (
          <MenuItem value={emptyValue.value}>
            <em>{emptyValue.label}</em>
          </MenuItem>
        )}
        {options.map(option => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText error>{meta.touched && meta.error}</FormHelperText>
    </FormControl>
  );
};

CustomSelect.defaultProps = {
  width: "100%",
  hideEmpty: false
};

export default CustomSelect;
