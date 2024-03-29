import React from 'react';
import { FiTrash } from 'react-icons/fi';
import styles from './ThumbImage.module.scss';
import BaseImage from './BaseImage';

interface ThumbImageProps {
  image: {
    image: string;
    sortOrder?: number;
  };
  index: number;
  onClose: (index: number) => void;
}

const ThumbImage = ({ image, index, onClose }: ThumbImageProps) => {
  return (
    <div className={styles.thumbnail}>
      <button onClick={() => onClose(index)} className={styles.button}>
        <FiTrash color="white" />
      </button>
      <div className={styles.image}>
        <BaseImage
          src={image.image}
          key={image.sortOrder}
          width={100}
          height={100}
          alt="썸네일"
        />
      </div>
    </div>
  );
};

export default ThumbImage;
