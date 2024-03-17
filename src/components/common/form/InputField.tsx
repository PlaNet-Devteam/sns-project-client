import React, { ChangeEventHandler, useRef, useState } from 'react';
import { IoEye, IoEyeOffOutline, IoClose, IoCopy } from 'react-icons/io5';
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
  onChange?: ChangeEventHandler<HTMLInputElement>;
  onReset?: (name: string) => void;
  placeholder?: string;
  autoComplete?: 'on' | 'off';
  readOnly?: boolean;
  defaultValue?: string;
}

const InputField = ({
  type = 'text',
  value,
  name,
  onChange,
  onReset,
  placeholder,
  autoComplete,
  readOnly,
}: InputFieldProps) => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClickVisiblePasswordHandler = () => {
    setIsVisiblePassword((prevState) => !prevState);
  };

  const onClickCopyClipBoard = async () => {
    const url = inputRef.current?.value as string;
    try {
      await navigator.clipboard.writeText(url);
    } catch (error) {
      console.error('클립보드 복사 실패', error);
    }
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
          readOnly={readOnly}
          ref={inputRef}
        />
        <div className={styles.button_area}>
          {value && value.length > 0 && (
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
              {!readOnly && (
                <span
                  role="button"
                  className={styles.button}
                  onClick={() => onReset?.(name)}
                >
                  <IoClose size={'1rem'} />
                </span>
              )}
              {readOnly && (
                <span
                  role="button"
                  className={styles.button}
                  onClick={() => onClickCopyClipBoard()}
                >
                  <IoCopy size={'1rem'} />
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default InputField;
