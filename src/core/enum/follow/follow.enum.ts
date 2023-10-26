export enum FOLLOW {
  FOLLOWINGS = 'followings',
  FOLLOWERS = 'followers',
}

export const followTransformer = (value: FOLLOW) => {
  switch (value) {
    case FOLLOW.FOLLOWERS:
      return '팔로워';
    case FOLLOW.FOLLOWINGS:
      return '팔로잉';
    default:
      return '';
  }
};
