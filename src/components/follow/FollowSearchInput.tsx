import React, { ChangeEventHandler } from 'react';
import styles from './FollowSearchInput.module.scss';

interface FollowSearchInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
}

const FollowSearchInput = ({
  value,
  onChange,
  placeholder,
}: FollowSearchInputProps) => {
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

export default FollowSearchInput;
