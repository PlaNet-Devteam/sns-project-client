import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import ModalBottom from '../components/common/ModalBottom';

export default {
  title: 'stories/Modal',
  component: ModalBottom,
} as Meta<typeof ModalBottom>;

const Template: StoryFn<typeof ModalBottom> = (args) => (
  <ModalBottom {...args} />
);

export const Type5 = Template.bind({});
Type5.args = {
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

export const Type6 = Template.bind({});
Type6.args = {
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
