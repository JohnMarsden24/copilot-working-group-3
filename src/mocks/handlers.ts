import { http, HttpResponse } from 'msw';
import type { Product, ProductsResponse } from '../types/product';

const mockProducts: Product[] = [
  {
    id: 1,
    title: 'Essence Mascara Lash Princess',
    description: 'The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects.',
    category: 'beauty',
    price: 9.99,
    rating: 4.5,
    stock: 99,
    brand: 'Essence',
    availabilityStatus: 'In Stock',
    returnPolicy: '30 days return policy',
    thumbnail: 'https://cdn.dummyjson.com/product-images/1/thumbnail.jpg',
    images: ['https://cdn.dummyjson.com/product-images/1/1.jpg'],
  },
  {
    id: 2,
    title: 'Eyeshadow Palette with Mirror',
    description: 'The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks.',
    category: 'beauty',
    price: 19.99,
    rating: 4.2,
    stock: 44,
    brand: 'Glamour Beauty',
    availabilityStatus: 'In Stock',
    returnPolicy: '30 days return policy',
    thumbnail: 'https://cdn.dummyjson.com/product-images/2/thumbnail.jpg',
    images: ['https://cdn.dummyjson.com/product-images/2/1.jpg'],
  },
  {
    id: 3,
    title: 'Powder Canister',
    description: 'A versatile powder canister for various cosmetic applications.',
    category: 'beauty',
    price: 14.99,
    rating: 4.3,
    stock: 59,
    brand: 'Velvet Touch',
    availabilityStatus: 'In Stock',
    returnPolicy: '30 days return policy',
    thumbnail: 'https://cdn.dummyjson.com/product-images/3/thumbnail.jpg',
    images: ['https://cdn.dummyjson.com/product-images/3/1.jpg'],
  },
];

export const handlers = [
  http.get('https://dummyjson.com/products', ({ request }) => {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '30');
    const skip = parseInt(url.searchParams.get('skip') || '0');

    const response: ProductsResponse = {
      products: mockProducts.slice(skip, skip + limit),
      total: mockProducts.length,
      skip,
      limit,
    };

    return HttpResponse.json(response);
  }),

  http.get('https://dummyjson.com/products/:id', ({ params }) => {
    const id = parseInt(params.id as string);
    const product = mockProducts.find((p) => p.id === id);

    if (!product) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(product);
  }),
];
