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
  rest.get('https://example.com/comment/1', (req, res, ctx) => {
    return res(
      ctx.json({
        comment: [
          {
            userId: 1,
            feedId: 1,
            comment: '댓글 1등!!',
            likeCount: 18,
            replyCount: 2,
            created_at: '2023-05-14 22:15:26.091535',
            updated_at: '2023-05-15 22:15:26.091535',
          },
          {
            userId: 2,
            feedId: 1,
            comment: '댓글 2등!!',
            likeCount: 15,
            replyCount: 13,
            created_at: '2023-05-14 23:15:26.091535',
            updated_at: '2023-05-15 23:15:26.091535',
          },
          {
            userId: 3,
            feedId: 1,
            comment: '댓글 3등!!',
            likeCount: 20,
            replyCount: 15,
            created_at: '2023-05-14 23:25:26.091535',
            updated_at: '2023-05-15 23:25:26.091535',
          },
        ],
      }),
    );
  }),
];
