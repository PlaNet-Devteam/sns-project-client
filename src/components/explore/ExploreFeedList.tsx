import React from 'react';
import FeedService from '@/services/feed';
import useSearchInput from '@/hooks/useSearchInput';
import TagService from '@/services/tag';
import useAuth from '@/hooks/useAuth';
import InfinityDataList from '../common/InfinityDataList';
import ProfileFeedListItem from '../profile/ProfileFeedListItem';
import SearchInput from '../common/SearchInput';
import TagListItem from '../tag/TagListItem';

const ExploreFeedList = () => {
  const { searchKeyword, onChange, onReset, debouncedSearchKeyword } =
    useSearchInput();
  const { payload } = useAuth();

  return (
    <>
      <SearchInput
        value={searchKeyword}
        onChange={onChange}
        onReset={onReset}
        placeholder="태그 검색"
      />
      <div className="row-box">
        {debouncedSearchKeyword.length > 0 ? (
          <InfinityDataList
            queryKey={['tags', debouncedSearchKeyword]}
            listType={'scroll'}
            fetchData={(page, limit) => {
              return TagService.getTags({
                page,
                limit,
                query: debouncedSearchKeyword,
              });
            }}
            renderToChildComponent={TagListItem}
          ></InfinityDataList>
        ) : (
          <div className="profile-feeds-list">
            <InfinityDataList
              queryKey={['allFeeds']}
              listType={'scroll'}
              fetchData={(page) =>
                FeedService.getFeeds({
                  page,
                  limit: 9,
                  viewerId: payload?._id,
                })
              }
              renderToChildComponent={ProfileFeedListItem}
            ></InfinityDataList>
          </div>
        )}
      </div>
    </>
  );
};

export default ExploreFeedList;
