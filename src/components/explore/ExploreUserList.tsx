import React from 'react';
import { UserType } from 'aws-sdk/clients/workdocs';
import { useRecoilValue } from 'recoil';
import UserService from '@/services/user';
import useSearchInput from '@/hooks/useSearchInput';
import useAuth from '@/hooks/useAuth';
import { userState } from '@/store/userAtom';
import InfinityDataList from '../common/InfinityDataList';
import SearchInput from '../common/SearchInput';
import UserListItem from './ExploreUserListItem';

const ExploreUserList = () => {
  const { searchKeyword, onChange, onReset, debouncedSearchKeyword } =
    useSearchInput();
  const { payload } = useAuth();
  const myInfo = useRecoilValue(userState);

  return (
    <>
      <SearchInput
        value={searchKeyword}
        onChange={onChange}
        onReset={onReset}
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
            viewerId: payload?._id,
          })
        }
        ChildCompoentToRender={UserListItem}
      ></InfinityDataList>
    </>
  );
};

export default ExploreUserList;
