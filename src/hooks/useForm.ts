import { ChangeEvent, useCallback, useState } from 'react';

function useForm<T extends Record<string, any>>(initialForm: T) {
  const [formData, setForm] = useState(initialForm);

  const onReset = useCallback(() => {
    setForm(initialForm);
  }, [initialForm]);

  const onChange = useCallback(
    (
      event: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >,
    ) => {
      const { name, value } = event.target;
      setForm((prevState) => ({ ...prevState, [name]: value }));
    },
    [],
  );

  return {
    formData,
    onChange,
    onReset,
  };
}

export default useForm;
