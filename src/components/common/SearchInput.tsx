import React, { ChangeEventHandler } from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import styles from './SearchInput.module.scss';
import InputField from './InputField';

interface SearchInputProps {
  value: string;
  onReset: () => void;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

const SearchInput = ({
  value,
  onChange,
  onReset,
  placeholder,
}: SearchInputProps) => {
  return (
    <div className={styles.input}>
      <div className="input-group">
        <InputField
          value={value}
          onChange={onChange}
          onReset={onReset}
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default SearchInput;
