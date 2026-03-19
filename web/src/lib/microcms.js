import { createClient } from 'microcms-js-sdk';

export const client = createClient({
  serviceDomain: import.meta.env.VITE_MICROCMS_SERVICE_DOMAIN,
  apiKey: import.meta.env.VITE_MICROCMS_API_KEY,
});

// 記事一覧取得
export async function getBlogs(queries = {}) {
  return client.getList({
    endpoint: 'blogs',
    queries,
  });
}

// 記事1件取得
export async function getBlog(contentId) {
  return client.getListDetail({
    endpoint: 'blogs',
    contentId,
  });
}
