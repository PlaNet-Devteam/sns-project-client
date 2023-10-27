import React from 'react';
import { useRouter } from 'next/router';
import { RiLockPasswordLine, RiFileUserLine } from 'react-icons/ri';
import { MdSecurity, MdNoAccounts } from 'react-icons/md';
import { BiHelpCircle, BiLike, BiBlock } from 'react-icons/bi';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import SettingsList, {
  SettingsListType,
} from '@/components/settings/SettingsList';
import Button from '@/components/common/Button';
import useAuth from '@/hooks/useAuth';

const Settings = () => {
  const router = useRouter();
  const { onLogout } = useAuth();

  const settingList: SettingsListType[] = [
    {
      title: '계정 설정',
      items: [
        {
          icon: <RiLockPasswordLine />,
          title: '비밀번호 변경',
          onClick: () => router.push('/settings/change-password'),
        },
        {
          icon: <RiFileUserLine />,
          title: '개인정보',
        },
        {
          icon: <MdSecurity />,
          title: '내 정보 및 권한',
        },
      ],
    },
    {
      title: '콘텐츠 정보',
      items: [
        {
          icon: <BiLike />,
          title: '좋아요 수 노출 관리',
        },
        {
          icon: <MdNoAccounts />,
          title: '차단 유저 관리',
        },
      ],
    },
    {
      items: [
        {
          icon: <BiHelpCircle />,
          title: '도움말',
        },
        {
          icon: <BiBlock />,
          title: '계정 삭제',
        },
      ],
    },
  ];

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title isEnglish>SETTINGS</TopHeader.Title>
        <TopHeader.Right></TopHeader.Right>
      </TopHeader>
      <article className="article__container">
        <div className="inner__container">
          {settingList.map((list, index) => (
            <SettingsList title={list.title} items={list.items} key={index} />
          ))}
          <div className="button-group">
            <Button
              variant="secondary"
              size="lg"
              isFull
              isEnglish
              onClick={onLogout}
            >
              LOGOUT
            </Button>
          </div>
        </div>
      </article>
    </>
  );
};

export default Settings;
