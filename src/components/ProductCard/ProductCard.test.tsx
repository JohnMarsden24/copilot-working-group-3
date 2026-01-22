import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductCard } from './index';
import { CartProvider } from '../../contexts/CartContext';
import type { Product } from '../../types/product';

// Mock the router
vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <CartProvider>{children}</CartProvider>
    </QueryClientProvider>
  );
};

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'This is a test product',
  category: 'Electronics',
  price: 99.99,
  rating: 4.5,
  stock: 15,
  brand: 'Test Brand',
  availabilityStatus: 'In Stock',
  returnPolicy: '30 days',
  thumbnail: 'https://example.com/thumb.jpg',
  images: ['https://example.com/image1.jpg'],
};

const lowStockProduct: Product = {
  ...mockProduct,
  id: 2,
  stock: 5,
};

describe('ProductCard', () => {
  it('renders product with in stock message', () => {
    render(<ProductCard product={mockProduct} />, { wrapper: createWrapper() });
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('In Stock')).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });

  it('renders product with low stock warning', () => {
    render(<ProductCard product={lowStockProduct} />, { wrapper: createWrapper() });
    
    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Only 5 left!')).toBeInTheDocument();
    expect(screen.getByText('Add to Cart')).toBeInTheDocument();
  });
});
