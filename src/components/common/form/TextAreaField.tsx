import React, { ChangeEventHandler } from 'react';
import { MdOutlineRefresh } from 'react-icons/md';
import TypoText from '../TypoText';
import styles from './TextAreaField.module.scss';

interface TextAreaFieldProps {
  name: string;
  value: string;
  onReset: (name: string) => void;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
  placeholder?: string;
  maxLength?: number;
}

const TextAreaField = ({
  name,
  value,
  onChange,
  onReset,
  placeholder,
  maxLength = 2000,
}: TextAreaFieldProps) => {
  return (
    <>
      <div className={styles.textarea}>
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          maxLength={maxLength}
        />
      </div>
      <div className={styles.button_container}>
        <div>
          {value && value.length > 0 && (
            <button onClick={() => onReset(name)}>
              <TypoText color="white">
                초기화 <MdOutlineRefresh />
              </TypoText>
            </button>
          )}
        </div>
        <TypoText color="gray" tagName="span">
          <TypoText color="white" tagName="span">
            {value.length || 0}
          </TypoText>{' '}
          / {maxLength}
        </TypoText>
      </div>
    </>
  );
};

export default TextAreaField;
