import { HttpResponse, http } from 'msw';

export const handlers = [
  http.get('https://example.com', () => {
    return HttpResponse.json({ foo: 'bar' });
  }),
];
