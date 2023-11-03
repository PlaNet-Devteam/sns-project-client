import React from 'react';
import { BaseProps, InfinitePagesType } from '@/core';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import EmptyData from './EmptyData';
import LoadingSpinner from './LoadingSpinner';
import Button from './Button';
import ButtonGroup from './ButtonGroup';

interface InfinityDataListProps<T> extends BaseProps {
  queryKey: unknown[];
  listType: 'button' | 'scroll';
  ChildCompoentToRender: React.ComponentType<T>;
  propsObject?: Record<string, string>;
  fetchData: (page: number, limit?: number) => Promise<InfinitePagesType<T>>;
}

const InfinityDataList = <T,>({
  queryKey,
  listType,
  ChildCompoentToRender,
  fetchData,
}: InfinityDataListProps<any>) => {
  const {
    data: items,
    status,
    bottom,
    fetchNextPage,
    hasNextPage,
  } = useInfinityScroll<T>([...queryKey], fetchData);

  if (items?.pages[0].totalCount === 0) {
    return (
      <>
        <EmptyData />
      </>
    );
  }

  return (
    <>
      {items && (
        <>
          {items?.pages.map((page, index) => (
            <div key={index}>
              {page.items.map((item, index2) => (
                <ChildCompoentToRender key={index2} item={item} />
              ))}
            </div>
          ))}
          {listType === 'scroll' ? (
            <>
              <div ref={bottom} />
              <div className="spinner_container">
                {status === 'success' && !hasNextPage === undefined && (
                  <LoadingSpinner variant="white" />
                )}
              </div>
            </>
          ) : (
            <>
              {hasNextPage && (
                <ButtonGroup>
                  <Button
                    size="md"
                    variant="secondary"
                    isEnglish
                    isFull
                    onClick={() => fetchNextPage()}
                  >
                    {status === 'loading' ? (
                      <LoadingSpinner variant="white" />
                    ) : (
                      <>MORE</>
                    )}
                  </Button>
                </ButtonGroup>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default InfinityDataList;
