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
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
                },
                {
                  feedId: 1,
                  sortOrder: 1,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
                },
                {
                  feedId: 1,
                  sortOrder: 2,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/f8ac707f-0ae3-4055-8927-a433c6c79322',
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
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
                },
                {
                  feedId: 2,
                  sortOrder: 1,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
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
            {
              id: 3,
              description: '어몽어스 하실분',
              likeCount: 318,
              commentCount: 94,
              feedImage: [
                {
                  feedId: 1,
                  sortOrder: 0,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
                },
                {
                  feedId: 1,
                  sortOrder: 1,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
                },
                {
                  feedId: 1,
                  sortOrder: 2,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
                },
                {
                  feedId: 1,
                  sortOrder: 3,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
                },
                {
                  feedId: 1,
                  sortOrder: 4,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
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
              id: 4,
              description: '어몽어스 하실분',
              likeCount: 318,
              commentCount: 94,
              feedImage: [
                {
                  feedId: 1,
                  sortOrder: 0,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
                },
                {
                  feedId: 1,
                  sortOrder: 1,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
                },
                {
                  feedId: 1,
                  sortOrder: 2,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
                },
                {
                  feedId: 1,
                  sortOrder: 3,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
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
              id: 5,
              description: '어몽어스 하실분',
              likeCount: 318,
              commentCount: 94,
              feedImage: [
                {
                  feedId: 1,
                  sortOrder: 0,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
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
              id: 6,
              description: '오늘 바디프로필 찍었다. 질문받는다.',
              likeCount: 318,
              commentCount: 94,
              feedImage: [
                {
                  feedId: 1,
                  sortOrder: 0,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
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
              id: 7,
              description: '오늘 바디프로필 찍었다. 질문받는다.',
              likeCount: 318,
              commentCount: 94,
              feedImage: [
                {
                  feedId: 1,
                  sortOrder: 0,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
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
              id: 8,
              description: '오늘 바디프로필 찍었다. 질문받는다.',
              likeCount: 318,
              commentCount: 94,
              feedImage: [
                {
                  feedId: 1,
                  sortOrder: 0,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
                },
                {
                  feedId: 1,
                  sortOrder: 1,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
                },
                {
                  feedId: 1,
                  sortOrder: 2,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
                },
                {
                  feedId: 1,
                  sortOrder: 3,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
                },
                {
                  feedId: 1,
                  sortOrder: 4,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
                },
                {
                  feedId: 1,
                  sortOrder: 5,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
                },
                {
                  feedId: 1,
                  sortOrder: 6,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
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
              id: 9,
              description: '이것은 이번 인턴십에서 만든 과제입니다.',
              likeCount: 318,
              commentCount: 94,
              feedImage: [
                {
                  feedId: 1,
                  sortOrder: 0,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/f8ac707f-0ae3-4055-8927-a433c6c79322',
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
              id: 10,
              description: '이것은 이번 인턴십에서 만든 과제입니다.',
              likeCount: 318,
              commentCount: 94,
              feedImage: [
                {
                  feedId: 1,
                  sortOrder: 0,
                  image:
                    'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/f8ac707f-0ae3-4055-8927-a433c6c79322',
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
          ],
          totalCount: 10,
        },
      }),
    );
  }),
  rest.get('https://example.com/comment/1', (req, res, ctx) => {
    return res(
      ctx.json({
        comment: [
          {
            id: 1,
            userId: 1,
            feedId: 1,
            comment: '댓글 1등!!',
            likeCount: 18,
            replyCount: 2,
            created_at: '2023-05-14 22:15:26.091535',
            updated_at: '2023-05-15 22:15:26.091535',
          },
          {
            id: 2,
            userId: 2,
            feedId: 1,
            comment: '댓글 2등!!',
            likeCount: 15,
            replyCount: 13,
            created_at: '2023-05-14 23:15:26.091535',
            updated_at: '2023-05-15 23:15:26.091535',
          },
          {
            id: 3,
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
  rest.get('https://example.com/feeds', (req, res, ctx) => {
    const page = req.url.searchParams.get('page');
    const limit = req.url.searchParams.get('limit');
    if (page === '1') {
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
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
                  },
                  {
                    feedId: 1,
                    sortOrder: 1,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
                  },
                  {
                    feedId: 1,
                    sortOrder: 2,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/f8ac707f-0ae3-4055-8927-a433c6c79322',
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
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
                  },
                  {
                    feedId: 2,
                    sortOrder: 1,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
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
              {
                id: 3,
                description: '어몽어스 하실분',
                likeCount: 318,
                commentCount: 94,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
                  },
                  {
                    feedId: 1,
                    sortOrder: 1,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
                  },
                  {
                    feedId: 1,
                    sortOrder: 2,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
                  },
                  {
                    feedId: 1,
                    sortOrder: 3,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
                  },
                  {
                    feedId: 1,
                    sortOrder: 4,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
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
                id: 4,
                description: '어몽어스 하실분',
                likeCount: 318,
                commentCount: 94,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
                  },
                  {
                    feedId: 1,
                    sortOrder: 1,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
                  },
                  {
                    feedId: 1,
                    sortOrder: 2,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
                  },
                  {
                    feedId: 1,
                    sortOrder: 3,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
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
                id: 5,
                description: '어몽어스 하실분',
                likeCount: 318,
                commentCount: 94,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/e6de9748-4d77-46d3-9bcb-38d6272eb265',
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
                id: 6,
                description: '오늘 바디프로필 찍었다. 질문받는다.',
                likeCount: 318,
                commentCount: 94,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
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
                id: 7,
                description: '오늘 바디프로필 찍었다. 질문받는다.',
                likeCount: 318,
                commentCount: 94,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
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
                id: 8,
                description: '오늘 바디프로필 찍었다. 질문받는다.',
                likeCount: 318,
                commentCount: 94,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
                  },
                  {
                    feedId: 1,
                    sortOrder: 1,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
                  },
                  {
                    feedId: 1,
                    sortOrder: 2,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
                  },
                  {
                    feedId: 1,
                    sortOrder: 3,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
                  },
                  {
                    feedId: 1,
                    sortOrder: 4,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
                  },
                  {
                    feedId: 1,
                    sortOrder: 5,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
                  },
                  {
                    feedId: 1,
                    sortOrder: 6,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/260dffe3-f273-4813-b0d3-fd92b41d28e6',
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
                id: 9,
                description: '이것은 이번 인턴십에서 만든 과제입니다.',
                likeCount: 318,
                commentCount: 94,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/f8ac707f-0ae3-4055-8927-a433c6c79322',
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
                id: 10,
                description: '이것은 이번 인턴십에서 만든 과제입니다.',
                likeCount: 318,
                commentCount: 94,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github.com/jeongminsang/jeongminsang.github.io/assets/101001956/f8ac707f-0ae3-4055-8927-a433c6c79322',
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
            ],
          },
          total: 30,
          page: 1,
        }),
      );
    } else if (page === '2') {
      return res(
        ctx.json({
          status: 'SUCCESS',
          data: {
            items: [
              {
                id: 11,
                description: '핑구2',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
              {
                id: 12,
                description: '혹시 핑구를 좋아하시나요?',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
              {
                id: 13,
                description: '혹시 핑구를 좋아하시나요?',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
              {
                id: 14,
                description: '혹시 핑구를 좋아하시나요?',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
              {
                id: 15,
                description: '혹시 핑구를 좋아하시나요?',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
              {
                id: 16,
                description: '혹시 핑구를 좋아하시나요?',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
              {
                id: 17,
                description: '혹시 핑구를 좋아하시나요?',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
              {
                id: 18,
                description: '혹시 핑구를 좋아하시나요?',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
              {
                id: 19,
                description: '혹시 핑구를 좋아하시나요?',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
              {
                id: 20,
                description: '혹시 핑구를 좋아하시나요?',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
            ],
          },
          total: 30,
          page: 2,
        }),
      );
    } else if (page === '3') {
      return res(
        ctx.json({
          status: 'SUCCESS',
          data: {
            items: [
              {
                id: 21,
                description: '핑구3',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
              {
                id: 22,
                description: '혹시 핑구를 좋아하시나요?',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
              {
                id: 23,
                description: '혹시 핑구를 좋아하시나요?',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
              {
                id: 24,
                description: '혹시 핑구를 좋아하시나요?',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
              {
                id: 25,
                description: '혹시 핑구를 좋아하시나요?',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
              {
                id: 26,
                description: '혹시 핑구를 좋아하시나요?',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
              {
                id: 27,
                description: '혹시 핑구를 좋아하시나요?',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
              {
                id: 28,
                description: '혹시 핑구를 좋아하시나요?',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
              {
                id: 29,
                description: '혹시 핑구를 좋아하시나요?',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
              {
                id: 30,
                description: '혹시 핑구를 좋아하시나요?',
                likeCount: 0,
                commentCount: 0,
                feedImage: [
                  {
                    feedId: 1,
                    sortOrder: 0,
                    image:
                      'https://github-production-user-asset-6210df.s3.amazonaws.com/101001956/245099612-7b4f4f81-6896-450d-ba44-b90c325407dc.jpg',
                  },
                ],
                tag: [],
              },
            ],
          },
          total: 30,
          page: 3,
        }),
      );
    }
  }),
];

// rest.get('https://example.com/feeds?page=1&limit=10', (req, res, ctx) => {
//   return res(
//     ctx.json({
//       status: 'SUCCESS',
//       data: {
//         items: [
//           {
//             id: 1,
//             description: '첫번째',
//             likeCount: 0,
//             commentCount: 0,
//             feedImage: [],
//           },
//         ],
//       },
//       total: 30,
//       page: 1,
//     }),
//   );
// });
// rest.get('https://example.com/feeds?page=2&limit=10', (req, res, ctx) => {
//   return res(
//     ctx.json({
//       status: 'SUCCESS',
//       data: {
//         items: [
//           {
//             id: 1,
//             description: '두번째',
//             likeCount: 0,
//             commentCount: 0,
//             feedImage: [],
//           },
//         ],
//       },
//       total: 30,
//       page: 1,
//     }),
//   );
// });
// rest.get('https://example.com/feeds?page=2&limit=10', (req, res, ctx) => {
//   return res(
//     ctx.json({
//       status: 'SUCCESS',
//       data: {
//         items: [
//           {
//             id: 1,
//             description: '세번째',
//             likeCount: 0,
//             commentCount: 0,
//             feedImage: [],
//           },
//         ],
//       },
//       total: 30,
//       page: 1,
//     }),
//   );
// });
