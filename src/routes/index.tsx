import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { useProducts } from '../hooks/useProducts';
import { Layout } from '../components/ui/Layout';
import { Header } from '../components/Header';
import { ProductGrid } from '../components/ProductGrid';
import { ProductCard } from '../components/ProductCard';
import { ErrorBoundary } from '../components/ErrorBoundary';

const ProductList = () => {
  const { data } = useProducts();

  return (
    <ProductGrid>
      {data.products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </ProductGrid>
  );
};

const IndexPage = () => {
  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Main>
        <h1>Featured Products</h1>

        <ErrorBoundary
          fallback={(error) => <p>Error loading products: {error.message}</p>}
        >
          <Suspense fallback={<p>Loading products...</p>}>
            <ProductList />
          </Suspense>
        </ErrorBoundary>
      </Layout.Main>
    </Layout>
  );
};

export const Route = createFileRoute('/')({
  component: IndexPage,
});
