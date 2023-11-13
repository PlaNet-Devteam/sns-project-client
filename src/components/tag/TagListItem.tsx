import React from 'react';
import Link from 'next/link';
import { TagType } from '@/core';
import styles from './TagListItem.module.scss';

interface TagListItemProps {
  item: TagType;
}

const TagListItem = ({ item }: TagListItemProps) => {
  return (
    <Link href={`/explore/feed/tags/${item.tagName}`} className={styles.item}>
      # {item.tagName}
    </Link>
  );
};

export default TagListItem;
