import React from 'react';
import { useRouter } from 'next/router';
import FollowService from '@/services/follow';
import { ORDER_BY, UserType } from '@/core';
import useSearchInput from '@/hooks/useSearchInput';
import SearchInput from '../common/SearchInput';
import InfinityDataList from '../common/InfinityDataList';
import FollowListItem from './FollowListItem';

interface FollowListProps {
  queryKey: string;
}

const FollowList = ({ queryKey }: FollowListProps) => {
  const router = useRouter();
  const { searchKeyword, onChange, debouncedSearchKeyword } = useSearchInput();

  return (
    <>
      <SearchInput
        value={searchKeyword}
        onChange={onChange}
        placeholder="유저명 혹은 닉네임 검색"
      />
      <InfinityDataList<UserType>
        queryKey={[queryKey, router.query.username, debouncedSearchKeyword]}
        listType={'scroll'}
        fetchData={(page, limit) =>
          FollowService.getAllUsers(router.query.username as string, queryKey, {
            page,
            limit,
            orderBy: ORDER_BY.ASC,
            query: debouncedSearchKeyword,
          })
        }
        ChildCompoentToRender={FollowListItem}
        propsObject={{ queryKey }}
      ></InfinityDataList>
    </>
  );
};

export default FollowList;
