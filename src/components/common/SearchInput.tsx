import React, { ChangeEventHandler } from 'react';
import styles from './SearchInput.module.scss';

interface SearchInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

const SearchInput = ({ value, onChange, placeholder }: SearchInputProps) => {
  return (
    <div className={styles.input}>
      <div className="input-group">
        <div className="input-field">
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
