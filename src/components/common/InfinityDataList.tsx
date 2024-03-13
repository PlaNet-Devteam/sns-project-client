import React, { ComponentType } from 'react';
import { BaseProps, InfinitePagesType } from '@/core';
import { useInfinityScroll } from '@/hooks/useInfinityScroll';
import EmptyData from './EmptyData';
import LoadingSpinner from './LoadingSpinner';
import Button from './Button';
import ButtonGroup from './ButtonGroup';
import LoadingSpinnerContainer from './LoadingSpinnerContainer';

interface ChildComponentProps<T> {
  key: number;
  item: T;
  queryKey: unknown[];
}

interface InfinityDataListProps<T> extends BaseProps {
  queryKey: unknown[];
  listType: 'button' | 'scroll';
  renderToChildComponent: ComponentType<ChildComponentProps<T>>;
  fetchData: (page: number, limit?: number) => Promise<InfinitePagesType<T>>;
}

const InfinityDataList = <T,>({
  queryKey,
  listType,
  renderToChildComponent,
  fetchData,
}: InfinityDataListProps<T>) => {
  const {
    data: items,
    status,
    bottom,
    fetchNextPage,
    hasNextPage,
  } = useInfinityScroll<T>([...queryKey], fetchData);

  const ChildComponent = renderToChildComponent;

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
                <ChildComponent queryKey={queryKey} key={index2} item={item} />
              ))}
            </div>
          ))}
          {listType === 'scroll' ? (
            <>
              <div ref={bottom} />
              <LoadingSpinnerContainer
                isLoading={status === 'success' && !hasNextPage === undefined}
              />
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
