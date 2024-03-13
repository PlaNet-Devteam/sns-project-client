import React from 'react';
import UserService from '@/services/user';
import useSearchInput from '@/hooks/useSearchInput';
import useAuth from '@/hooks/useAuth';
import InfinityDataList from '../common/InfinityDataList';
import SearchInput from '../common/SearchInput';
import UserListItem from './ExploreUserListItem';

const ExploreUserList = () => {
  const { searchKeyword, onChange, onReset, debouncedSearchKeyword } =
    useSearchInput();
  const { payload } = useAuth();

  return (
    <>
      <SearchInput
        value={searchKeyword}
        onChange={onChange}
        onReset={onReset}
        placeholder="유저명 혹은 닉네임 검색"
      />
      <InfinityDataList
        queryKey={['exploreUsers', debouncedSearchKeyword]}
        listType={'scroll'}
        fetchData={(page, limit) =>
          UserService.getUsers({
            page,
            limit,
            query: debouncedSearchKeyword,
            viewerId: payload?._id,
          })
        }
        renderToChildComponent={UserListItem}
      ></InfinityDataList>
    </>
  );
};

export default ExploreUserList;
