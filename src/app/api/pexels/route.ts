import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');
  const page = searchParams.get('page') || '1';
  const perPage = searchParams.get('per_page') || '15';
  const orientation = searchParams.get('orientation') || 'portrait';

  try {
    const response = await fetch(
      `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=${perPage}&orientation=${orientation}`,
      {
        headers: {
          Authorization: process.env.PEXELS_API_KEY || '',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch from Pexels API');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
} 