import { NextResponse } from 'next/server';
import { PRODUCTS } from '@/lib/products';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json([]);
  }

  const lowercaseQuery = query.toLowerCase();

  const results = PRODUCTS.filter((product) => {
    return (
      product.title.toLowerCase().includes(lowercaseQuery) ||
      product.category.toLowerCase().includes(lowercaseQuery)
    );
  });

  return NextResponse.json(results);
}
