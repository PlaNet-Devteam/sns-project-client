import React from 'react';
import { useRecoilValue } from 'recoil';
import { feedShareModalState } from '@/store/feedAtom';
import Dialog from '../dialog/Dialog';
import TypoText from '../common/TypoText';
import InputField from '../common/form/InputField';

interface FeedShareModalProps {
  isModalOpen: boolean;
  onClickCloseModal: () => void;
}

const FeedShareModal = ({
  isModalOpen,
  onClickCloseModal,
}: FeedShareModalProps) => {
  const feedShareModal = useRecoilValue(feedShareModalState);

  return (
    <Dialog isOpen={isModalOpen}>
      <Dialog.Dimmed onClick={onClickCloseModal} />
      <Dialog.Header>피드 공유</Dialog.Header>
      <Dialog.Content>
        <TypoText color="white">URL 복사</TypoText>
        <div className="row-box">
          <InputField
            name="url"
            value={`${process.env.NEXT_PUBLIC_SITE_URL}feed/${feedShareModal?.id}`}
            readOnly
          />
        </div>
      </Dialog.Content>
      <Dialog.LabelButton color="gray" onClick={() => onClickCloseModal()}>
        닫기
      </Dialog.LabelButton>
    </Dialog>
  );
};

export default FeedShareModal;
