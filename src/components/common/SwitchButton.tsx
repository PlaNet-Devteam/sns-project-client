import React, { ChangeEvent, Dispatch, useState } from 'react';
import styles from './SwitchButton.module.scss';
import TypoText from './TypoText';

interface SwitchButtonProps {
  id?: string;
  defaultChecked?: boolean;
  checked?: boolean;
  readOnly?: boolean;
  label?: string;
  onClick?: () => void;
}

const SwitchButton = ({
  id,
  readOnly,
  defaultChecked,
  label,
  onClick,
}: SwitchButtonProps) => {
  const [checked, setChecked] = useState(defaultChecked);
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  const InputElement = () => {
    if (readOnly) {
      return (
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          readOnly={true}
        />
      );
    } else {
      return (
        <input type="checkbox" checked={checked} onChange={onChange} id={id} />
      );
    }
  };

  return (
    <>
      <label className={styles.item} onClick={onClick} htmlFor={id}>
        <label className={styles.label}>
          <TypoText tagName="p" color="white">
            {label}
          </TypoText>
        </label>
        <div className={styles.switch}>
          <InputElement />
          <div className={styles.slider}></div>
        </div>
      </label>
    </>
  );
};

export default SwitchButton;
