import type { APIRoute } from 'astro';

export const prerender = false;

/** プロジェクト内で使用するバックエンド API パス（ホワイトリスト） */
const allowedEndpoints = [
  'api/user/add_user',
  'api/member/add',
  'api/members/update-by-code',
  'api/filemaker/create',
  'api/filemaker/update',
  'api/info_lending/lendingData',
  'api/lending/get_reservation_by_id',
  'api/lending/empty_search',
  'api/lending/price_calculate',
  'api/lending/add_form',
];

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const { endpoint, payload } = body;

    if (typeof endpoint !== 'string' || !allowedEndpoints.includes(endpoint)) {
      return new Response(JSON.stringify({ error: 'Unauthorized endpoint' }), { status: 403 });
    }

    const apiToken =
      import.meta.env.SECRET_API_TOKEN || import.meta.env.PUBLIC_API_TOKEN || '';

    const targetUrl = `https://roadcruise-share.com/${endpoint}`;

    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${apiToken}`,
      },
      body: JSON.stringify(payload),
    });

    const text = await response.text();

    return new Response(text, {
      status: response.status,
      headers: {
        'Content-Type': response.headers.get('Content-Type') || 'application/json',
      },
    });
  } catch (error) {
    console.error('Proxy Error:', error);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
};
