import React, { ChangeEvent, useState } from 'react';
import { UserType } from 'aws-sdk/clients/workdocs';
import UserService from '@/services/user';
import useDebounce from '@/hooks/useDebounce';
import InfinityDataList from '../common/InfinityDataList';
import FollowSearchInput from '../follow/FollowSearchInput';
import UserListItem from './ExploreUserListItem';

const ExploreUserList = () => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const debouncedSearchKeyword = useDebounce(searchKeyword).trim();

  const onChangeSearchKeyword = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(event?.target.value);
  };

  return (
    <>
      <FollowSearchInput
        value={searchKeyword}
        onChange={onChangeSearchKeyword}
        placeholder="유저명 혹은 닉네임 검색"
      />
      <InfinityDataList<UserType>
        queryKey={['exploreUsers', debouncedSearchKeyword]}
        listType={'scroll'}
        fetchData={(page, limit) =>
          UserService.getUsers({
            page,
            limit,
            query: debouncedSearchKeyword,
          })
        }
        ChildCompoentToRender={UserListItem}
      ></InfinityDataList>
    </>
  );
};

export default ExploreUserList;
