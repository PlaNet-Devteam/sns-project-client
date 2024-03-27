import Image from 'next/image';
import React from 'react';
import classNames from 'classnames';
import isExternalImage from '@/core/utils/is-external-image';
import { BaseProps } from '@/core';
import styles from './BaseImage.module.scss';

interface BaseImageProps extends BaseProps {
  src: string;
  width: number;
  height: number;
  alt: string;
  onError?: () => void;
  draggable?: boolean;
}

const BaseImage = ({
  src,
  width,
  height,
  alt,
  onError,
  draggable,
  className,
}: BaseImageProps) => {
  return (
    <div className={styles.container}>
      <>
        {src ? (
          <Image
            src={
              isExternalImage(src)
                ? src
                : `${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${src}`
            }
            width={width}
            height={height}
            alt={alt}
            onError={onError}
            className={classNames(styles.image, className)}
            draggable={draggable}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
          />
        ) : (
          <Image
            src={'/img/icons/icon_default_profile.svg'}
            width={width}
            height={height}
            className={styles.default}
            alt="기본 이미지"
          />
        )}
      </>
    </div>
  );
};

export default BaseImage;
