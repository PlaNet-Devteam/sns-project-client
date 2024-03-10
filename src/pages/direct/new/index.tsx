import { useRouter } from 'next/router';
import { useEffect } from 'react';
import UserService from '@/services/user';
import MessageUserListItem from '@/components/direct-message/DirectMessageUserListItem';
import InfinityDataList from '@/components/common/InfinityDataList';
import TopHeader from '@/components/nav/topHeader/TopHeader';
import useAuth from '@/hooks/useAuth';
import useSearchInput from '@/hooks/useSearchInput';
import SearchInput from '@/components/common/SearchInput';
import useSocket from '@/hooks/useSocket';

const DirectNew = () => {
  const router = useRouter();
  const socket = useSocket();
  const { payload } = useAuth();
  const { searchKeyword, onChange, onReset, debouncedSearchKeyword } =
    useSearchInput();

  useEffect(() => {
    socket.on('create_room', (roomUniqueId: string) => {
      console.log('create_room', roomUniqueId);
      router.push(`/direct/${roomUniqueId}`);
    });
    socket.emit('join_create_room', {
      userId: payload?._id,
    });
    socket.on('join_create_room', (userId: string) => {
      console.log(`join the create room. user id : ${userId} `);
    });
  }, [payload?._id, router]);

  return (
    <>
      <TopHeader>
        <TopHeader.Left>
          <button onClick={() => router.back()}>뒤로</button>
        </TopHeader.Left>
        <TopHeader.Title>새로운 메세지</TopHeader.Title>
        <TopHeader.Right></TopHeader.Right>
      </TopHeader>
      <article className="article__container">
        <div className="inner__container">
          <SearchInput
            value={searchKeyword}
            onChange={onChange}
            onReset={onReset}
            placeholder="유저명 혹은 닉네임 검색"
          />
          <InfinityDataList
            queryKey={['newMessageUsers', debouncedSearchKeyword]}
            listType={'scroll'}
            fetchData={(page, limit) =>
              UserService.getUsers({
                page,
                limit,
                query: debouncedSearchKeyword,
                viewerId: payload?._id,
              })
            }
            renderToChildComponent={MessageUserListItem}
          ></InfinityDataList>
        </div>
      </article>
    </>
  );
};

export default DirectNew;
