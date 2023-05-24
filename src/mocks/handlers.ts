import { rest } from 'msw';

export const handlers = [
  rest.get('https://example.com/feeds', (req, res, ctx) => {
    return res(
      ctx.json({
        status: 'SUCCESS',
        data: {
          items: [
            {
              id: 1,
              description: 'some description #new #newer',
              likeCount: 0,
              commentCount: 0,
              feedImage: [
                {
                  feedId: 1,
                  sortOrder: 0,
                  image: 'storage/image/feed1.png',
                },
                {
                  feedId: 1,
                  sortOrder: 1,
                  image: 'storage/image/feed3.png',
                },
                {
                  feedId: 1,
                  sortOrder: 2,
                  image: 'storage/image/feed2.png',
                },
              ],
              comment: [],
              tag: [
                {
                  tagName: 'new',
                },
                {
                  tagName: 'newer',
                },
              ],
            },
            {
              id: 2,
              description: 'some description #dev #develop',
              likeCount: 12,
              commentCount: 1,
              feedImage: [
                {
                  feedId: 2,
                  sortOrder: 0,
                  image: 'storage/image/feed21.png',
                },
                {
                  feedId: 2,
                  sortOrder: 1,
                  image: 'storage/image/feed14.png',
                },
              ],
              comment: [
                {
                  userId: 5,
                  feedId: 2,
                  replyCount: 2,
                  comment:
                    'some comment about this feed. 참고로 리스트에서는 첫 코멘트만 노출한다. 더 보기 누르면 다 나오게 ~ ',
                },
              ],
              tag: [
                {
                  tagName: 'dev',
                },
                {
                  tagName: 'develop',
                },
              ],
            },
          ],
          totalCount: 2,
        },
      }),
    );
  }),
];
