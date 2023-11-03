import React from 'react';
import UserBlockService from '@/services/user-block';
import { UserBlockType } from '@/core';
import UserBlockListItem from '@/components/user-block/UserBlockListItem';
import InfinityDataList from '../common/InfinityDataList';

const UserBlockList = () => {
  return (
    <InfinityDataList<UserBlockType>
      queryKey={['blockUsers']}
      listType={'button'}
      fetchData={(page) => UserBlockService.getBlockUsers({ page, limit: 5 })}
      ChildCompoentToRender={UserBlockListItem}
    ></InfinityDataList>
  );
};

export default UserBlockList;
