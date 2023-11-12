import React from 'react';
import { useRouter } from 'next/router';
import { RiLockPasswordLine, RiFileUserLine } from 'react-icons/ri';
import { MdSecurity, MdNoAccounts, MdHistory } from 'react-icons/md';
import { BiHelpCircle, BiTrash } from 'react-icons/bi';
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
          onClick: () => router.push('/settings/my-profile'),
        },
      ],
    },
    {
      title: '콘텐츠 정보',
      items: [
        {
          icon: <MdSecurity />,
          title: '계정 공개 범위',
          onClick: () => router.push('/settings/account-status'),
        },
        {
          icon: <MdNoAccounts />,
          title: '차단된 계정',
          onClick: () => router.push('/settings/block-user'),
        },
        {
          icon: <MdHistory />,
          title: '보관함',
          onClick: () => router.push('/settings/archived'),
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
          icon: <BiTrash />,
          title: '계정 삭제',
          onClick: () => router.push('/settings/delete-account'),
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
