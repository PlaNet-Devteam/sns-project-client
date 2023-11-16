import React, { ChangeEventHandler, useState } from 'react';
import { IoEye, IoEyeOffOutline, IoClose } from 'react-icons/io5';
import styles from './InputField.module.scss';

interface FieldType {
  email: string;
  text: string;
  password: string;
}

interface InputFieldProps {
  value: string;
  name: string;
  type?: keyof FieldType;
  onChange: ChangeEventHandler<HTMLInputElement>;
  onReset: (name: string) => void;
  placeholder?: string;
  autoComplete?: 'on' | 'off';
}

const InputField = ({
  type = 'text',
  value,
  name,
  onChange,
  onReset,
  placeholder,
  autoComplete,
}: InputFieldProps) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const onClickVisiblePasswordHandler = () => {
    setIsVisiblePassword((prevState) => !prevState);
  };

  const isVisibleType: keyof FieldType = isVisiblePassword
    ? 'text'
    : 'password';

  return (
    <>
      <div className={styles.input_field}>
        <input
          type={type !== 'password' ? type : isVisibleType}
          value={value}
          name={name}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
        />
        <div className={styles.button_area}>
          {value.length > 0 && (
            <>
              {type === 'password' && (
                <span
                  role="button"
                  className={styles.button}
                  onClick={onClickVisiblePasswordHandler}
                >
                  {isVisiblePassword ? <IoEye /> : <IoEyeOffOutline />}
                </span>
              )}
              <span
                role="button"
                className={styles.button}
                onClick={() => onReset(name)}
              >
                <IoClose size={'1rem'} />
              </span>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InputField;
