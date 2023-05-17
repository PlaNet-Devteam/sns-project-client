import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Button from '../components/common/Button';

export default {
  title: 'stories/Button',
  component: Button,
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => <Button {...args} />;

export const Type1 = Template.bind({});
Type1.args = {
  children: 'default',
};

export const Type2 = Template.bind({});
Type2.args = {
  variant: 'primary',
  size: 'md',
  isEnglish: true,
  isFull: true,
  color: 'white',
  children: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
};

export const Type3 = Template.bind({});
Type3.args = {
  variant: 'secondary',
  size: 'lg',
  isEnglish: false,
  isFull: true,
  color: 'white',
  children: '가나다라마바사아자차카타파하',
};

export const Type4 = Template.bind({});
Type4.args = {
  variant: 'essential',
  size: 'sm',
  isEnglish: false,
  isFull: true,
  color: 'white',
  children: '채팅 채널 만들기',
};

export const Type5 = Template.bind({});
Type5.args = {
  variant: 'essential',
  size: 'sm',
  isEnglish: false,
  isFull: false,
  color: 'white',
  children: '확인',
};

export const Type6 = Template.bind({});
Type6.args = {
  variant: 'default',
  size: 'sm',
  isEnglish: false,
  isFull: false,
  color: 'success',
  children: '저장',
};

export const Type7 = Template.bind({});
Type7.args = {
  variant: 'default',
  size: 'sm',
  isEnglish: false,
  isFull: false,
  color: 'danger',
  children: '삭제',
};
