import { useState } from 'react';

function useForm(initialState) {
  const [fields, setValues] = useState(initialState);
  const handle = (event) => {
    setValues({
      ...fields,
      [event.target.name]: event.target.value,
    });
  };

  return [
    fields,
    handle,
  ];
}

export default useForm;
