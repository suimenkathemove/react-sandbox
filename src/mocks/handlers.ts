import { rest } from 'msw';

export const handlers = [
  rest.get('https://example.com', (_, res, ctx) => {
    return res(
      ctx.json({
        foo: 'bar',
      }),
    );
  }),
];
