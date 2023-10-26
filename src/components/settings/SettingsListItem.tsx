import React, { MouseEventHandler } from 'react';
import styles from './SettingsListItem.module.scss';

export interface SettingsListItemType {
  title: string;
  icon?: JSX.Element;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

interface SettingsListItemProps {
  item: SettingsListItemType;
}

const SettingsListItem = ({ item }: SettingsListItemProps) => {
  return (
    <button onClick={item.onClick} className={styles.item}>
      {item.icon && <span className={styles.icon}>{item.icon}</span>}
      {item.title}
    </button>
  );
};

export default SettingsListItem;
