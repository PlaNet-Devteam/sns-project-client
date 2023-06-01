import FeedHeader from '../../../../components/feed/FeedHeader';

function CreateFeedDescription() {
  return (
    <div className="feed-create">
      <div className="feed-create-form layout_padding">
        <FeedHeader
          back="뒤로"
          backLink="/feed/create"
          title="새 게시물"
          next="확인"
          nextLink="create/description"
        />
        <div className="feed-create-form-content">
          <textarea
            className="feed-create-description__textarea"
            placeholder="내용을 입력해주세요."
          />
        </div>
      </div>
    </div>
  );
}
export default CreateFeedDescription;
