import React from 'react';
import { FeedType, TagType } from '@/core';
import FeedService from '@/services/feed';
import useSearchInput from '@/hooks/useSearchInput';
import TagService from '@/services/tag';
import InfinityDataList from '../common/InfinityDataList';
import ProfileFeedListItem from '../profile/ProfileFeedListItem';
import SearchInput from '../common/SearchInput';
import TagListItem from '../tag/TagListItem';

const ExploreFeedList = () => {
  const { searchKeyword, onChange, debouncedSearchKeyword } = useSearchInput();

  return (
    <>
      <SearchInput
        value={searchKeyword}
        onChange={onChange}
        placeholder="태그 검색"
      />
      <div className="row-box">
        {debouncedSearchKeyword.length > 0 ? (
          <InfinityDataList<TagType>
            queryKey={['tags', debouncedSearchKeyword]}
            listType={'scroll'}
            fetchData={(page, limit) => {
              return TagService.getTags({
                page,
                limit,
                query: debouncedSearchKeyword,
              });
            }}
            ChildCompoentToRender={TagListItem}
          ></InfinityDataList>
        ) : (
          <div className="profile-feeds-list">
            <InfinityDataList<FeedType>
              queryKey={['allFeeds']}
              listType={'scroll'}
              fetchData={(page) => {
                return FeedService.getFeeds({
                  page,
                  limit: 9,
                });
              }}
              ChildCompoentToRender={ProfileFeedListItem}
            ></InfinityDataList>
          </div>
        )}
      </div>
    </>
  );
};

export default ExploreFeedList;
