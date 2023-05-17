import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import Modal from '../components/common/Modal';

export default {
  title: 'stories/Modal',
  component: Modal,
} as Meta<typeof Modal>;

const Template: StoryFn<typeof Modal> = (args) => <Modal {...args} />;

export const Type1 = Template.bind({});
Type1.args = {
  isModalOpen: true,
  children: (
    <>
      <div>버튼</div>
      <div>버튼</div>
      <div>버튼</div>
      <div>버튼</div>
      <div>버튼</div>
      <div>버튼</div>
      <div>버튼</div>
    </>
  ),
};

export const Type2 = Template.bind({});
Type2.args = {
  variant: 'primary',
  isModalOpen: true,
  children: (
    <>
      <div>버튼</div>
      <div>버튼</div>
      <div>버튼</div>
      <div>버튼</div>
      <div>버튼</div>
      <div>버튼</div>
      <div>버튼</div>
    </>
  ),
};

export const Type3 = Template.bind({});
Type3.args = {
  isModalOpen: true,
  headerText: '팔로우',
  children: (
    <>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
    </>
  ),
};

export const Type4 = Template.bind({});
Type4.args = {
  variant: 'primary',
  isModalOpen: true,
  headerText: '팔로우',
  children: (
    <>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
      <div>사람</div>
    </>
  ),
};
