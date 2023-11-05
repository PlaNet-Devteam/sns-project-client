import React from 'react';
import { UserType } from 'aws-sdk/clients/workdocs';
import UserService from '@/services/user';
import useSearchInput from '@/hooks/useSearchInput';
import InfinityDataList from '../common/InfinityDataList';
import SearchInput from '../common/SearchInput';
import UserListItem from './ExploreUserListItem';

const ExploreUserList = () => {
  const { searchKeyword, onChange, debouncedSearchKeyword } = useSearchInput();

  return (
    <>
      <SearchInput
        value={searchKeyword}
        onChange={onChange}
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
