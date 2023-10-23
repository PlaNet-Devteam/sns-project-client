import React from 'react';
import { ImSpinner6 } from 'react-icons/im';
import { useRouter } from 'next/router';
import FollowService from '@/services/follow';
import { FOLLOW, ORDER_BY } from '@/core';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import { FollowType } from '@/core/types/follow';
import EmptyData from '../common/EmptyData';
import FollowListItem from './FollowListItem';

interface FollowListProps {
  queryKey: string;
}

const FollowList = ({ queryKey }: FollowListProps) => {
  const router = useRouter();

  const {
    data: follows,
    isFetchingNextPage,
    status,
    bottom,
  } = useInfinityScroll<FollowType>(
    [`${queryKey}`, router.query.username],
    (page) =>
      FollowService.getAllUsers(router.query.username as string, queryKey, {
        page,
        limit: 5,
        orderBy: ORDER_BY.ASC,
      }),
  );

  if (follows?.pages && follows?.pages[0].totalCount === 0) {
    return (
      <>
        <EmptyData /> <div ref={bottom} />
      </>
    );
  }

  return (
    <>
      {follows &&
        follows.pages.map((page, index) => (
          <div key={index}>
            {page.items.map((follow) => (
              <FollowListItem
                queryKey={queryKey}
                item={follow}
                user={
                  queryKey === FOLLOW.FOLLOWINGS
                    ? follow.following
                    : follow.follower
                }
                key={follow.id}
              />
            ))}
          </div>
        ))}
      {bottom && <div ref={bottom} />}
      {follows && follows.pages[0].totalCount > 0 && (
        <div className="spinner_container">
          {status === 'success' && !isFetchingNextPage === undefined ? (
            <ImSpinner6 className="spinner" />
          ) : null}
        </div>
      )}
    </>
  );
};

export default FollowList;
