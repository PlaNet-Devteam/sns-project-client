import React, { ChangeEventHandler } from 'react';
import styles from './SearchInput.module.scss';
import InputField from './form/InputField';

interface SearchInputProps {
  name?: string;
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
          name="search"
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
