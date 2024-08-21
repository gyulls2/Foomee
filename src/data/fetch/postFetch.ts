import { ApiRes, SingleItem, Post, MultiItem } from '@/types';

const SERVER = process.env.NEXT_PUBLIC_API_SERVER;
const CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID;

// const LIMIT = process.env.NEXT_PUBLIC_LIMIT;
// const DELAY = process.env.NEXT_PUBLIC_DELAY;

// 게시판 타입, 제목으로 게시물 조회
/**
 * 게시물 조회
 * @param type 게시판 타입
 * @param page 페이지 번호
 * @param keyword 검색 키워드
 */
export async function fetchPosts(
  type: string | undefined,
  page?: string | undefined,
  keyword?: string,
): Promise<Post[]> {
  const queryString = `type=${type}${page ? `&page=${page}` : ''}${keyword ? `&keyword=${keyword}` : ''}`;

  const url = `${SERVER}/posts?${queryString}`;

  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'client-id': `${CLIENT_ID}`,
      },
    });

    const resJson: ApiRes<MultiItem<Post>> = await res.json();

    if (!resJson.ok) {
      throw new Error(`API error: ${resJson.message || 'Unknown error'}`);
    }

    return resJson.item;
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}

/**
 * 게시물 상세 조회
 * @param _id 게시물 ID
 * @returns 게시물 정보
 */
export async function fetchPost(_id: string) {
  const url = `${SERVER}/posts/${_id}`;
  const res = await fetch(url);
  const resJson: ApiRes<SingleItem<Post>> = await res.json();
  if (!resJson.ok) {
    return null;
  }
  return resJson.item;
}
