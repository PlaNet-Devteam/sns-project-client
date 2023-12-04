import React from 'react';
import UserBlockService from '@/services/user-block';
import UserBlockListItem from '@/components/user-block/UserBlockListItem';
import InfinityDataList from '../common/InfinityDataList';

const UserBlockList = () => {
  return (
    <InfinityDataList
      queryKey={['blockUsers']}
      listType={'button'}
      fetchData={(page) => UserBlockService.getBlockUsers({ page, limit: 5 })}
      renderToChildComponent={UserBlockListItem}
    ></InfinityDataList>
  );
};

export default UserBlockList;
