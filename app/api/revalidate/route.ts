import { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'
import { parse } from 'node-html-parser';


// e.g a webhook to `your-website.com/api/revalidate?tag=collection&secret=<token>`
export async function POST(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret');
  const tag = request.nextUrl.searchParams.get('tag');
  const token = request.nextUrl.searchParams.get('token');

  if (secret !== process.env.MY_SECRET_TOKEN) {
    return Response.json({ message: 'Invalid secret' }, { status: 401 })
  }

  if (!tag) {
    return Response.json({ message: 'Missing tag param' }, { status: 400 })
  }

  if (!token) {
    return Response.json({ message: 'Missing token param' }, { status: 400 })
  }

  const response = await fetch('https://www.humblebundle.com/home/library', { headers: { cookie: token } });
  const body = await response.text();
  const doc = parse(body);
  let userData = doc.querySelector("#user-home-json-data");
  let obj = JSON.parse(userData?.rawText || "");
  if (!obj) {
    return Response.json({ message: 'User Data not found' }, { status: 400 })
  } else {
    let gamekeys = obj.gamekeys.map((key: string) => `gamekeys=${key}`).join('&');
    console.log(gamekeys);
    const games = await fetch(`https://www.humblebundle.com/api/v1/orders?${gamekeys}`, { headers: { cookie: token } });
    const gamesData = await games.text();
    console.log(gamesData);
  }

  // revalidateTag(tag!)

  return Response.json({ revalidated: true, now: Date.now() })
}
