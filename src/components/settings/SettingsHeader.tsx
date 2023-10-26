import React from 'react';
import classNames from 'classnames';
import { BaseProps } from '@/core/types/common';
import styles from './SettingsHeader.module.scss';

const SettingsHeaderDesc = ({ children }: BaseProps) => {
  return <div className={styles.desc}>{children}</div>;
};

interface SettingsHeaderTitleProps extends BaseProps {
  isEnglish?: boolean;
}

const SettingsHeaderTitle = ({
  children,
  isEnglish,
}: SettingsHeaderTitleProps) => {
  return (
    <div
      className={classNames(`${styles.title}`, {
        'is-english': isEnglish,
      })}
    >
      {children}
    </div>
  );
};

const SettingsHeaderMain = ({ children, className }: BaseProps) => {
  return (
    <header className={classNames(`${styles.header}`, className)}>
      <h4>{children}</h4>
    </header>
  );
};

const SettingsHeader = Object.assign(SettingsHeaderMain, {
  Title: SettingsHeaderTitle,
  Desc: SettingsHeaderDesc,
});

export default SettingsHeader;
