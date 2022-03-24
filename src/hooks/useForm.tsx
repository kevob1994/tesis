import { useState } from "react";

export const useForm = <T extends Object>(form: T) => {
  const [state, setSate] = useState(form);

  const onChange = (value: string, field: keyof T) => {
    setSate({
      ...state,
      [field]: value,
    });
  };

  return {
    ...state,
    form: state,
    onChange,
  };
};
