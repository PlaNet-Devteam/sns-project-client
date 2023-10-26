import React from 'react';
import SettingsListItem, { SettingsListItemType } from './SettingsListItem';
import styles from './SettingsList.module.scss';

export interface SettingsListType {
  title?: string;
  items: SettingsListItemType[];
}

const SettingsList = ({ title, items }: SettingsListType) => {
  return (
    <div className={styles.list}>
      {title && <h3 className={styles.title}>{title}</h3>}
      <div className={styles.items}>
        {items.map((item) => (
          <SettingsListItem item={item} />
        ))}
      </div>
    </div>
  );
};

export default SettingsList;
