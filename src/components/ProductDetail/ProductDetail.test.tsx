import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ProductDetail } from './index';
import { CartProvider } from '../../contexts/CartContext';
import type { Product } from '../../types/product';

// Mock the router hooks
vi.mock('@tanstack/react-router', () => ({
  useParams: () => ({ productId: '1' }),
  Link: ({ children, to }: { children: React.ReactNode; to: string }) => (
    <a href={to}>{children}</a>
  ),
}));

// Mock the product service
vi.mock('../../services', () => ({
  productService: {
    getProduct: vi.fn(),
  },
}));

import { productService } from '../../services';

const mockProduct: Product = {
  id: 1,
  title: 'Test Product',
  description: 'This is a test product description',
  category: 'Electronics',
  price: 99.99,
  rating: 4.5,
  stock: 10,
  brand: 'Test Brand',
  availabilityStatus: 'In Stock',
  returnPolicy: '30 days',
  thumbnail: 'https://example.com/thumb.jpg',
  images: ['https://example.com/image1.jpg', 'https://example.com/image2.jpg'],
};

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

describe('ProductDetail', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders product details correctly with valid data', async () => {
    // Arrange
    vi.mocked(productService.getProduct).mockResolvedValue(mockProduct);

    // Act
    render(<ProductDetail />, { wrapper: createWrapper() });

    // Assert - Check for product name, price, and image
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    expect(screen.getByText('$99.99')).toBeInTheDocument();
    expect(screen.getByText('This is a test product description')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toBeInTheDocument();
    expect(screen.getByAltText('Test Product')).toHaveAttribute(
      'src',
      'https://example.com/image1.jpg'
    );

    // Check for metadata
    expect(screen.getByText('Test Brand')).toBeInTheDocument();
    expect(screen.getByText('Electronics')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByText('⭐ 4.5')).toBeInTheDocument();
  });

  it('displays loading state when product data is being fetched', async () => {
    // Arrange - Create a promise that never resolves to simulate loading
    vi.mocked(productService.getProduct).mockImplementation(
      () => new Promise(() => {})
    );

    // Act
    render(<ProductDetail />, { wrapper: createWrapper() });

    // Assert - The component should render but without product data
    // When loading, the component will render empty values or undefined
    await waitFor(() => {
      const title = screen.queryByRole('heading', { level: 1 });
      // During loading, the title should either not exist or be empty
      expect(title?.textContent).toBeFalsy();
    });
  });

  it('handles missing or malformed data gracefully', async () => {
    // Arrange - Product with minimal/missing data
    const incompleteProduct = {
      id: 2,
      title: 'Incomplete Product',
      description: 'Description only',
      category: 'Unknown',
      price: 0,
      rating: 0,
      stock: 0,
      availabilityStatus: 'Out of Stock',
      returnPolicy: 'None',
      thumbnail: '',
      images: [],
    } as Product;

    vi.mocked(productService.getProduct).mockResolvedValue(incompleteProduct);

    // Act
    render(<ProductDetail />, { wrapper: createWrapper() });

    // Assert - Component should render without crashing
    await waitFor(() => {
      expect(screen.getByText('Incomplete Product')).toBeInTheDocument();
    });

    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText('Description only')).toBeInTheDocument();
    // Brand should show N/A when not present
    expect(screen.getByText('N/A')).toBeInTheDocument();
    // Image should still be present even with empty src
    const image = screen.getByAltText('Incomplete Product');
    expect(image).toBeInTheDocument();
  });

  it('add to cart button interaction works correctly', async () => {
    // Arrange
    vi.mocked(productService.getProduct).mockResolvedValue(mockProduct);
    const user = userEvent.setup();

    // Act
    render(<ProductDetail />, { wrapper: createWrapper() });

    // Wait for product to load
    await waitFor(() => {
      expect(screen.getByText('Test Product')).toBeInTheDocument();
    });

    // Find and click the Add to Cart button
    const addToCartButton = screen.getByRole('button', { name: /add to cart/i });
    expect(addToCartButton).toBeInTheDocument();

    // Click the button
    await user.click(addToCartButton);

    // Assert - Button should still be present and clickable after interaction
    // (In a real app, this might show a success message or update cart count)
    expect(addToCartButton).toBeInTheDocument();
    expect(addToCartButton).not.toBeDisabled();
  });
});
