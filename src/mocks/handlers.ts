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
];
