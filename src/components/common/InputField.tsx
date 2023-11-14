import React, { ChangeEventHandler } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './InputField.module.scss';

interface InputFieldProps {
  value: string;
  onReset: () => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

const InputField = ({
  value,
  onChange,
  onReset,
  placeholder,
}: InputFieldProps) => {
  return (
    <div className={styles.input_field}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
      {value.length > 0 && (
        <button onClick={onReset}>
          <AiOutlineClose size={'1rem'} />
        </button>
      )}
    </div>
  );
};

export default InputField;
