import React, { FormEventHandler } from 'react';
import { AiOutlineCamera } from 'react-icons/ai';
import styles from './AddPhotoButton.module.scss';

interface AddPhotoButtonProps {
  mutiple?: boolean;
  onUploadImage: FormEventHandler<HTMLInputElement>;
}

const AddPhotoButton = ({
  mutiple = false,
  onUploadImage,
}: AddPhotoButtonProps) => {
  return (
    <div className={styles.button}>
      <label
        htmlFor="file"
        className="button button-size--md button-bg--ghost button-text--english"
      >
        <AiOutlineCamera
          size={24}
          className="feed-create-form-input__button-icon"
        />
        사진첨부하기
      </label>
      <input
        id="file"
        type="file"
        accept="image/*"
        multiple={mutiple}
        onInput={onUploadImage}
      />
    </div>
  );
};

export default AddPhotoButton;
