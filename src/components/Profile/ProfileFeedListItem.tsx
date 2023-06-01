import React from 'react';
import { FeedType } from '@/core/types/feed';

interface ProfileFeedListItemProps {
  item: FeedType;
}

function ProfileFeedListItem({ item }: ProfileFeedListItemProps) {
  return (
    <div className="profile-feeds-list__item">
      <figure className="profile-feeds-list__item__image">{item?.title}</figure>
    </div>
  );
}

export default ProfileFeedListItem;
