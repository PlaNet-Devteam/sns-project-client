import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AiOutlineCamera } from 'react-icons/ai';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadFile } from '@/utils/uploadImage';
import { UserType, UserUpdateType } from '@/core';
import UserService from '@/services/user';
import useAuth from '@/hooks/useAuth';
import Dialog from '../dialog/Dialog';
import Button from '../common/Button';
import LoadingSpinner from '../common/LoadingSpinner';

interface ProfileImageProps {
  profile: UserType;
}

const ProfileImage = ({ profile }: ProfileImageProps) => {
  const queryClient = useQueryClient();
  const { profileImage } = profile;
  const { payload } = useAuth();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [imgSrc, setImgSrc] = useState('');

  // 이미지 업로드 창
  const onClickUploadImageHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const { mutateAsync, isLoading } = useMutation(
    (formData: UserUpdateType) => UserService.updateUser(profile.id, formData),
    {
      onSuccess: () => {
        setIsModalOpen(false);
        return queryClient.invalidateQueries(['user']);
      },
    },
  );

  // 프로필 이미지 수정
  const onChangeUploadImageHandler = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.files) {
      const image = event.target.files?.[0];
      if (image) {
        const url = await uploadFile(image, 'profile');
        if (url) {
          await mutateAsync({ profileImage: url });
        }
        setImgSrc(URL.createObjectURL(image));
      }
    }
  };

  // 프로필 이미지 삭제
  const onDeleteUploadImageHandler = async () => {
    await mutateAsync({ profileImage: '' });
    setImgSrc('');
  };

  useEffect(() => {
    setImgSrc(`${process.env.NEXT_PUBLIC_AWS_S3_BUCKET}${profileImage}`);
  }, [profileImage]);

  return (
    <div className="profile-info__desc__wrapper">
      {payload?.username === profile.username && (
        <>
          <Button
            size="sm"
            variant="secondary"
            iconOnly
            onClick={() => setIsModalOpen(true)}
          >
            <AiOutlineCamera />
          </Button>
          <Dialog isOpen={isModalOpen}>
            <Dialog.Dimmed onClick={() => setIsModalOpen(false)} />
            <Dialog.LabelButton
              color="essential"
              onClick={onClickUploadImageHandler}
            >
              <input
                id="file"
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="feed-create-form-input__input"
                onInput={onChangeUploadImageHandler}
              />
              사진 업데이트
            </Dialog.LabelButton>
            <Dialog.LabelButton
              color="danger"
              onClick={onDeleteUploadImageHandler}
            >
              현재 사진 삭제
            </Dialog.LabelButton>
          </Dialog>
        </>
      )}
      <div className="profile-info__desc__image">
        <figure className="profile-info__desc__image--figure">
          {isLoading && <LoadingSpinner variant="default" />}
          {!isLoading && imgSrc ? (
            <Image
              src={imgSrc}
              width={120}
              height={120}
              alt="프로필 이미지"
              onError={() => {
                setImgSrc('/img/icons/icon_default_profile.svg');
              }}
            />
          ) : (
            <Image
              src={'/img/icons/icon_default_profile.svg'}
              width={120}
              height={120}
              alt="프로필 이미지"
            />
          )}
        </figure>
      </div>
    </div>
  );
};

export default ProfileImage;
