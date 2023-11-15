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
}

const TextAreaField = ({
  name,
  value,
  onChange,
  onReset,
  placeholder,
}: TextAreaFieldProps) => {
  return (
    <>
      <div className={styles.textarea}>
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          maxLength={2000}
        />
      </div>
      <div className={styles.button_container}>
        <div>
          {value.length > 0 && (
            <button onClick={() => onReset(name)}>
              <TypoText color="white">
                초기화 <MdOutlineRefresh />
              </TypoText>
            </button>
          )}
        </div>
        <TypoText color="gray" tagName="span">
          <TypoText color="white" tagName="span">
            {value.length}
          </TypoText>{' '}
          / {2000}
        </TypoText>
      </div>
    </>
  );
};

export default TextAreaField;
