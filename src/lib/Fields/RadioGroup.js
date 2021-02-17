import React from "react";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";

const CustomRadioGroup = ({ onChange, input, options, ...props }) => {
  const handleChange = event => {
    input.onChange(event.target.value);
    onChange(event.target.value);
  };

  return (
    <RadioGroup
      name={input.name}
      value={input.value}
      onChange={handleChange}
      {...props}
    >
      {options.map((option, index) => (
        <FormControlLabel
          key={index}
          value={option.value}
          control={<Radio color={option.color} />}
          label={option.label}
        />
      ))}
    </RadioGroup>
  );
};

CustomRadioGroup.defaultProps = {
  options: []
};

export default CustomRadioGroup;
