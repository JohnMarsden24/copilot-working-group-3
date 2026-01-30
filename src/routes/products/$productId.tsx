import { createFileRoute } from '@tanstack/react-router';
import { Suspense } from 'react';
import { Layout } from '../../components/ui/Layout';
import { Header } from '../../components/Header';
import { ProductDetail } from '../../components/ProductDetail';
import { ErrorBoundary } from '../../components/ErrorBoundary';

const ProductPage = () => {
  return (
    <Layout>
      <Layout.Header>
        <Header />
      </Layout.Header>
      <Layout.Main>
        <ErrorBoundary
          fallback={(error) => <p>Error loading product: {error.message}</p>}
        >
          <Suspense fallback={<p>Loading product...</p>}>
            <ProductDetail />
          </Suspense>
        </ErrorBoundary>
      </Layout.Main>
    </Layout>
  );
};

export const Route = createFileRoute('/products/$productId')({
  component: ProductPage,
});
