import Button from '../common/Button';
import Photo from '../../assets/feed/photo.svg';
function FeedAddPhoto() {
  return (
    <div className="feed-create">
      <div className="feed-create-form layout_padding">
        <header className="feed-create-form-header">
          <div>헤더</div>
        </header>
        <div className="feed-create-form-content">
          <Photo />
          <span className="feed-create-form-content-image">
            이미지를 추가해주세요.
          </span>
        </div>
        <div className="feed-create-form-button">
          <Button variant="primary" isFull={true} isEnglish={true}>
            Add Your Photo
          </Button>
        </div>
      </div>
    </div>
  );
}
export default FeedAddPhoto;
